import Integer = cc.Integer;
import {GameCurrentRound, GameState, MonsterTeam, PrizeType} from "../Type/enums";
import Emitter from "../Msg/Emitter";
import Utils from "./Utils";
import ccLog from "../Log/ccLog";
import LoadManage from "../Load/LoadManage";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UtilsDB extends cc.Component {


    static selectedNode: cc.Node = null

    static skills: any[] = []

    static gameName : string = "edu_"

    static setJson(key: string, json: {}) {
        cc.sys.localStorage.setItem(this.gameName+key, JSON.stringify(json));
    }

    static getJson(key: string) {
        if (cc.sys.localStorage.getItem(this.gameName+key)) {
            let userData = JSON.parse(cc.sys.localStorage.getItem(this.gameName+key));
            return userData
        }
        return null
        // let userData = JSON.parse(cc.sys.localStorage.getItem(key));
        // return userData
        //深拷贝
        // JSON.parse(JSON.stringify(obj))
    }

    //深拷贝
    //UtilsDB.deepCopy(obj)
    static deepCopy(obj){
        return  JSON.parse(JSON.stringify(obj))
    }

    static setStr(key: string, value: string) {
        cc.sys.localStorage.setItem(key, value);
    }

    static getStr(key: string) {
        let userData = cc.sys.localStorage.getItem(key);
        return userData
    }

    static setInt(key: string, value: number) {
        cc.sys.localStorage.setItem(key, String(value));
    }

    static getInt(key: string) {
        return parseInt(cc.sys.localStorage.getItem(key))
    }

    static remove(key: string) {
        cc.sys.localStorage.removeItem(key)
    }
    //获取头像路径
    // UtilsDB.getPhotoframe(name)
    static getPhotoframe(name){
       return "Photoframe_"+name
    }
    //获取技能图标
    // UtilsDB.getJinengtu(name)
    static getJinengtu(name){
       return "boss_"+name
    }


    /**
     * 加钱或者减钱
     * @param gold 增加或者减少
     * @param callbackGold_donthave
     * @param callbackGold_addsucceed
     * @param callbackGold_subsucceed
     */
    // UtilsDB.addGold(gold)
    static addGold(gold: number, callbackGold_donthave, callbackGold_addbefore, callbackGold_addsucceed, callbackGold_subsucceed) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let myGold = player.assets.gold
        if (gold < 0) {
            if (myGold + gold < 0) {
                // 钱不够
                if (callbackGold_donthave) {
                    callbackGold_donthave()
                }
            } else {
                // 扣钱
                if (callbackGold_addbefore) {
                    callbackGold_addbefore()
                    return
                }

                myGold += gold
                player.assets.gold = myGold
                this.setJson("player", player)
                Emitter.fire("onAssetsManagerRefresh")
                //扣钱结束
                if (callbackGold_subsucceed) {
                    callbackGold_subsucceed(myGold)
                }
            }
        } else {
            //加钱结束
            myGold += gold
            player.assets.gold = myGold
            this.setJson("player", player)
            Emitter.fire("onAssetsManagerRefresh")
            if (callbackGold_addsucceed) {
                callbackGold_addsucceed(myGold)
            }
        }

    }


    // UtilsDB.addExp(addExp)
    static addExp(addExp) {
        if (UtilsDB.getPlayer() == null) {
            UtilsDB.initPlayer()
        }
        let player = UtilsDB.getPlayer()

        for (let i = 0; i < player.myMonsterNow.length; i++) {
            let myMonsterNow = player.myMonsterNow[i]
            for (let x = 0; x < player.myMonsterNow.length; x++) {
                if (myMonsterNow.id == player.myMonsterNow[x]) {
                    player.myMonster[i].exp += addExp
                }
            }
        }
        Emitter.fire('onTipsShow', {txt: "目前场上的每个都加了" + addExp + "经验"})
    }

    // UtilsDB.getGem()
    static getGem() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let myGem = player.assets.gem
        return myGem
    }

    // UtilsDB.getGold()
    static getGold() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        // cc.log("初始化得钱吗",player)
        let myGold = player.assets.gold
        return myGold
    }

    //UtilsDB.setFastCount()
    static setFastCount(data) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()

        player.assets.fastCount = 5
        this.setJson("player", player)
    }

    //UtilsDB.addFastCount({fastCount : 1})
    static addFastCount(data) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()

        player.assets.fastCount += data.fastCount
        this.setJson("player", player)
    }

    // 设置db
    // UtilsDB.initSetting()
    static initSetting() {
        this.setJson("Setting", {
            sound: true,
            music: true,
        })

    }

    // UtilsDB.getSetting()
    static getSetting() {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        return setting
    }

    //设置声音
    // UtilsDB.setSettingSound(true)
    static setSettingSound(b) {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        setting.sound = b
        this.setJson("Setting", setting)
    }

    // UtilsDB.getSettingSound()
    static getSettingSound() {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        return setting.sound
    }

    // UtilsDB.setSettingMusic(true)
    static setSettingMusic(b) {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        setting.music = b
        this.setJson("Setting", setting)
    }

    // UtilsDB.getSettingMusic()
    static getSettingMusic() {
        let setting = this.getJson("Setting")
        if (setting == null) {
            this.initSetting()
        }
        setting = this.getJson("Setting")
        return setting.music
    }

    // UtilsDB.getFastCount()
    static getFastCount() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let fastCount = player.assets.fastCount
        return fastCount
    }

    // UtilsDB.useFastCount(callback_donthave, callback_subsucceed)
    static useFastCount(callback_donthave, callback_subsucceed) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let fastCount = player.assets.fastCount

        if (fastCount <= 0) {
            fastCount = 0
            player.assets.fastCount = fastCount
            this.setJson("player", player)
            if (callback_donthave) {
                callback_donthave()
                return
            }
        } else {
            fastCount = player.assets.fastCount - 1
            player.assets.fastCount = fastCount
            cc.log("快速游戏数据库几个 ", player.assets.fastCount)
            this.setJson("player", player)
            if (callback_subsucceed) {
                callback_subsucceed(player.assets.fastCount)

                return
            }
        }


        // return fastCount
    }


    /**
     * 加钻石或者减钻石
     * @param gem
     * @param callbackGold_donthave
     * @param callbackGold_addsucceed
     * @param callbackGold_subsucceed
     */
    // UtilsDB.addGem(gold)
    static addGem(gem: number, callbackGold_donthave, callbackGold_addsucceed, callbackGold_subsucceed) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let myGem = player.assets.gem
        if (gem < 0) {
            if (myGem + gem < 0) {
                // 钱不够
                if (callbackGold_donthave) {
                    callbackGold_donthave()
                }
            } else {
                myGem += gem
                player.assets.gem = myGem
                this.setJson("player", player)
                Emitter.fire("onAssetsManagerRefresh")
                //扣钱结束
                if (callbackGold_subsucceed) {
                    callbackGold_subsucceed(myGem)
                }
            }
        } else {
            //加钱结束
            myGem += gem
            player.assets.gem = myGem
            this.setJson("player", player)
            Emitter.fire("onAssetsManagerRefresh")
            if (callbackGold_addsucceed) {
                callbackGold_addsucceed(myGem)
            }
        }

    }

    //离开的时候
    //UtilsDB.initOffLineTime()
    static initOffLineTime() {
        let time = new Date().getTime()
        this.setJson("OffLineTime", {
            timeInterva : 10,
            getGold : 100,
            getGoldMax : 5*10000,
            time: time,
        })
    }


    //露面的时候
    //UtilsDB.getOffLineTime()
    static getOffLineTime() {
        let time = new Date().getTime()
        let OffLineTime = this.getJson("OffLineTime")
        if (OffLineTime != null) {
            ccLog.log("进入后台 计算 低保"," 当前时间 ",time," 之前的时间 ",OffLineTime.time)
            if (time - OffLineTime.time > 1000 * OffLineTime.timeInterva) {
                let times = (time - OffLineTime.time)/OffLineTime.timeInterva/1000

                ccLog.log("低保 ","几个计算单位 ",times)
                let gold = times*OffLineTime.getGold
                ccLog.log("低保 ","原本多少钱 ",gold)
                if (gold <=OffLineTime.getGoldMax) {

                }else{
                    gold = OffLineTime.getGoldMax
                }


                ccLog.log("低保 ","最后给多少钱 ",Utils.get2Double(gold))
                Emitter.fire('onOffLineDialog', {
                    type: PrizeType.Gold,
                    value: Utils.get2Double(gold),
                    valueStr: Utils.valueparseInt(Utils.get2Double(gold))
                })

                // Emitter.fire('onOpenADDialog',this,{add :gold },this.successfulCallback,this.failureCallback)


                return true
            } else {
                return false
            }
            // this.setJson("OffLineTime", {
            //     time: time,
            // })
        }
        return false
    }

    // static successfulCallback(self,data){
    //     cc.log("领取奖励 正常领取",data);
    //     // self.getPrize()
    //     // let returnData = UtilsDB.updataPlayerMonsterUpLvZhijie(self.data)
    //     // if (returnData != null ) {
    //     //     this.setData(returnData)
    //     //     Emitter.fire('onTipsShow',{txt: "直接升级"})
    //     //
    //     // }
    //     UtilsDB.addGold(data.add*3,null,null,(myGold)=>{
    //         // UtilsDB.setMysteryShopTimeBuyType(this.index)
    //         Emitter.fire('onTipsShow',{txt: "离线收益 "+Utils.valueparseInt(data.add*3)})
    //
    //         // Emitter.fire("onUpDataMysteryShopDialog")
    //     },(myGoldnew)=>{
    //         // cc.log("我们更新的",myGoldnew);
    //         // Emitter.fire('onAddGoldString',myGoldnew)
    //
    //
    //         // Emitter.fire("onUpDataMysteryShopDialog")
    //
    //
    //     })
    //
    // }
    // static failureCallback(self,data){
    //     cc.log("领取奖励 不能领取",data);
    //     Emitter.fire('onTipsShow',{txt: "不看广告没法领取"})
    // }
    //神秘商店 初始化
    //UtilsDB.initMysteryShop()
    static initMysteryShop() {
        let time = new Date().getTime()
        let list = []

        list = this.getRefreshMysteryShop()
        this.setJson("MysteryShop", {
            list: list,
            time: time,
            count: 1,
            // getTime : time+(1000*5)
            getTime: time + (1000 * 5)
        })
    }

    // 获取一个不带时间的随机购买的列表
    static getRefreshMysteryShop() {
        let list = []
        // type 0 金币
        // type 1 精粹
        // type 2 经验

        // 10个	1000-3000经验

        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(1000, 3001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 10
            },
            buyType: false
        })


        // 10个	10000-50000金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(10000, 50001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 10
            },
            buyType: false
        })

        // 20个	2000-5000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(2000, 5001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 20
            },
            buyType: false
        })
        // 20 个	100000-500000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(100000, 500001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 20
            },
            buyType: false
        })

        // 40 个	5000-8000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(5000, 8001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 40
            },
            buyType: false
        })

        // 40 个	1000000-5000000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(1000000, 5000001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 40
            },
            buyType: false
        })
        // 60 个	8000-10000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: Utils.random(8000, 10001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 60
            },
            buyType: false
        })
        // 60 个	10000000-50000000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: Utils.random(10000000, 50000001)
            },
            buy: {
                type: PrizeType.Hp,
                count: 60
            },
            buyType: false
        })
        // 80 个	10000 经验
        list.push({
            goods: {
                type: PrizeType.Exp,
                count: 10000
            },
            buy: {
                type: PrizeType.Hp,
                count: 80
            },
            buyType: false
        })
        // 80 个	50000000 金币
        list.push({
            goods: {
                type: PrizeType.Gold,
                count: 50000000
            },
            buy: {
                type: PrizeType.Hp,
                count: 80
            },
            buyType: false
        })
        let newlist = []
        let newsjsz = Utils.sjsz(3)
        for (let i = 0; i < newsjsz.length; i++) {
            newlist.push(list[newsjsz[i]])
        }
        return newlist
    }

    //买了其中一个之后
    // UtilsDB.setMysteryShopTimeBuyType(index)
    static setMysteryShopTimeBuyType(index) {
        let MysteryShop = this.getJson("MysteryShop")
        MysteryShop.list[index].buyType = true
        this.setJson("MysteryShop", MysteryShop)
    }


    // 获取一个带时间的随机购买的列表
    static refreshMysteryShopTime() {
        let time = new Date().getTime()

        let list = []

        list = this.getRefreshMysteryShop()

        this.setJson("MysteryShop", {
            count: 0,
            list: list,
            time: time,
            // getTime : time+(1000*5)
            getTime: time + (1000 * 5)
        })
    }

    // UtilsDB.getMysteryShop()
    static getMysteryShop() {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        return this.getJson("MysteryShop")
    }


    // UtilsDB.addMysteryShop({count : 1})
    static addMysteryShop(data) {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        let list = []
        list = this.getRefreshMysteryShop()
        let time = new Date().getTime()
        MysteryShop.count = MysteryShop.count + data.count
        MysteryShop.list = list
        MysteryShop.time = time
        MysteryShop.getTime = time + (1000 * 5)

        this.setJson("MysteryShop", MysteryShop)
    }

    // UtilsDB.getMysteryShopTime(callbackNow, callbackEnd)
    static getMysteryShopTime(callbackNow, callbackEnd) {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        let MysteryShopnew = this.getJson("MysteryShop")
        let time = new Date().getTime()
        let newTime = MysteryShopnew.getTime - time
        // cc.log("现在 商店", newTime);
        if (newTime > 0) {
            if (callbackNow) {
                callbackNow(newTime / 1000)
            }
        } else {
            if (callbackEnd) {
                callbackEnd(0)
            }
        }
    }

    static getMysteryShopTimeNoCallBack() {
        let MysteryShop = this.getJson("MysteryShop")
        if (MysteryShop == null) {
            this.initMysteryShop()
        }
        let MysteryShopnew = this.getJson("MysteryShop")
        let time = new Date().getTime()
        let newTime = MysteryShopnew.getTime - time
        // cc.log("现在", newTime);
        if (newTime > 0) {
            return newTime / 1000
        } else {
            return 0
        }
        // return this.getJson("giftBagLuck")
    }


    //初始化神秘礼包时间
    //UtilsDB.initGiftBagLuck()
    static initGiftBagLuck() {

        let time = new Date().getTime()
        this.setJson("giftBagLuck", {
            count: 0,
            time: time,
            getTime: time + (1000 * 5)
            // getTime: time
        })
    }

    // UtilsDB.setGiftBagLuck(data)
    static setGiftBagLuck(data) {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let time = new Date().getTime()
        giftBagLuck.count = data.count
        giftBagLuck.time = time
        giftBagLuck.getTime = time + (1000 * 5)

        this.setJson("giftBagLuck", giftBagLuck)
    }

    // UtilsDB.addGiftBagLuck(data)
    static addGiftBagLuck(data) {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let time = new Date().getTime()
        giftBagLuck.count = giftBagLuck.count + data.count
        giftBagLuck.time = time
        giftBagLuck.getTime = time + (1000 * 5)

        this.setJson("giftBagLuck", giftBagLuck)
    }

    // UtilsDB.getGiftBagLuck()
    static getGiftBagLuck() {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        return this.getJson("giftBagLuck")
    }

    // UtilsDB.getGiftBagLuckTime()
    static getGiftBagLuckTime(callbackNow, callbackEnd) {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let giftBagLucknew = this.getJson("giftBagLuck")
        let time = new Date().getTime()
        let newTime = giftBagLucknew.getTime - time
        // cc.log("现在", newTime);
        if (newTime > 0) {
            if (callbackNow) {
                callbackNow(newTime / 1000)
            }
        } else {
            if (callbackEnd) {
                callbackEnd(0)
            }
        }
    }

    static getGiftBagLuckTimeNoCallBack() {
        let giftBagLuck = this.getJson("giftBagLuck")
        if (giftBagLuck == null) {
            this.initGiftBagLuck()
        }
        let giftBagLucknew = this.getJson("giftBagLuck")
        let time = new Date().getTime()
        let newTime = giftBagLucknew.getTime - time
        ccLog.log("现在", newTime);
        if (newTime > 0) {
            return newTime / 1000
        } else {
            return 0
        }
        // return this.getJson("giftBagLuck")
    }

    //初始化游戏存档
    static initPlayer() {
        this.setJson("player", {
            playerId: 0,

            //资产
            assets: {
                // 金币
                // gold: 1990,
                gold: 10000,
                //钻石
                gem: 100,
                //快速游戏 次数
                fastCount: 5,
                //转盘次数
                luckCount: 5,
            },
            myMonsterIndex: 0,
            //我的怪兽
            myMonster: [
                {
                    id: 0,
                    lv: 1,
                    // exp: 0
                    exp: 0,
                    pic_min : 100,
                    pic_max : 100
                    // lvDB : {}
                },
                {
                    id: 1,
                    lv: 1,
                    exp: 0,
                    pic_min : 100,
                    pic_max : 100
                },
                {
                    id: 2,
                    lv: 1,
                    exp: 0,
                    pic_min : 0,
                    pic_max : 150
                }
            ],
            //等级保护 不存在失败 10级 20级
            myMonsterlvDBMin : [10,20],
            // 第一次 50% 第二次 10% 第三次 成功
            myMonsterlvChance : [50,10,0],


            myMonsterlvDBLv : [
                // {
                //     id : 0,
                //     dbLv : {}
                // },
                // {
                //     id : 1,
                //     dbLv : {}
                // },
                // {
                //     id : 2,
                //     dbLv : {}
                // }
            ],


            otherMonster: [
                // {
                //     id: 9000,
                //     lv: 1,
                //     exp: 0
                // },
                {
                    id: 9001,
                    lv: 1,
                    exp: 0
                },
                {
                    id: 9002,
                    lv: 2,
                    exp: 0
                },
                {
                    id: 9003,
                    lv: 3,
                    exp: 0
                },
                {
                    id: 9004,
                    lv: 4,
                    exp: 0
                },
                {
                    id: 9005,
                    lv: 5,
                    exp: 0
                },
                {
                    id: 9006,
                    lv: 6,
                    exp: 0
                },
                {
                    id: 9007,
                    lv: 7,
                    exp: 0
                },
                {
                    id: 9008,
                    lv: 8,
                    exp: 0
                },
                {
                    id: 9009,
                    lv: 9,
                    exp: 0
                },
                {
                    id: 9010,
                    lv: 10,
                    exp: 0
                },
            ],

            //现在上场的玩家
            myMonsterNow: [
                {
                    id: 0,
                    // //等级
                    lv: 1,
                    // exp : 99999
                },
                // {
                //     id: 1,
                //     // lv: 1,
                //     // exp: 0
                // }
            ],
            //现在上场的对手
            otherMonsterNow: [
                [
                    {
                        id: 9000,
                        lv: 1,
                        // exp : 0
                    },
                    {
                        id: 9001,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9002,
                        // lv : 1,
                        // exp : 0
                    },

                ],
                [
                    {
                        id: 9003,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9004,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9005,
                        // lv : 1,
                        // exp : 0
                    },
                ],
                [
                    {
                        id: 9006,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9007,
                        // lv : 1,
                        // exp : 0
                    },
                    {
                        id: 9000,
                        // lv : 1,
                        // exp : 0
                    },
                ],

            ],
            //本局回合
            currentRound: 0,
            //游戏总回合
            // currentRoundGame: 1,
            currentRoundGame: 0,

            roundSettlement: {
                exp: 0,
                gold: 0,
                gem: 0
            },
            //在场怪物最多个数
            countMonsterMax: 10,
            //抓壮丁间隔
            countMonsterTime: 20,
            //出龙蛋几率
            egg: 20

        })
    }

    // static setCurrent() {
    //     let player = this.getPlayer();
    //     this.setPlayer(player)
    // }
    /**
     * 加钱或者减钱
     * @param count 增加或者减少
     * @param callback_donthave
     * @param callback_addbefore
     * @param callback_addsucceed
     * @param callback_subsucceed
     */
    // UtilsDB.addLuck(gold)
    static addLuck(count: number, callback_donthave, callback_addbefore, callback_addsucceed, callback_subsucceed) {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        let luckCount = player.assets.luckCount
        if (count < 0) {
            if (luckCount + count < 0) {
                // 次数不够
                if (callback_donthave) {
                    callback_donthave()
                }
            } else {
                // 扣之前
                if (callback_addbefore) {
                    callback_addbefore()
                    return
                }

                luckCount += count
                player.assets.luckCount = luckCount
                this.setJson("player", player)
                //扣结束
                if (callback_subsucceed) {
                    callback_subsucceed(luckCount)
                }
            }
        } else {
            //加结束
            luckCount += count
            player.assets.luckCount = luckCount
            this.setJson("player", player)
            if (callback_addsucceed) {
                callback_addsucceed(luckCount)
            }
        }

    }

    // UtilsDB.getLuck()
    static getLuck() {
        if (UtilsDB.getPlayer() == null) {
            // cc.log("以前 没有记录")
            UtilsDB.initPlayer()
            // cc.log("以前 后来设置了记录",UtilsDB.getPlayer())
        }
        let player = UtilsDB.getPlayer()
        // cc.log("转盘 获取player ",player)
        let luckCount = player.assets.luckCount

        // cc.log("转盘 获取次数 ",luckCount)
        return luckCount
    }

    static initGame() {
        this.setJson("game", {
            gameState: GameState.RUN
        })
    }

    // UtilsDB.getGame()
    static getGame() {
        if (this.getJson("game") == null) {
            this.initGame()
        }
        return this.getJson("game")
    }

    // UtilsDB.setGame(game)
    static setGame(game) {

        return this.setJson("game", game)
    }

    // UtilsDB.initGameSkill()
    static initGameSkill() {
        this.setJson("gameSkill", {
            list : []
        })
    }

    // UtilsDB.getGameSkill()
    static getGameSkill() {
        if (this.getJson("gameSkill")==null) {
            this.initGameSkill()
        }
        return this.getJson("gameSkill")
    }

    // UtilsDB.setGame(game)
    static setGameSkill(gameSkill) {
        // cc.log("设置了什么", gameSkill)
        return this.setJson("gameSkill", gameSkill)
    }
    //存储 id 对应的技能
    static saveGameSkillByID(id,gameSkill) {

        let skill = UtilsDB.getGameSkill();
        ccLog.log("原本有什么  "," skill ",skill,"要去设置什么"," gameSkill ", gameSkill)
        for (let i = 0; i <skill.list.length ; i++) {
            if (id ==skill.list[i].id ) {


                skill.list[i] = {
                    id : id,
                    gameSkill : gameSkill
                }
                this.setJson("gameSkill", skill)
                return
            }
        }
        skill.list.push({
            id : id,
            gameSkill : gameSkill
        })


        return this.setJson("gameSkill", skill)
    }
    //获取id 对应的技能
    //
    static getGameSkillByID(id) {

        let skill = UtilsDB.getGameSkill();
        ccLog.log("设置了什么", skill)
        for (let i = 0; i <skill.list.length ; i++) {
            if (id ==skill.list[i].id ) {
                return skill.list[i].gameSkill
            }
        }
        return null
    }

    // UtilsDB.againGame()
    static againGame() {
        // Emitter.fire("onAddNode", index, data)
        // UtilsDB.saveGameSkillByID(UtilsDB.getPlayer().myMonster[UtilsDB.getPlayer().myMonsterIndex].id,temps)
        let gameSkill = UtilsDB.getGameSkillByID(UtilsDB.getPlayer().myMonster[UtilsDB.getPlayer().myMonsterIndex].id)
        // cc.log("保存回显 1", " gameSkill ", gameSkill);
        ccLog.log("切换 更换了数据 gameSkill ", gameSkill)
        if (gameSkill != null) {
            for (let i = 0; i < gameSkill.length; i++) {
                let item = gameSkill[i]
                ccLog.log("保存回显", " index ", i, " item ", item);
                // indexItem : i,
                // item : itemss
                Emitter.fire("onAddNodeInit", item.indexItem, item.item)
            }
        }
    }


    // UtilsDB.setOtherMonsterMaxLv(maxLv)
    static setOtherMonsterMaxLv(maxLv) {
        if (UtilsDB.getPlayer() == null) {
            UtilsDB.initPlayer()
        }
        let player = UtilsDB.getPlayer()
        for (let i = 0; i < player.otherMonster.length; i++) {
            let otherMonster = player.otherMonster[i]
            otherMonster.lv = maxLv
        }
        this.setJson("player", player)
    }
    static initPicture(){
        this.setJson("Picture", {
            list : []
        })
    }

    //图鉴 得到这个name 相关的次数
    //UtilsDB.getPicture(name)
    static getPicture(name) {
        if (this.getJson("Picture") == null) {
            this.initPicture()
        }
        let picture = this.getJson("Picture")
        for (let i = 0; i <picture.list.length ; i++) {
           let temp = picture.list[i]
            if (temp.name == name) {
               return temp.count
            }
        }
        //没找到
        // this.setPicture(name)

        return 0
    }
    //图鉴 得到这个name 相关的次数
    //UtilsDB.setPicture(name)
    static setPicture(name) {
        if (this.getJson("Picture") == null) {
            this.initPicture()
        }
        let picture = this.getJson("Picture")
        for (let i = 0; i <picture.list.length ; i++) {
            let temp = picture.list[i]
            if (temp.name == name) {

                picture.list[i].count+=1
                this.setJson("Picture", picture)

                return
            }
        }


        let saveData = {
            name : name,
            count : 1
        }
        picture.list.push(saveData)
        this.setJson("Picture", picture)
    }
    // UtilsDB.getPlayer().myMonster
    static getPlayer() {
        if (this.getJson("player") == null) {
            this.initPlayer()
        }
        return this.getJson("player")
    }

    //UtilsDB.setPlayer(player)
    static setPlayer(player) {
        return this.setJson("player", player)
    }

    static removePlayer() {

        this.remove("player")
    }
    //得到未解锁的下一个恐龙碎片数字
    // UtilsDB.getCard()
    static getCard() {
        let player = this.getPlayer()
        let item = -1
        for (let i = 0; i < player.myMonster.length ; i++) {
           let monster = player.myMonster[i]
            if (monster.pic_min < monster.pic_max ) {
                item = i
                break
            }
        }
        return item
    }
    //根据类型加碎片
    //UtilsDB.setCard(type,count)
    static setCard(type,count) {
        let player = this.getPlayer()
        if (type) {

        }
        let monster = player.myMonster[type]
        if (monster.pic_min < monster.pic_max ) {

            if (monster.pic_min + count>= monster.pic_max) {
                monster.pic_min = monster.pic_max
            }else{
                monster.pic_min += count
            }

        }
        return this.setJson("player", player)
    }



    //增加结算经验
    // let data = {
    //     exp : m.attributes.sendOutExp,
    //     gold : m.attributes.sendOutGold
    // }
    // UtilsDB.updatePlayerMonsterRoundSettlement(addexp)
    static updatePlayerMonsterRoundSettlement(addData: any) {
        let player = this.getPlayer();
        if (player != null) {
            if (addData != null) {
                if (addData.exp != null) {
                    player.roundSettlement.exp += addData.exp
                }
                if (addData.gold != null) {
                    player.roundSettlement.gold += addData.gold
                }
                if (addData.gem != null) {
                    player.roundSettlement.gem += addData.gem
                }
                this.setJson("player", player)
            }


        }
    }

    //等级奖励礼包
    // UtilsDB.getUpLvGift(lv)
    static getUpLvGift(lv: number) {
        // 奖励物品	    奖励数量
        let getData = {}
        //
        // Emitter.fire('onOpenGetItemDialog',{
        //     type : PrizeType.Gold,
        //     value : value,
        //     valueStr : Utils.valueparseInt(value)
        // })

        let data = []
        // 10级	少量经验	500
        data.push({
            lv: 10,
            type: PrizeType.Exp,
            value: 500,
            valueStr: Utils.valueparseInt(500)
        })
        // 20级	少量金币	10000
        data.push({
            lv: 20,
            type: PrizeType.Gold,
            value: 10000,
            valueStr: Utils.valueparseInt(10000)
        })
        // 30级	少量灵石	200
        data.push({
            lv: 30,
            type: PrizeType.Hp,
            value: 200,
            valueStr: Utils.valueparseInt(200)
        })
        // 40级	大量经验	2000
        data.push({
            lv: 40,
            type: PrizeType.Exp,
            value: 2000,
            valueStr: Utils.valueparseInt(2000)
        })
        // 50 级	大量金币	5000000
        data.push({
            lv: 50,
            type: PrizeType.Gold,
            value: 5000000,
            valueStr: Utils.valueparseInt(5000000)
        })
        // 60级	大量灵石	300
        data.push({
            lv: 60,
            type: PrizeType.Hp,
            value: 300,
            valueStr: Utils.valueparseInt(300)
        })
        // 70 级	大量经验	300
        data.push({
            lv: 70,
            type: PrizeType.Exp,
            value: 300,
            valueStr: Utils.valueparseInt(300)
        })
        // 80 级	大量金币	50000000
        data.push({
            lv: 80,
            type: PrizeType.Gold,
            value: 50000000,
            valueStr: Utils.valueparseInt(50000000)
        })
        // 90 级	大量灵石	400
        data.push({
            lv: 90,
            type: PrizeType.Hp,
            value: 400,
            valueStr: Utils.valueparseInt(400)
        })
        // 100 级	大量经验	4000
        data.push({
            lv: 100,
            type: PrizeType.Exp,
            value: 4000,
            valueStr: Utils.valueparseInt(4000)
        })
        // 110 级	大量金币	70000000
        data.push({
            lv: 110,
            type: PrizeType.Gold,
            value: 70000000,
            valueStr: Utils.valueparseInt(70000000)
        })
        // 120 级	大量灵石	400
        data.push({
            lv: 120,
            type: PrizeType.Hp,
            value: 400,
            valueStr: Utils.valueparseInt(400)
        })
        // 130 级	大量经验	6000
        data.push({
            lv: 130,
            type: PrizeType.Exp,
            value: 6000,
            valueStr: Utils.valueparseInt(6000)
        })
        // 140 级	大量金币	80000000
        data.push({
            lv: 140,
            type: PrizeType.Gold,
            value: 80000000,
            valueStr: Utils.valueparseInt(80000000)
        })
        // 150 级	大量灵石	400
        data.push({
            lv: 150,
            type: PrizeType.Hp,
            value: 400,
            valueStr: Utils.valueparseInt(400)
        })

        for (let i = 0; i < data.length; i++) {
            if (data[i].lv == lv) {

                return data[i]
            }
        }
        return null


    }
    //增加经验值根据id
    // UtilsDB.updatePlayerMonsterExpUpByID(id,exp,lvUp,succeed,failure,upCallback)
    static updatePlayerMonsterExpUpByID(id,exp,lvUp,succeed,failure,upCallback){
        let player = this.getPlayer();

        let tag = true

        let myExp = exp
        let newExp = 0
        while (tag){
            let lvdata = MonsterAttr.getMonsterLvJsonByID(id)
            ccLog.log("增加经验值的数据 ",lvdata)



            for (let i = 0; i < player.myMonster.length; i++) {
                let myMonster = player.myMonster[i]
                if (id == myMonster.id) {
                    let tempExp = myMonster.exp
                    if (tempExp + myExp>=lvdata.monsterLv.needExp) {
                        if (lvdata.deformation != null) {
                            ccLog.log("我现在等级  ",lvdata.monster.lvdata.lv , " 满级是 ",lvdata.monster.maxLv)
                            if (lvdata.monster.lvdata.lv >=lvdata.monster.maxLv) {
                                player.myMonster[i].exp = lvdata.monsterLv.needExp
                                tag = false
                                this.setJson("player", player)
                                if (failure) {
                                    failure()
                                }
                                tag = false
                                return
                            }
                            
                            // Emitter.fire('onOpenDeformationDialog',lvJsonByID)
                            player.myMonster[i].exp = lvdata.monsterLv.needExp
                            ccLog.log("升级的 去进化没办法获得更多经验值了 ",lvdata)  
                            tag = false
                            this.setJson("player", player)
                            if (upCallback) {
                                upCallback()
                            }
                            break
                        }else{
                            //每相隔多少级给与奖励
                            // this.getGift("",lvJsonByID)
                            // Emitter.fire('onGetGift',reData)
                        }
                        myExp-=lvdata.monsterLv.needExp
                        ccLog.log("升级的 过程计算  ","我当前的", myExp, " 减去的 ",lvdata.monsterLv.needExp)
                        //    升级
                        // player.myMonster[i].exp += myExp
                        player.myMonster[i].lv += 1
                        this.setJson("player", player)
                        if (lvUp) {
                            lvUp()
                            ccLog.log("升级的 过程  ",player.myMonster)
                        }
                    }else{
                        // newExp = exp
                        player.myMonster[i].exp += myExp
                        this.setJson("player", player)
                        if (succeed) {
                            succeed()
                            ccLog.log("升级的 结束  ",player.myMonster)
                        }
                        tag = false
                    }

                }
            }
            // this.setJson("player", player)


        }
        // ccLog.log("结果是什么 22 ",222)


    }
    //直接升级
    // UtilsDB.updatePlayerMonsterUpLvByID(id,lv)
    static updatePlayerMonsterUpLvByID(id,lv){
        let player = this.getPlayer();
        // let lvdata = MonsterAttr.getMonsterLvJsonByID(id)
        player.myMonster[this.getPlayer().myMonsterIndex].exp = 0
        player.myMonster[this.getPlayer().myMonsterIndex].lv += 1
        this.setJson("player", player)
    }
    //减少经验值
    // UtilsDB.updatePlayerMonsterUpLvByID_jian(id,lv)
    static updatePlayerMonsterUpLvByID_jian(id,lv){
        let player = this.getPlayer();
        // let lvdata = MonsterAttr.getMonsterLvJsonByID(id)
        let exp = player.myMonster[this.getPlayer().myMonsterIndex].exp
        player.myMonster[this.getPlayer().myMonsterIndex].exp -=exp*0.05
        // player.myMonster[this.getPlayer().myMonsterIndex].lv += 1
        this.setJson("player", player)
    }



    static updatePlayerMonsterExpUp() {
        let player = this.getPlayer();
        if (player != null) {


            let exp = player.roundSettlement.exp / player.myMonsterNow.length


            for (let i = 0; i < player.myMonster.length; i++) {
                let myMonster = player.myMonster[i]
                for (let y = 0; y < player.myMonsterNow.length; y++) {
                    let monsterNow = player.myMonsterNow[y]
                    if (monsterNow.id == myMonster.id) {
                        player.myMonster[i].exp += exp
                    }

                }
            }
            player.currentRound = 0
            player.roundSettlement.exp = 0


            let tempGold = player.roundSettlement.gold
            let tempGem = player.roundSettlement.gem

            player.roundSettlement.gold = 0
            player.roundSettlement.gem = 0
            // cc.log("增加经验之后", player)
            this.setJson("player", player)

            // cc.log("准备加钱和钻石", " 钱 ", tempGold, " 钻石 ", tempGem)
            if (tempGold > 0) {
                Emitter.fire("onAddGold", tempGold)
            }
            if (tempGem > 0) {
                Emitter.fire("onAddGem", tempGem)
            }


        }
    }

    //怪物经验升级
    // UtilsDB.updatePlayerMonsterExpUp(0,addexp,team)
    // static updatePlayerMonsterExpUp(id : number ,addexp : number, team :number){
    //     let player = this.getPlayer();
    //     if (player!=null) {
    //         if (team == MonsterTeam.PLAYER) {
    //             for (let i = 0; i <player.myMonster.length ; i++) {
    //                 if (player.myMonster[i].id == id) {
    //                     player.myMonster[i].exp+=addexp
    //                     this.setJson("player",player)
    //                 }
    //             }
    //         }
    //         if (team == MonsterTeam.MONSTER) {
    //             for (let i = 0; i <player.otherMonster.length ; i++) {
    //                 if (player.otherMonster[i].id == id) {
    //                     player.otherMonster[i].exp+=addexp
    //                     this.setJson("player",player)
    //                 }
    //             }
    //         }
    //     }
    // }
    //UtilsDB.setCurrentRoundZero()
    static setCurrentRoundZero() {
        let player = this.getPlayer();
        player.currentRound = 0
        //增加游戏回合
        player.currentRoundGame += 1
        this.setJson("player", player)

    }

    //UtilsDB.setPlayerMonsterRoundSettlementZero()
    static setPlayerMonsterRoundSettlementZero() {
        let player = this.getPlayer();
        if (player != null) {
            player.roundSettlement.exp = 0
            this.setJson("player", player)
        }
    }


    //UtilsDB.updateCurrentRound()
    static updateCurrentRound() {
        let player = this.getPlayer();
        let data = {}
        if (player != null) {
            if (player.currentRound < player.otherMonsterNow.length - 1) {
                player.currentRound += 1
                this.setJson("player", player)
                data.currentRound = player.currentRound
                data.maxRound = player.otherMonsterNow.length
                data.tag = GameCurrentRound.CURRENTROUNDRUN
                return data
            } else {
                player.currentRound = 0
                player.currentRoundGame += 1
                this.setJson("player", player)
                data.currentRound = player.currentRound
                data.maxRound = player.otherMonsterNow.length
                data.tag = GameCurrentRound.CURRENTROUNDEND
                return data
            }
        }
        return null

    }

    // UtilsDB.getFightingCapacity(data)
    static getFightingCapacity(data) {
        // this.lifeNum.string = data.monster.lvdata.maxLife
        //
        // this.defNum.string = data.monster.lvdata.defense
        //
        // this.trueDamageNum.string = data.monster.lvdata.trueDamage
        //
        // this.attackNum.string = data.monster.lvdata.attack
        //
        // this.throughNum.string = data.monster.lvdata.through
        //
        // // 暴击伤害率=暴击✖0.01
        // // 暴击率=暴击率的数值✖0.001
        //
        // this.critNum.string = parseFloat((data.monster.lvdata.crit*0.01).toFixed(2))+"倍"
        //
        // this.criticalChanceNum.string =parseInt(parseFloat((data.monster.lvdata.criticalChance*0.001).toFixed(2))*100+"") +"%"
        //
        // cc.log("需求 宝石",data.monsterLv.needGold)
        // if (data.monsterLv.needGold == 0) {
        //     this.needGold.active = false
        //     cc.log("需求 金币 应该隐藏",data.monsterLv.needGold)
        // }else{
        //     this.needGold.getComponentInChildren(cc.Label).string = data.monsterLv.needGold
        // }
        // cc.log("需求 金币",data.monsterLv.needGem)
        // if (data.monsterLv.needGem == 0) {
        //     this.needGem.active = false
        //     cc.log("需求 宝石 应该隐藏",data.monsterLv.needGem)
        // }else{
        //     this.needGem.getComponentInChildren(cc.Label).string = data.monsterLv.needGem
        // }

        // 1生命值=1战斗力
        // 1防御力=25战斗力
        // 1攻击力=3.33战斗力
        // 1真实伤害=100战斗力
        // 1穿透=100战斗力
        // 1暴击=100战斗力
        // 1暴击率=100战斗力

        // parseInt(parseFloat((data.monster.lvdata.criticalChance*0.001).toFixed(2))*100+"") +"%"
        let lifeNum = data.monster.lvdata.maxLife * 1
        let defNum = data.monster.lvdata.defense * 25
        let attackNum = parseFloat((data.monster.lvdata.attack * 3.33).toFixed(2))
        let trueDamageNum = data.monster.lvdata.trueDamage * 100
        let throughNum = data.monster.lvdata.through * 100
        let critNum = data.monster.lvdata.crit * 100
        let criticalChanceNum = data.monster.lvdata.criticalChance * 100

        // cc.log("战斗力 ",
        //     " 生命战斗力 ",lifeNum,
        //     " 防御战斗力 ",defNum,
        //     " 攻击战斗力 ",attackNum,
        //     " 真实伤害战斗力 ",trueDamageNum,
        //     "穿透战斗力",throughNum,
        //     "暴击战斗力",critNum,
        //     "暴击率战斗力",criticalChanceNum,
        //
        // )
        let sum = lifeNum + defNum + attackNum + trueDamageNum + throughNum + critNum + criticalChanceNum

        return Math.round(sum)
    }


    //消耗经验值升级
    // UtilsDB.updataPlayerMonsterUpLv()
    static updataPlayerMonsterUpLv(data: any) {
        if (data == null) {
            return null
        }

        let d = data

        // monster: {…}
        //      exp: 2600
        //      id: 0
        //      index: 0
        //      lvdata: {…}
        //          attack: 30
        //          attackCD: 2000
        //          crit: 1
        //          criticalChance: 1
        //          defense: 4
        //          life: 0
        //          lv: 1
        //          max: 20
        //          maxLife: 100
        //          min: 0
        //          src: "bwl"
        //          through: 0
        //          trueDamage: 1
        //       maxLv: 150
        //       name: "小恐龙"
        //       sendOutExp: 50
        //       team: 0
        //       type: 0,
        //       skin: (5) […]
        //          0: Object { lv: 30, src: "bwl" }
        //          1: Object { lv: 60, src: "bwl_jijia_1" }
        //          2: Object { lv: 90, src: "bwl_jijia_2" }
        //          3: Object { lv: 120, src: "bwl_jijia_3" }
        //          4: Object { lv: 150, src: "bwl_jijia_4" }

        // monsterLv: {…}
        //      lv: 1
        //      needExp: 20
        //      needGem: 0
        //      needGold: 0


        let player = this.getPlayer();
        if (player != null) {
            if (d.monster.team == MonsterTeam.PLAYER) {

                for (let i = 0; i < player.myMonster.length; i++) {
                    let myMonster = player.myMonster[i]
                    if (myMonster.id == d.monster.id) {

                        if (myMonster.lv >= d.monster.maxLv) {
                            return null
                        }
                        // cc.log("节奏 不是顶级",myMonster.lv);
                        // cc.log("节奏 现在可以升级 左面", myMonster.exp, "右面", d.monsterLv.needExp);
                        if (myMonster.exp < d.monsterLv.needExp) {
                            return {
                                type: 0,
                                data: d
                            }
                        }
                        if (player.assets.gold < d.monsterLv.needGold) {
                            return {
                                type: 1,
                                data: d
                            }
                        }
                        if (player.assets.gem < d.monsterLv.needGem) {
                            return {
                                type: 2,
                                data: d
                            }
                        }
                        // cc.log("节奏 现在可以升级",myMonster.exp);
                        myMonster.exp -= d.monsterLv.needExp
                        player.assets.gold -= d.monsterLv.needGold
                        Emitter.fire("onAddGoldString", player.assets.gold)
                        player.assets.gem -= d.monsterLv.needGem
                        Emitter.fire("onAddGemString", player.assets.gem)
                        myMonster.lv += 1
                        Emitter.fire("onShengji")
                        // myMonster.exp+=addexp
                        this.setJson("player", player)


                        // node.getComponent("")
                        let query = {
                            id: myMonster.id,
                        }

                        let attributesNew = MonsterAttr.getMonsterJsonByLvAndId(query);
                        let querynew = {
                            id: myMonster.id,
                            lv: attributesNew.lvdata.lv
                        }

                        let monsterJson = MonsterAttr.getMonsterNeedJsonByLvAndId(querynew);
                        let deformation = MonsterAttr.checkMonsterdeformationJsonByLvAndId(querynew);
                        // cc.log("现在点击恐龙上面的 下面的恐龙回来的数据", monsterJson);

                        let data1 = {
                            monster: attributesNew,
                            monsterLv: monsterJson,
                            deformation: deformation
                        }
                        // cc.log("节奏 现在返回", data1);
                        return data1
                    }
                }
            }
            // if (data.monster.team == MonsterTeam.MONSTER) {
            //     for (let i = 0; i <player.otherMonster.length ; i++) {
            //         if (player.otherMonster[i].id == id) {
            //             player.otherMonster[i].exp+=addexp
            //             this.setJson("player",player)
            //         }
            //     }
            // }
        }
        return null
    }

    //消耗经验值升级
    // UtilsDB.updataPlayerMonsterUpLvAD()
    static updataPlayerMonsterUpLvAD(data: any) {
        if (data == null) {
            return null
        }

        let d = data

        // monster: {…}
        //      exp: 2600
        //      id: 0
        //      index: 0
        //      lvdata: {…}
        //          attack: 30
        //          attackCD: 2000
        //          crit: 1
        //          criticalChance: 1
        //          defense: 4
        //          life: 0
        //          lv: 1
        //          max: 20
        //          maxLife: 100
        //          min: 0
        //          src: "bwl"
        //          through: 0
        //          trueDamage: 1
        //       maxLv: 150
        //       name: "小恐龙"
        //       sendOutExp: 50
        //       team: 0
        //       type: 0,
        //       skin: (5) […]
        //          0: Object { lv: 30, src: "bwl" }
        //          1: Object { lv: 60, src: "bwl_jijia_1" }
        //          2: Object { lv: 90, src: "bwl_jijia_2" }
        //          3: Object { lv: 120, src: "bwl_jijia_3" }
        //          4: Object { lv: 150, src: "bwl_jijia_4" }

        // monsterLv: {…}
        //      lv: 1
        //      needExp: 20
        //      needGem: 0
        //      needGold: 0


        let player = this.getPlayer();
        if (player != null) {
            if (d.monster.team == MonsterTeam.PLAYER) {

                for (let i = 0; i < player.myMonster.length; i++) {
                    let myMonster = player.myMonster[i]
                    if (myMonster.id == d.monster.id) {


                        // node.getComponent("")
                        let query = {
                            id: myMonster.id,
                        }

                        let attributesNew = MonsterAttr.getMonsterJsonByLvAndId(query);
                        let querynew = {
                            id: myMonster.id,
                            lv: attributesNew.lvdata.lv
                        }

                        let monsterJson = MonsterAttr.getMonsterNeedJsonByLvAndId(querynew);
                        let deformation = MonsterAttr.checkMonsterdeformationJsonByLvAndId(querynew);
                        // cc.log("现在点击恐龙上面的 下面的恐龙回来的数据", monsterJson);

                        let data1 = {
                            monster: attributesNew,
                            monsterLv: monsterJson,
                            deformation: deformation
                        }
                        // cc.log("节奏 现在返回", data1);
                        return data1
                    }
                }
            }
            // if (data.monster.team == MonsterTeam.MONSTER) {
            //     for (let i = 0; i <player.otherMonster.length ; i++) {
            //         if (player.otherMonster[i].id == id) {
            //             player.otherMonster[i].exp+=addexp
            //             this.setJson("player",player)
            //         }
            //     }
            // }
        }
        return null
    }

    //直接升级
    // UtilsDB.updataPlayerMonsterUpLv()
    static updataPlayerMonsterUpLvZhijie(data: any) {
        if (data == null) {
            return null
        }

        let d = data

        // monster: {…}
        //      exp: 2600
        //      id: 0
        //      index: 0
        //      lvdata: {…}
        //          attack: 30
        //          attackCD: 2000
        //          crit: 1
        //          criticalChance: 1
        //          defense: 4
        //          life: 0
        //          lv: 1
        //          max: 20
        //          maxLife: 100
        //          min: 0
        //          src: "bwl"
        //          through: 0
        //          trueDamage: 1
        //       maxLv: 150
        //       name: "小恐龙"
        //       sendOutExp: 50
        //       team: 0
        //       type: 0,
        //       skin: (5) […]
        //          0: Object { lv: 30, src: "bwl" }
        //          1: Object { lv: 60, src: "bwl_jijia_1" }
        //          2: Object { lv: 90, src: "bwl_jijia_2" }
        //          3: Object { lv: 120, src: "bwl_jijia_3" }
        //          4: Object { lv: 150, src: "bwl_jijia_4" }

        // monsterLv: {…}
        //      lv: 1
        //      needExp: 20
        //      needGem: 0
        //      needGold: 0


        let player = this.getPlayer();
        if (player != null) {
            if (d.monster.team == MonsterTeam.PLAYER) {

                for (let i = 0; i < player.myMonster.length; i++) {
                    let myMonster = player.myMonster[i]
                    if (myMonster.id == d.monster.id) {

                        if (myMonster.lv >= d.monster.maxLv) {
                            return null
                        }
                        // cc.log("节奏 不是顶级",myMonster.lv);
                        // cc.log("节奏 现在可以升级 左面", myMonster.exp, "右面", d.monsterLv.needExp);
                        // if (myMonster.exp < d.monsterLv.needExp) {
                        //     return {
                        //         type: 0,
                        //         data: d
                        //     }
                        // }
                        // if (player.assets.gold < d.monsterLv.needGold) {
                        //     return {
                        //         type: 1,
                        //         data: d
                        //     }
                        // }
                        // if (player.assets.gem < d.monsterLv.needGem) {
                        //     return {
                        //         type: 2,
                        //         data: d
                        //     }
                        // }
                        // cc.log("节奏 现在可以升级",myMonster.exp);
                        // myMonster.exp -= d.monsterLv.needExp
                        // player.assets.gold -= d.monsterLv.needGold
                        // Emitter.fire("onAddGoldString", player.assets.gold)
                        // player.assets.gem -= d.monsterLv.needGem
                        // Emitter.fire("onAddGemString", player.assets.gem)
                        myMonster.lv += 1
                        Emitter.fire("onShengji")
                        // myMonster.exp+=addexp
                        this.setJson("player", player)

                        let query = {
                            id: myMonster.id,
                        }

                        let attributesNew = MonsterAttr.getMonsterJsonByLvAndId(query);
                        let querynew = {
                            id: myMonster.id,
                            lv: attributesNew.lvdata.lv
                        }

                        let monsterJson = MonsterAttr.getMonsterNeedJsonByLvAndId(querynew);
                        let deformation = MonsterAttr.checkMonsterdeformationJsonByLvAndId(querynew);
                        // cc.log("现在点击恐龙上面的 下面的恐龙回来的数据", monsterJson);

                        let data1 = {
                            monster: attributesNew,
                            monsterLv: monsterJson,
                            deformation: deformation
                        }
                        // cc.log("节奏 现在返回", data1);
                        return data1
                    }
                }
            }
            // if (data.monster.team == MonsterTeam.MONSTER) {
            //     for (let i = 0; i <player.otherMonster.length ; i++) {
            //         if (player.otherMonster[i].id == id) {
            //             player.otherMonster[i].exp+=addexp
            //             this.setJson("player",player)
            //         }
            //     }
            // }
        }
        return null
    }


    // UtilsDB.setSelectedNode(node)
    static setSelectedNode(node) {

        this.selectedNode = node


    }

    // UtilsDB.getSelectedNode()
    static getSelectedNode() {
        return this.selectedNode
    }

    // UtilsDB.selectedNodebackParent()
    static selectedNodebackParent() {
        let selectedNode = UtilsDB.getSelectedNode()
        if (selectedNode != null) {
            if (selectedNode.n != null) {
                Emitter.fire("onBackParent", {
                    n: selectedNode.n
                })
            }

        }
    }

    //获得技能队列
    // UtilsDB.getSkills()
    static getSkills() {
        return this.skills
    }

    //添加技能到队列
    // UtilsDB.addSkills(skillData)
    static addSkills(skillData) {
        // Emitter.fire("onBackParent", {
        //     n: selectedNode.n
        // })
        // Emitter.fire("onShowSkills")
        Emitter.fire("onAddSkills", skillData)

    }

    static removeSkillNode(skillNode) {
        skillNode.destroy()
        //保存
        Emitter.fire("onSaveGameSikll")
    }

    //添加技能到队列
    // UtilsDB.useSkills()
    static useSkills() {
        return this.skills.shift()
    }

    //格式化大数
    // UtilsDB.formatNum(num)
    static formatNum(num: number) {
        // num.

    }

    //UtilsDB.valueparseInt(value)
    static valueparseInt(value) {
        if (value >= 1000000000000) {
            //1000000000000 万亿
            value = Math.round(value / 10000000000) / 100 + "T"
        } else if (value >= 1000000000) {
            //1000000000  十亿
            value = Math.round(value / 10000000) / 100 + "B"
        } else if (value >= 1000000) {
            //1000000 百万
            value = Math.round(value / 10000) / 100 + "M"
        } else if (value >= 1000) {
            //1000 千
            value = Math.round(value / 10) / 100 + "K"
        }
        return value;
    }

    //获得格式化 小数点后几位的小数
    //UtilsDB.getFormatByIndex(format,index)
    static getFormatByIndex(format, index) {
        return parseFloat(format + "").toFixed(index);
    }

    // UtilsDB.initRecording()
    static initRecording() {
        this.setJson("Recording", {
            lvData: []
        })
    }

    // UtilsDB.getRecording()
    static getRecording() {
        if (this.getJson("Recording") == null) {
            this.initRecording()
        }

        return this.getJson("Recording")
    }

    // UtilsDB.getRecordingByLv(lv)
    static getRecordingByLv(lv: number) {
        if (this.getJson("Recording") == null) {
            this.initRecording()
        }
        let recording = this.getJson("Recording")
        for (let i = 0; i < recording.lvData.length; i++) {
            if (lv == i) {
                return recording.lvData[i]
            }
        }

        return null
    }

    // UtilsDB.setRecordingByLv(lv,itemrecording)
    static setRecordingByLv(lv, itemrecording) {
        let temp = itemrecording
        if (this.getJson("Recording") == null) {
            this.initRecording()
        }
        let recording = this.getJson("Recording")

        recording.lvData[lv] = temp

        this.setJson("Recording", recording)
    }

    static initRandom() {
        this.setJson("random", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            fastGameRandom: {
                // 意思是 范围1 - 10 小于8 的都是满足结果
                min: 0,
                max: 100,
                //这个是当前概率
                pointer: 80
            }
        })
        return this.getJson("random")
    }

    // UtilsDB.getRandom().fastGameRandom
    static getRandom() {
        if (this.getJson("random") == null) {
            this.initRandom()
        }
        return this.getJson("random")
    }

    //UtilsDB.setPlayer(player)
    static setRandom(random) {
        return this.setJson("random", random)
    }

    static removeRandom() {

        this.remove("random")
    }

    //初始化背包
    static initBackPack() {
        this.setJson("backPack", {
            //快速战斗的随机值
            // UtilsDB.getRandom().fastGameRandom
            pic: [
                {
                    id : 1,
                    min: 0,
                    max: 100
                },
                {
                    id : 2,
                    min: 0,
                    max: 150
                }

            ]
        })
        return this.getJson("backPack")
    }

    // UtilsDB.getBackPack()
    static getBackPack() {
        if (this.getJson("random") == null) {
            this.initRandom()
        }
        return this.getJson("backPack")
    }

    //UtilsDB.setBackPack(player)
    static setBackPack(backPack) {
        return this.setJson("backPack", backPack)
    }

    static removeBackPack() {

        this.remove("backPack")
    }

}
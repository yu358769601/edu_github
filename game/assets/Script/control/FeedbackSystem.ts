// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {
    chengfaPOPType,
    clickPOPType, Collisiontype,
    PlayerGameType,
    playerSpType, playerType, TalkListType,
    tipsText, ZindexType
} from "../System/Type/enums";
import LoadManage from "../System/Load/LoadManage";
import BaseComponent from "../System/Base/BaseComponent";
import log = cc.log;
import JsonManager from "../manage/JsonManager";
import StaticData from "../System/data/StaticData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackSystem extends BaseComponent {
    //反馈系统
    @property(sp.Skeleton)
    sp: sp.Skeleton = null;


    @property([cc.SpriteFrame])
    spf: cc.SpriteFrame[] = [];


    playerGameType: number = PlayerGameType.zhengchang
    wudiTimeMin: number = 0
    wudiTimeMax: number = 3

    toumingduTag: boolean = true



     onDestroy(): void {
        this.removeEmitter()
         ccLog.log("創建了幾個呢 player 1")
    }

    removeEmitter() {
        Emitter.remove('onGreenLightSound', this.onGreenLightSound, this)
        Emitter.remove('onRedLightSound', this.onRedLightSound, this)

        Emitter.remove('onEnterWarning', this.onEnterWarning, this)
        Emitter.remove('onExitWarning', this.onExitWarning, this)

        Emitter.remove('onEnterDanger', this.onEnterDanger, this)
        Emitter.remove('onExitDanger', this.onExitDanger, this)
        Emitter.remove('onStayDanger', this.onStayDanger, this)
        Emitter.remove('onEnterAuto', this.onEnterAuto, this)
        Emitter.remove('onEnterDangerMove', this.onEnterDangerMove, this)


    }

    registerEmitter() {
        Emitter.register('onGreenLightSound', this.onGreenLightSound, this)
        Emitter.register('onRedLightSound', this.onRedLightSound, this)

        Emitter.register('onEnterWarning', this.onEnterWarning, this)
        Emitter.register('onExitWarning', this.onExitWarning, this)

        Emitter.register('onEnterDanger', this.onEnterDanger, this)
        Emitter.register('onExitDanger', this.onExitDanger, this)
        Emitter.register('onStayDanger', this.onStayDanger, this)

        Emitter.register('onEnterCar', this.onEnterCar, this)
        Emitter.register('onEnterAuto', this.onEnterAuto, this)
        Emitter.register('onEnterDangerMove', this.onEnterDangerMove, this)
    }

    onLoad() {

        this.removeEmitter()
        this.registerEmitter()
        ccLog.log("創建了幾個呢 player 0")
        // this.playerGameType = PlayerGameType.wudi
    }

    //被车撞
    async onEnterCar() {
        if (this.playerGameType == PlayerGameType.zhengchang) {
            this.playerGameType = PlayerGameType.wudi
            // Emitter.fire('onTipsShow', {txt: tipsText.beichezhuang})
            Emitter.fire("onActionTag", false)
            Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)

            Emitter.fire("onSp", playerSpType.shizhang_che)
            Emitter.fire("onUpTime", -120)
            Emitter.fire("onCountDownSuspend", false)
            await this.setTimerOnce(this.wudiTimeMax)
            Emitter.fire('onEnterCarAfter',this,0,this.onEndCallBackCar)

        }

    }
    async onEndCallBackCar(self,data){
        await self.setTimerOnce(self.wudiTimeMax)
        Emitter.fire("onActionTag", true)
        Emitter.fire("onCountDownSuspend", true)
        Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
    }
    //听见红灯声音
    async onRedLightSound(selfName, target, index) {
        // this.node.get

        // let src = this.node.getPosition();
        // let dir = target.node.getPosition().sub(src);
        // let len = dir.mag();
        // // ccLog.log("人和红绿灯距离 ",len)
        // if (len < 200) {
        //     let RedlightAudio = await LoadManage.getAudioForName("RedlightAudio")
        //     cc.audioEngine.play(RedlightAudio, false, 1);
        //     return
        // }else if (len >= 200 && len < 400){
        //     let RedlightAudio = await LoadManage.getAudioForName("RedlightAudio")
        //     cc.audioEngine.play(RedlightAudio, false, 0.65);
        // }else if (len >= 400 && len < 700){
        //     let RedlightAudio = await LoadManage.getAudioForName("RedlightAudio")
        //     cc.audioEngine.play(RedlightAudio, false, 0.30);
        // }

    }

    //听见绿灯声音
    async onGreenLightSound(selfName, target, index) {
        // this.node.get

        // let src = this.node.getPosition();
        // let dir = target.node.getPosition().sub(src);
        // let len = dir.mag();
        // // ccLog.log("人和红绿灯距离 ",len)
        // if (len < 200) {
        //   let GreenlightAudio = await LoadManage.getAudioForName("GreenlightAudio")
        //     cc.audioEngine.play(GreenlightAudio, false, 1);
        //     return
        // }else if (len >= 200 && len < 400){
        //     let GreenlightAudio = await LoadManage.getAudioForName("GreenlightAudio")
        //     cc.audioEngine.play(GreenlightAudio, false, 0.65);
        // }else if (len >= 400 && len < 700){
        //     let GreenlightAudio = await LoadManage.getAudioForName("GreenlightAudio")
        //     cc.audioEngine.play(GreenlightAudio, false, 0.30);
        // }


    }


    //进入警告
    async onEnterWarning(selfName, type) {
        // let controlPlayer1 = null
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            if (controlPlayer.data.type == playerType.shizhang) {
                // controlPlayer1 = controlPlayer
                switch (type) {
                    case Collisiontype.shigong:
                    case Collisiontype.xiepo:
                    case Collisiontype.lajitong:
                    case Collisiontype.xiaohai:
                    case Collisiontype.luzhang:
                    case Collisiontype.shui:
                        if (StaticData.getInstance().getDataKeyValue("危险次数") == null) {
                            //播放对话框
                            StaticData.getInstance().addData("危险次数",0)
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onCountDownSuspend", false)
                            let item = JsonManager.getTalkListItem(TalkListType.导盲犬首次提示)
                            Emitter.fire("onOpenTalk",item,(data)=>{
                                Emitter.fire("onActionTag", true)
                                Emitter.fire("onCountDownSuspend", true)
                            })
                        }

                        Emitter.fire("onSp", playerSpType.shizhang_weixian)
                        break
                }
                controlPlayer.isWarning = true
            } else if (controlPlayer.data.type == playerType.canzhang) {
                switch (type) {
                    case Collisiontype.shigong:
                    case Collisiontype.xiepo:
                    case Collisiontype.lajitong:
                    case Collisiontype.xiaohai:
                    case Collisiontype.luzhang:
                    case Collisiontype.shui:
                    case Collisiontype.louti:
                        // Emitter.fire("onSp", playerSpType.shizhang_weixian)
                        break
                }
            }
        })
        // ccLog.log("测试 0 ",controlPlayer1)
        // let player1 = null
        Emitter.fire("onGetPlayer", this, async (self, player) => {
            // player1 = player
            player.node.zIndex = ZindexType.jin
        })
        // ccLog.log("测试 1 ",player1)


        // onGetPlayer
    }

    //离开警告
    onExitWarning(selfName) {
        Emitter.fire("onGetPlayer", this, async (self, player) => {
            // player1 = player
            // player.node.zIndex = ZindexType.zhencghang
            // ccLog.log("出去了吗")

        })
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            if (controlPlayer.data.type == playerType.shizhang) {
                controlPlayer.isWarning = false
            } else if (controlPlayer.data.type == playerType.canzhang) {
            }
        })

        if (this.playerGameType == PlayerGameType.wudi) {
            return
        }
        Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
    }

    async onEnterDangerMove(selfName, type,num){
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            if (controlPlayer.data.type == playerType.shizhang) {

                switch (type) {

                    case Collisiontype.xiepo:
                    // case Collisiontype.louti:
                    case Collisiontype.shangchanglouti:
                    case Collisiontype.luzhang:
                    case Collisiontype.茶餐廳樓梯:

                    case Collisiontype.活動現場上樓梯:

                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            self.playerGameType = PlayerGameType.wudi
                            Emitter.fire('onBoom', {txt: tipsText.mudidi})
                            // Emitter.fire('onTipsShow', {txt: "我现在被车撞了"})
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,true)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_che]
                            // await this.setTimerOnce(this.wudiTimeMax)
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,false)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_weixian]
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onSp", playerSpType.shizhang_che)
                            Emitter.fire("onUpTime", -120)
                            Emitter.fire("onCountDownSuspend", false)
                            Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                            await self.setTimerOnce(self.wudiTimeMax)
                            // Emitter.fire(type)
                            switch (type) {

                                case Collisiontype.shigong:
                                    Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.xiepo:
                                    Emitter.fire('onEnterXiepoAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.luzhang:
                                    Emitter.fire('onEnterluzhangAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.shangchanglouti:
                                    Emitter.fire('onEntershangchangloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.louti:
                                    Emitter.fire('onEnterLoutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.茶餐廳樓梯:
                                    Emitter.fire('onEnterLouti6After',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.活動現場上樓梯:
                                    Emitter.fire('onEnterhuodongloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;


                            }

                        }
                        break;
                    case Collisiontype.移动NPC:
                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            self.playerGameType = PlayerGameType.wudi
                            Emitter.fire('onBoom', {txt: tipsText.mudidi})
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onSp", playerSpType.shizhang_che)
                            Emitter.fire("onUpTime", -120)
                            Emitter.fire("onCountDownSuspend", false)
                            Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                            // await self.setTimerOnce(self.wudiTimeMax)


                            Emitter.fire('onEnterNPCMoveAfter',self,controlPlayer.data.type,self.onEndCallBack,num)


                        }

                        break;
                    //可以被破坏
                    case Collisiontype.lajitong:
                    case Collisiontype.shigong:
                    case Collisiontype.shuinidi:
                    case Collisiontype.shui:
                    case Collisiontype.活動現場施工:
                    case Collisiontype.活動現場施工1:

                        Emitter.fire('onBoom', {txt: tipsText.mudidi})
                        Emitter.fire("onActionTag", false)
                        Emitter.fire("onSp", playerSpType.shizhang_che)
                        Emitter.fire("onUpTime", -120)
                        Emitter.fire("onCountDownSuspend", false)
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                        // await self.setTimerOnce(self.wudiTimeMax)
                        switch (type) {
                            case Collisiontype.lajitong:
                                Emitter.fire('onEnterlajitongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;

                            case Collisiontype.shuinidi:
                                Emitter.fire('onEnterShuinidiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shigong:
                                // ccLog.log("撞了施工",type)
                                Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shui:
                                Emitter.fire('onEntershuitanAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.活動現場施工:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,0)
                                break;
                            case Collisiontype.活動現場施工1:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,1)
                                break;
                        }

                        break;
                    //   正確的
                    case Collisiontype.zhengquexiepo:
                    case Collisiontype.zhengquetianqiao:
                    case Collisiontype.zhengquebashizhankaishi:
                    case Collisiontype.茶餐廳滑梯:
                    case Collisiontype.茶餐廳入口:
                    case Collisiontype.活動地點結束:


                        // onEnterzhengquexiepoAfter
                        Emitter.fire("onActionTag", false)
                        Emitter.fire("onCountDownSuspend", false)
                        Emitter.fire("onSp", playerSpType.shizhang_happy)
                        ccLog.log("活動地點結束","type1",type,"type2",Collisiontype.活動地點結束)
                        switch (type) {
                            case Collisiontype.zhengquexiepo:
                                Emitter.fire('onEnterzhengquexiepoAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.zhengquetianqiao:
                                Emitter.fire('onEntertishitianqiaowanchengAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.zhengquebashizhankaishi:
                                Emitter.fire('onEntertishibashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.茶餐廳滑梯:
                                Emitter.fire('onEnterchacantinghuatAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.茶餐廳入口:
                                Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.活動地點結束:
                                Emitter.fire('onEnterhuodongdidianAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;


                        }
                        break;

                    //提示
                    case Collisiontype.tishihonglvdeng:
                    case Collisiontype.xiaohai:
                    // case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                    case Collisiontype.等車的人:
                    case Collisiontype.專用車位:
                        switch (type) {
                            case Collisiontype.tishihonglvdeng:
                                this.allTips()
                                Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                                ccLog.log("這裡走了?")
                                Emitter.fire("onGetPre_shizhang_2", this, async (self, Pre_shizhang_2) => {
                                    if (Pre_shizhang_2.xishoujianTag == true) {
                                        this.allTips()
                                        let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        Emitter.fire("onOpenTalk",item,async(data)=>{
                                            Emitter.fire("onActionTag",true)
                                            Emitter.fire("onCountDownSuspend", true)
                                            // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                                            // Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                                        })
                                        // let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        // Emitter.fire("onOpenTalk",item,async(data)=>{
                                        //     Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
                                        //     await self.setTimerOnce(2)
                                        //     ccLog.log("现在点了电梯控制器")
                                        //
                                        //     //坐电梯第一关
                                        //     Emitter.fire("onTakeThe2Elevator")
                                        // })

                                    }else{
                                        // Emitter.fire("onActionTag",true)
                                        // Emitter.fire("onCountDownSuspend", true)
                                    }
                                })
                                // Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.xiaohai:
                                this.allTips()
                                Emitter.fire('onEnterxiaohaiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.等車的人:

                                this.allTips()
                                Emitter.fire('onEnterbashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.專用車位:
                                this.allTips()
                                Emitter.fire('onEnterzhuanyongcheweiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                        }
                        break;

                }


            } else if (controlPlayer.data.type == playerType.canzhang) {
                ccLog.log("主角上樓梯",type,"type1",Collisiontype.茶餐廳樓梯,"type2",Collisiontype.茶餐廳滑梯)
                switch (type) {

                    case Collisiontype.xiepo:
                    case Collisiontype.louti:
                    case Collisiontype.shangchanglouti:
                    case Collisiontype.luzhang:
                    case Collisiontype.茶餐廳樓梯:

                    case Collisiontype.活動現場上樓梯:

                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            self.playerGameType = PlayerGameType.wudi
                            Emitter.fire('onBoom', {txt: tipsText.mudidi})
                            // Emitter.fire('onTipsShow', {txt: "我现在被车撞了"})
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,true)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_che]
                            // await this.setTimerOnce(this.wudiTimeMax)
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,false)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_weixian]
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onSp", playerSpType.shizhang_che)
                            Emitter.fire("onUpTime", -120)
                            Emitter.fire("onCountDownSuspend", false)
                            Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                            await self.setTimerOnce(self.wudiTimeMax)
                            // Emitter.fire(type)
                            switch (type) {

                                case Collisiontype.shigong:
                                    Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.xiepo:
                                    Emitter.fire('onEnterXiepoAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.luzhang:
                                    Emitter.fire('onEnterluzhangAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.shangchanglouti:
                                    Emitter.fire('onEntershangchangloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.louti:
                                    Emitter.fire('onEnterLoutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.茶餐廳樓梯:
                                    Emitter.fire('onEnterLouti6After',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.活動現場上樓梯:
                                    Emitter.fire('onEnterhuodongloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;


                            }

                        }
                        break;
                    case Collisiontype.移动NPC:
                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            self.playerGameType = PlayerGameType.wudi
                            Emitter.fire('onBoom', {txt: tipsText.mudidi})
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onSp", playerSpType.shizhang_che)
                            Emitter.fire("onUpTime", -120)
                            Emitter.fire("onCountDownSuspend", false)
                            Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                            // await self.setTimerOnce(self.wudiTimeMax)


                            Emitter.fire('onEnterNPCMoveAfter',self,controlPlayer.data.type,self.onEndCallBack,num)


                        }

                        break;
                    //可以被破坏
                    case Collisiontype.lajitong:
                    case Collisiontype.shigong:
                    case Collisiontype.shuinidi:
                    case Collisiontype.shui:
                    case Collisiontype.活動現場施工:
                    case Collisiontype.活動現場施工1:

                        Emitter.fire('onBoom', {txt: tipsText.mudidi})
                        Emitter.fire("onActionTag", false)
                        Emitter.fire("onSp", playerSpType.shizhang_che)
                        Emitter.fire("onUpTime", -120)
                        Emitter.fire("onCountDownSuspend", false)
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                        // await self.setTimerOnce(self.wudiTimeMax)
                        switch (type) {
                            case Collisiontype.lajitong:
                                Emitter.fire('onEnterlajitongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;

                            case Collisiontype.shuinidi:
                                Emitter.fire('onEnterShuinidiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shigong:
                                // ccLog.log("撞了施工",type)
                                Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shui:
                                Emitter.fire('onEntershuitanAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.活動現場施工:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,0)
                                break;
                            case Collisiontype.活動現場施工1:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,1)
                                break;
                        }

                        break;
                    //   正確的
                    case Collisiontype.zhengquexiepo:
                    case Collisiontype.zhengquetianqiao:
                    case Collisiontype.zhengquebashizhankaishi:
                    case Collisiontype.茶餐廳滑梯:
                    case Collisiontype.茶餐廳入口:
                    case Collisiontype.活動地點結束:


                        // onEnterzhengquexiepoAfter
                        Emitter.fire("onActionTag", false)
                        Emitter.fire("onCountDownSuspend", false)
                        Emitter.fire("onSp", playerSpType.shizhang_happy)
                        ccLog.log("活動地點結束","type1",type,"type2",Collisiontype.活動地點結束)
                        switch (type) {
                            case Collisiontype.zhengquexiepo:
                                Emitter.fire('onEnterzhengquexiepoAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.zhengquetianqiao:
                                Emitter.fire('onEntertishitianqiaowanchengAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.zhengquebashizhankaishi:
                                Emitter.fire('onEntertishibashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.茶餐廳滑梯:
                                Emitter.fire('onEnterchacantinghuatAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.茶餐廳入口:
                                Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.活動地點結束:
                                Emitter.fire('onEnterhuodongdidianAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;


                        }
                        break;

                    //提示
                    case Collisiontype.tishihonglvdeng:
                    case Collisiontype.xiaohai:
                    // case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                    case Collisiontype.等車的人:
                    case Collisiontype.專用車位:
                        switch (type) {
                            case Collisiontype.tishihonglvdeng:
                                this.allTips()
                                Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                                ccLog.log("這裡走了?")
                                Emitter.fire("onGetPre_shizhang_2", this, async (self, Pre_shizhang_2) => {
                                    if (Pre_shizhang_2.xishoujianTag == true) {
                                        this.allTips()
                                        let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        Emitter.fire("onOpenTalk",item,async(data)=>{
                                            Emitter.fire("onActionTag",true)
                                            Emitter.fire("onCountDownSuspend", true)
                                            // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                                            // Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                                        })
                                        // let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        // Emitter.fire("onOpenTalk",item,async(data)=>{
                                        //     Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
                                        //     await self.setTimerOnce(2)
                                        //     ccLog.log("现在点了电梯控制器")
                                        //
                                        //     //坐电梯第一关
                                        //     Emitter.fire("onTakeThe2Elevator")
                                        // })

                                    }else{
                                        // Emitter.fire("onActionTag",true)
                                        // Emitter.fire("onCountDownSuspend", true)
                                    }
                                })
                                // Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.xiaohai:
                                this.allTips()
                                Emitter.fire('onEnterxiaohaiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.等車的人:

                                this.allTips()
                                Emitter.fire('onEnterbashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.專用車位:
                                this.allTips()
                                Emitter.fire('onEnterzhuanyongcheweiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                        }
                        break;

                }
            }
        })
    }


    //进入危险
    async onEnterDanger(selfName, type) {
        // ccLog.log("這裡走了?",type)
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            if (controlPlayer.data.type == playerType.shizhang) {

                switch (type) {

                    case Collisiontype.xiepo:
                    // case Collisiontype.louti:
                    case Collisiontype.shangchanglouti:
                    // case Collisiontype.luzhang:
                    // case Collisiontype.茶餐廳樓梯:

                    // case Collisiontype.活動現場上樓梯:

                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            self.playerGameType = PlayerGameType.wudi
                            Emitter.fire('onBoom', {txt: tipsText.mudidi})
                            // Emitter.fire('onTipsShow', {txt: "我现在被车撞了"})
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,true)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_che]
                            // await this.setTimerOnce(this.wudiTimeMax)
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,false)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_weixian]
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onSp", playerSpType.shizhang_che)
                            Emitter.fire("onUpTime", -120)
                            Emitter.fire("onCountDownSuspend", false)
                            Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                            await self.setTimerOnce(self.wudiTimeMax)
                            // Emitter.fire(type)
                            switch (type) {

                                case Collisiontype.shigong:
                                    Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.xiepo:
                                    Emitter.fire('onEnterXiepoAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.luzhang:
                                    Emitter.fire('onEnterluzhangAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.shangchanglouti:
                                    Emitter.fire('onEntershangchangloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.louti:
                                    Emitter.fire('onEnterLoutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.茶餐廳樓梯:
                                    Emitter.fire('onEnterLouti6After',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.活動現場上樓梯:
                                    Emitter.fire('onEnterhuodongloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;


                            }

                        }
                        break;

                    //可以被破坏
                    case Collisiontype.lajitong:
                    case Collisiontype.shigong:
                    case Collisiontype.shuinidi:
                    case Collisiontype.shui:
                    case Collisiontype.活動現場施工:
                    case Collisiontype.活動現場施工1:

                        Emitter.fire('onBoom', {txt: tipsText.mudidi})
                        Emitter.fire("onActionTag", false)
                        Emitter.fire("onSp", playerSpType.shizhang_che)
                        Emitter.fire("onUpTime", -120)
                        Emitter.fire("onCountDownSuspend", false)
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                        // await self.setTimerOnce(self.wudiTimeMax)
                        switch (type) {
                            case Collisiontype.lajitong:
                                Emitter.fire('onEnterlajitongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;

                            case Collisiontype.shuinidi:
                                Emitter.fire('onEnterShuinidiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shigong:
                                // ccLog.log("撞了施工",type)
                                Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shui:
                                Emitter.fire('onEntershuitanAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.活動現場施工:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,0)
                                break;
                            case Collisiontype.活動現場施工1:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,1)
                                break;
                        }

                        break;
                    //   正確的
                    // case Collisiontype.zhengquexiepo:
                    case Collisiontype.zhengquetianqiao:
                    case Collisiontype.zhengquebashizhankaishi:
                    case Collisiontype.茶餐廳滑梯:
                    case Collisiontype.茶餐廳入口:
                    case Collisiontype.活動地點結束:
                    case Collisiontype.luzhang:
                    case Collisiontype.盲人地铁上车:

                        // onEnterzhengquexiepoAfter

                        switch (type) {
                            case Collisiontype.luzhang:
                                // this.allHappy()
                                Emitter.fire("onActionTag", false)
                                Emitter.fire("onCountDownSuspend", false)
                                Emitter.fire('onEnterluzhangAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.zhengquexiepo:
                                this.allHappy()
                                Emitter.fire('onEnterzhengquexiepoAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.zhengquetianqiao:
                                this.allHappy()
                                Emitter.fire('onEntertishitianqiaowanchengAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.zhengquebashizhankaishi:
                                this.allHappy()
                                Emitter.fire('onEntertishibashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.茶餐廳滑梯:
                                this.allHappy()
                                Emitter.fire('onEnterchacantinghuatAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.茶餐廳入口:
                                this.allHappy()
                                Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.活動地點結束:
                                this.allHappy()
                                Emitter.fire('onEnterhuodongdidianAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.盲人地铁上车:
                                Emitter.fire("onActionTag", false)
                                Emitter.fire("onCountDownSuspend", false)
                                Emitter.fire('onEntermangrenshangditieAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;


                        }
                        break;

                    //提示
                    case Collisiontype.tishihonglvdeng:
                    case Collisiontype.xiaohai:
                    // case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                    case Collisiontype.等車的人:
                    case Collisiontype.專用車位:
                        switch (type) {
                            case Collisiontype.tishihonglvdeng:
                                this.allTips()
                                Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                                ccLog.log("這裡走了?")
                                Emitter.fire("onGetPre_shizhang_2", this, async (self, Pre_shizhang_2) => {
                                    if (Pre_shizhang_2.xishoujianTag == true) {
                                        this.allTips()
                                        let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        Emitter.fire("onOpenTalk",item,async(data)=>{
                                            Emitter.fire("onActionTag",true)
                                            Emitter.fire("onCountDownSuspend", true)
                                            // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                                            // Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                                        })
                                        // let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        // Emitter.fire("onOpenTalk",item,async(data)=>{
                                        //     Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
                                        //     await self.setTimerOnce(2)
                                        //     ccLog.log("现在点了电梯控制器")
                                        //
                                        //     //坐电梯第一关
                                        //     Emitter.fire("onTakeThe2Elevator")
                                        // })

                                    }else{
                                        // Emitter.fire("onActionTag",true)
                                        // Emitter.fire("onCountDownSuspend", true)
                                    }
                                })
                                // Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.xiaohai:
                                this.allTips()
                                Emitter.fire('onEnterxiaohaiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.等車的人:

                                this.allTips()
                                Emitter.fire('onEnterbashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.專用車位:
                                this.allTips()
                                Emitter.fire('onEnterzhuanyongcheweiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                        }
                        break;

                }


            } else if (controlPlayer.data.type == playerType.canzhang) {
                ccLog.log("主角上樓梯",type,"type1",Collisiontype.茶餐廳樓梯,"type2",Collisiontype.茶餐廳滑梯)
                switch (type) {

                    case Collisiontype.xiepo:
                    case Collisiontype.louti:
                    case Collisiontype.shangchanglouti:
                    case Collisiontype.luzhang:
                    case Collisiontype.茶餐廳樓梯:

                    case Collisiontype.活動現場上樓梯:

                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            self.playerGameType = PlayerGameType.wudi
                            Emitter.fire('onBoom', {txt: tipsText.mudidi})
                            // Emitter.fire('onTipsShow', {txt: "我现在被车撞了"})
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,true)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_che]
                            // await this.setTimerOnce(this.wudiTimeMax)
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,false)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_weixian]
                             Emitter.fire("onActionTag", false)
                            Emitter.fire("onSp", playerSpType.shizhang_che)
                            Emitter.fire("onUpTime", -120)
                            Emitter.fire("onCountDownSuspend", false)
                            Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                            await self.setTimerOnce(self.wudiTimeMax)
                            // Emitter.fire(type)
                            switch (type) {

                                case Collisiontype.shigong:
                                    Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.xiepo:
                                    Emitter.fire('onEnterXiepoAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.luzhang:
                                    Emitter.fire('onEnterluzhangAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;
                                case Collisiontype.shangchanglouti:
                                    Emitter.fire('onEntershangchangloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.louti:
                                    Emitter.fire('onEnterLoutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.茶餐廳樓梯:
                                    Emitter.fire('onEnterLouti6After',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;

                                case Collisiontype.活動現場上樓梯:
                                    Emitter.fire('onEnterhuodongloutiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                    break;


                            }

                        }
                        break;

                        //可以被破坏
                    case Collisiontype.lajitong:
                    case Collisiontype.shigong:
                    case Collisiontype.shuinidi:
                    case Collisiontype.shui:
                    case Collisiontype.活動現場施工:
                    case Collisiontype.活動現場施工1:

                        Emitter.fire('onBoom', {txt: tipsText.mudidi})
                        Emitter.fire("onActionTag", false)
                        Emitter.fire("onSp", playerSpType.shizhang_che)
                        Emitter.fire("onUpTime", -120)
                        Emitter.fire("onCountDownSuspend", false)
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.减少共融值, true)
                        // await self.setTimerOnce(self.wudiTimeMax)
                        switch (type) {
                            case Collisiontype.lajitong:
                                Emitter.fire('onEnterlajitongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;

                            case Collisiontype.shuinidi:
                                Emitter.fire('onEnterShuinidiAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shigong:
                                // ccLog.log("撞了施工",type)
                                Emitter.fire('onEntershigongAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.shui:
                                Emitter.fire('onEntershuitanAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                break;
                            case Collisiontype.活動現場施工:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,0)
                                break;
                            case Collisiontype.活動現場施工1:
                                Emitter.fire('onEnterhuodongshigongAfter',self,controlPlayer.data.type,self.onEndCallBack,1)
                                break;
                        }

                        break;
                     //   正確的
                     case Collisiontype.zhengquexiepo:
                     case Collisiontype.zhengquetianqiao:
                     case Collisiontype.zhengquebashizhankaishi:
                     case Collisiontype.茶餐廳滑梯:
                     case Collisiontype.茶餐廳入口:
                     case Collisiontype.活動地點結束:


                     // onEnterzhengquexiepoAfter
                         Emitter.fire("onActionTag", false)
                         Emitter.fire("onCountDownSuspend", false)
                         Emitter.fire("onSp", playerSpType.shizhang_happy)
                         ccLog.log("活動地點結束","type1",type,"type2",Collisiontype.活動地點結束)
                         switch (type) {
                             case Collisiontype.zhengquexiepo:
                                 Emitter.fire('onEnterzhengquexiepoAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                 break;
                             case Collisiontype.zhengquetianqiao:
                                 Emitter.fire('onEntertishitianqiaowanchengAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                 break;
                             case Collisiontype.zhengquebashizhankaishi:
                                 Emitter.fire('onEntertishibashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                 break;
                             case Collisiontype.茶餐廳滑梯:
                                 Emitter.fire('onEnterchacantinghuatAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                 break;
                             case Collisiontype.茶餐廳入口:
                                 Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                 break;
                             case Collisiontype.活動地點結束:
                                 Emitter.fire('onEnterhuodongdidianAfter',self,controlPlayer.data.type,self.onEndCallBack)
                                 break;


                         }
                         break;

                     //提示
                    case Collisiontype.tishihonglvdeng:
                    case Collisiontype.xiaohai:
                    // case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                    case Collisiontype.等車的人:
                    case Collisiontype.水泥地让路:
                    case Collisiontype.專用車位:
                    case Collisiontype.商场让路:
                    case Collisiontype.清洁工:
                    case Collisiontype.天桥电梯排队:
                    case Collisiontype.最后楼梯阻挡:
                        switch (type) {
                            case Collisiontype.tishihonglvdeng:
                                this.allTips()
                                Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.商場電梯提醒只有上完廁所才會有提醒:
                                ccLog.log("這裡走了?")
                                Emitter.fire("onGetPre_shizhang_2", this, async (self, Pre_shizhang_2) => {
                                    if (Pre_shizhang_2.xishoujianTag == true) {
                                        this.allTips()
                                        let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        Emitter.fire("onOpenTalk",item,async(data)=>{
                                            Emitter.fire("onActionTag",true)
                                            Emitter.fire("onCountDownSuspend", true)
                                            // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                                            // Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                                        })
                                        // let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                                        // Emitter.fire("onOpenTalk",item,async(data)=>{
                                        //     Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
                                        //     await self.setTimerOnce(2)
                                        //     ccLog.log("现在点了电梯控制器")
                                        //
                                        //     //坐电梯第一关
                                        //     Emitter.fire("onTakeThe2Elevator")
                                        // })

                                    }else{
                                        // Emitter.fire("onActionTag",true)
                                        // Emitter.fire("onCountDownSuspend", true)
                                    }
                                })
                                // Emitter.fire('onEntertishihonglvAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.xiaohai:
                                this.allTips()
                                Emitter.fire('onEnterxiaohaiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.等車的人:

                                this.allTips()
                                Emitter.fire('onEnterbashizhanAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.專用車位:
                                this.allTips()
                                Emitter.fire('onEnterzhuanyongcheweiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.水泥地让路:
                                this.allTips()
                                Emitter.fire('onEntershuinidirangluAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.商场让路:
                                this.allTips()
                                Emitter.fire('onEnterrangkaiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.清洁工:
                                this.allTips()
                                Emitter.fire('onEnterqingjieAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.天桥电梯排队:
                                this.allTips()
                                Emitter.fire('onEntertianqiaopaiduiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                            case Collisiontype.最后楼梯阻挡:
                                this.allTips()
                                Emitter.fire('onEnterloutipaiduiAfter',self,controlPlayer.data.type,self.onEndCallBackHappy)
                                break;
                        }
                    break;

                }
            }
        })


    }
    allHappy(){
        Emitter.fire("onActionTag", false)
        Emitter.fire("onCountDownSuspend", false)
        Emitter.fire("onSp", playerSpType.shizhang_happy)
        // ccLog.log("活動地點結束","type1",type,"type2",Collisiontype.活動地點結束)
    }
    allTips(){
        Emitter.fire("onActionTag", false)
        Emitter.fire("onCountDownSuspend", false)
    }


    // Emitter.fire("onEnterAuto",this.collisiontype)
    //代碼觸發的 打斷事件
     onEnterAuto(selfName, type){
        ccLog.log("被調用了幾次啊 1",type)
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            ccLog.log("被調用了幾次啊 2",type)
            if (controlPlayer.data.type == playerType.shizhang) {

                switch (type) {
                    case TalkListType.玩家出门:
                    case TalkListType.主角到了商場:
                    case TalkListType.想去洗手間:
                    case TalkListType.列車到了:
                    case TalkListType.接下來要去巴士站轉車:
                    case TalkListType.主角出了港鐵站:
                    case TalkListType.主角在巴士站下車:
                    case TalkListType.主角經過斜坡上茶餐廳:
                    case TalkListType.主角吃完飯:
                    case TalkListType.主角小心穿過公園到達目的地:
                    case TalkListType.衛生間已經到了:
                    case TalkListType.上车绑定:
                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            // self.playerGameType = PlayerGameType.wudi
                            // Emitter.fire('onTipsShow', {txt: "我现在被车撞了"})
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,true)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_che]
                            // await this.setTimerOnce(this.wudiTimeMax)
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,false)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_weixian]
                            // Emitter.fire("onSp", playerSpType.shizhang_che)
                            // Emitter.fire("onUpTime", -120)
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onCountDownSuspend", false)
                            // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, true)
                            // await self.setTimerOnce(self.wudiTimeMax)
                            // Emitter.fire(type)
                            ccLog.log("到了嗎",type)
                            switch (type) {

                                case TalkListType.玩家出门:
                                    Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.上车绑定:
                                    Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角到了商場:
                                    Emitter.fire('onEntertishishangchangAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.想去洗手間:
                                    Emitter.fire('onEntertishixishoujianAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.列車到了:
                                    Emitter.fire('onEntertishishangditieAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.接下來要去巴士站轉車:
                                    Emitter.fire('onEntertishitianqiaoAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角出了港鐵站:
                                    Emitter.fire('onEntertishizhunbeibashiAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角在巴士站下車:
                                    Emitter.fire('onEntertishibusxiacheAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角吃完飯:
                                    Emitter.fire('onEntertishi7chumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角小心穿過公園到達目的地:
                                    Emitter.fire('onEnter7jieshuAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.衛生間已經到了:
                                    Emitter.fire('onEnterweishengjianEndAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                // case TalkListType.主角經過斜坡上茶餐廳:
                                //     Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                //     break;
                            }

                        }


                }


            } else
                if (controlPlayer.data.type == playerType.canzhang) {
                switch (type) {
                    case TalkListType.玩家出门:
                    case TalkListType.主角到了商場:
                    case TalkListType.想去洗手間:
                    case TalkListType.列車到了:
                    case TalkListType.接下來要去巴士站轉車:
                    case TalkListType.主角出了港鐵站:
                    case TalkListType.主角在巴士站下車:
                    case TalkListType.主角經過斜坡上茶餐廳:
                    case TalkListType.主角吃完飯:
                    case TalkListType.主角小心穿過公園到達目的地:
                    case TalkListType.衛生間已經到了:
                    case TalkListType.上车绑定:
                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            // self.playerGameType = PlayerGameType.wudi
                            // Emitter.fire('onTipsShow', {txt: "我现在被车撞了"})
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,true)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_che]
                            // await this.setTimerOnce(this.wudiTimeMax)
                            // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,false)
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
                            // this.sp.spriteFrame = this.spf[playerSpType.shizhang_weixian]
                            // Emitter.fire("onSp", playerSpType.shizhang_che)
                            // Emitter.fire("onUpTime", -120)
                            Emitter.fire("onActionTag", false)
                            Emitter.fire("onCountDownSuspend", false)
                            // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, true)
                            // await self.setTimerOnce(self.wudiTimeMax)
                            // Emitter.fire(type)
                            ccLog.log("到了嗎",type)
                            switch (type) {

                                case TalkListType.玩家出门:
                                    Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.上车绑定:
                                    Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角到了商場:
                                    Emitter.fire('onEntertishishangchangAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.想去洗手間:
                                    Emitter.fire('onEntertishixishoujianAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.列車到了:
                                    Emitter.fire('onEntertishishangditieAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.接下來要去巴士站轉車:
                                    Emitter.fire('onEntertishitianqiaoAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角出了港鐵站:
                                    Emitter.fire('onEntertishizhunbeibashiAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角在巴士站下車:
                                    Emitter.fire('onEntertishibusxiacheAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角吃完飯:
                                    Emitter.fire('onEntertishi7chumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.主角小心穿過公園到達目的地:
                                    Emitter.fire('onEnter7jieshuAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                case TalkListType.衛生間已經到了:
                                    Emitter.fire('onEnterweishengjianEndAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                    break;
                                // case TalkListType.主角經過斜坡上茶餐廳:
                                //     Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                                //     break;
                            }

                        }


                }
            }
        })
    }

    async onEndCallBackTishiAuto(self,data){
        // self.playerGameType = PlayerGameType.wudi

        // await self.setTimerOnce(self.wudiTimeMax)
        Emitter.fire("onActionTag", true)
        Emitter.fire("onCountDownSuspend", true)
        // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
        Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
    }


    async onEndCallBackTishi(self,data){
        // self.playerGameType = PlayerGameType.wudi

        await self.setTimerOnce(self.wudiTimeMax)
        Emitter.fire("onActionTag", true)
        Emitter.fire("onCountDownSuspend", true)
        // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
        Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
    }
    async onEndCallBackHappy(self,data){
        // self.playerGameType = PlayerGameType.wudi

        // await self.setTimerOnce(self.wudiTimeMax)
        Emitter.fire("onActionTag", true)
        Emitter.fire("onCountDownSuspend", true)
        // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
        Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
    }

    async onEndCallBack(self,data){
        self.playerGameType = PlayerGameType.wudi
        await self.setTimerOnce(self.wudiTimeMax)
        Emitter.fire("onActionTag", true)
        Emitter.fire("onCountDownSuspend", true)
        Emitter.fire("onSp", playerSpType.shizhang_zhengchang)


    }



    //离开危险
    onExitDanger(selfName) {
        // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            if (controlPlayer.data.type == playerType.shizhang) {
                controlPlayer.isWarning = false
            } else if (controlPlayer.data.type == playerType.canzhang) {
            }
        })
    }
    //在危险中
    onStayDanger(selfName, type) {
        let selfthis = this
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            if (controlPlayer.data.type == playerType.shizhang) {

                switch (type) {
                    case Collisiontype.盲人狗提示红灯危险:

                        if (self.playerGameType == PlayerGameType.zhengchang) {
                            Emitter.fire("onGetControlTrafficlights",this,(selfnew,ControlTrafficlights)=>{
                                if (ControlTrafficlights.run == false ) {
                                    // Emitter.fire("onSp", playerSpType.shizhang_weixian)
                                    controlPlayer.isWarning = true
                                }
                            })

                            if (StaticData.getInstance().getDataKeyValue("危险次数") == null) {
                                //播放对话框
                                StaticData.getInstance().addData("危险次数",0)
                                Emitter.fire("onActionTag", false)
                                Emitter.fire("onCountDownSuspend", false)
                                let item = JsonManager.getTalkListItem(TalkListType.导盲犬首次提示)
                                Emitter.fire("onOpenTalk",item,(data)=>{
                                    Emitter.fire("onActionTag", true)
                                    Emitter.fire("onCountDownSuspend", true)
                                })
                            }


                            // switch (type) {
                            //
                            //     case TalkListType.玩家出门:
                            //         Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.上车绑定:
                            //         Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.主角到了商場:
                            //         Emitter.fire('onEntertishishangchangAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.想去洗手間:
                            //         Emitter.fire('onEntertishixishoujianAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.列車到了:
                            //         Emitter.fire('onEntertishishangditieAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.接下來要去巴士站轉車:
                            //         Emitter.fire('onEntertishitianqiaoAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.主角出了港鐵站:
                            //         Emitter.fire('onEntertishizhunbeibashiAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.主角在巴士站下車:
                            //         Emitter.fire('onEntertishibusxiacheAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.主角吃完飯:
                            //         Emitter.fire('onEntertishi7chumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.主角小心穿過公園到達目的地:
                            //         Emitter.fire('onEnter7jieshuAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     case TalkListType.衛生間已經到了:
                            //         Emitter.fire('onEnterweishengjianEndAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //         break;
                            //     // case TalkListType.主角經過斜坡上茶餐廳:
                            //     //     Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                            //     //     break;
                            // }

                        }


                }


            } else
            if (controlPlayer.data.type == playerType.canzhang) {
                // switch (type) {
                //     case TalkListType.玩家出门:
                //     case TalkListType.主角到了商場:
                //     case TalkListType.想去洗手間:
                //     case TalkListType.列車到了:
                //     case TalkListType.接下來要去巴士站轉車:
                //     case TalkListType.主角出了港鐵站:
                //     case TalkListType.主角在巴士站下車:
                //     case TalkListType.主角經過斜坡上茶餐廳:
                //     case TalkListType.主角吃完飯:
                //     case TalkListType.主角小心穿過公園到達目的地:
                //     case TalkListType.衛生間已經到了:
                //     case TalkListType.上车绑定:
                //         if (self.playerGameType == PlayerGameType.zhengchang) {
                //             // self.playerGameType = PlayerGameType.wudi
                //             // Emitter.fire('onTipsShow', {txt: "我现在被车撞了"})
                //             // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,true)
                //             // this.sp.spriteFrame = this.spf[playerSpType.shizhang_che]
                //             // await this.setTimerOnce(this.wudiTimeMax)
                //             // Emitter.fire('onShowHidePlayerTips',chengfaPOPType.koushijian,false)
                //             // this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
                //             // this.sp.spriteFrame = this.spf[playerSpType.shizhang_weixian]
                //             // Emitter.fire("onSp", playerSpType.shizhang_che)
                //             // Emitter.fire("onUpTime", -120)
                //             Emitter.fire("onActionTag", false)
                //             Emitter.fire("onCountDownSuspend", false)
                //             // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, true)
                //             // await self.setTimerOnce(self.wudiTimeMax)
                //             // Emitter.fire(type)
                //             ccLog.log("到了嗎",type)
                //             switch (type) {
                //
                //                 case TalkListType.玩家出门:
                //                     Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.上车绑定:
                //                     Emitter.fire('onEntertishichumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.主角到了商場:
                //                     Emitter.fire('onEntertishishangchangAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.想去洗手間:
                //                     Emitter.fire('onEntertishixishoujianAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.列車到了:
                //                     Emitter.fire('onEntertishishangditieAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.接下來要去巴士站轉車:
                //                     Emitter.fire('onEntertishitianqiaoAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.主角出了港鐵站:
                //                     Emitter.fire('onEntertishizhunbeibashiAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.主角在巴士站下車:
                //                     Emitter.fire('onEntertishibusxiacheAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.主角吃完飯:
                //                     Emitter.fire('onEntertishi7chumenAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.主角小心穿過公園到達目的地:
                //                     Emitter.fire('onEnter7jieshuAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 case TalkListType.衛生間已經到了:
                //                     Emitter.fire('onEnterweishengjianEndAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                     break;
                //                 // case TalkListType.主角經過斜坡上茶餐廳:
                //                 //     Emitter.fire('onEnterchacantingAfter',self,controlPlayer.data.type,self.onEndCallBackTishiAuto)
                //                 //     break;
                //             }
                //
                //         }
                //
                //
                // }
            }
        })
    }

    // //离开危险
    // onExitDanger(selfName){
    //     this.sp.spriteFrame = this.spf[playerSpType.shizhang_zhengchang]
    // }


    start() {
        // playerSpType
    }

    callBackTimeOut(id, data) {
    }

    update(dt) {
        if (this.playerGameType == PlayerGameType.wudi) {
            this.wudiTimeMin += dt
            if (this.toumingduTag == true) {
                this.sp.node.opacity -= dt * 500
            } else {
                this.sp.node.opacity += dt * 500
            }
            if (this.sp.node.opacity <= 0) {
                this.toumingduTag = false
            } else if (this.sp.node.opacity >= 255) {
                this.toumingduTag = true
            }
            if (this.wudiTimeMin >= this.wudiTimeMax) {
                this.playerGameType = PlayerGameType.zhengchang
                this.wudiTimeMin = 0
                this.toumingduTag = true
                this.sp.node.opacity = 255
            }
        }
    }
}

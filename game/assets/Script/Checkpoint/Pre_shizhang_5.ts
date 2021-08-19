// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsNode from "../System/Utils/UtilsNode";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {
    chengfaPOPType,
    ElevatorType,
    MapName,
    NPCType, playerSpType,
    playerType,
    spActiconType,
    TalkListType,
    tipsText
} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import BaseCheckPoint from "../base/BaseCheckPoint";
import JsonManager from "../manage/JsonManager";
import PhysicsBoxCollider = cc.PhysicsBoxCollider;
import Gongrong, {gongrongType} from "../item/gongrong";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_5 extends BaseCheckPoint {

    @property(cc.Node)
    startPlayerP: cc.Node = null;
    // @property(cc.Node)
    // Pre_shizhang_1bg: cc.Node = null;
    // @property(cc.Node)
    // xiaohaiweizhi: cc.Node = null;
    // @property(cc.Node)
    // shuiweizhi: cc.Node = null;
    // @property(cc.Node)
    // luzhangweizhi: cc.Node = null;
    @property({
        displayName: "水泥地返回点",
        tooltip: "水泥地返回点",
        type: cc.Node
    })
    shuinidiP: cc.Node = null;

    @property({
        displayName: "車",
        tooltip: "車",
        type: cc.Node
    })
    bus: cc.Node = null;

    @property({
        displayName: "車點",
        tooltip: "車點",
        type: cc.Node
    })
    busP: cc.Node = null;
    @property({
        displayName: "車點2",
        tooltip: "車點2",
        type: cc.Node
    })
    busP2: cc.Node = null;


    @property({
        displayName: "上车门点",
        tooltip: "上车门点",
        type: cc.Node
    })
    buschemen: cc.Node = null;

    @property({
        displayName: "車門",
        tooltip: "車門",
        type: cc.Node
    })
    busshangP: cc.Node = null;


    @property({
        displayName: "車上點1",
        tooltip: "車上點1",
        type: cc.Node
    })
    bus1P: cc.Node = null;
    @property({
        displayName: "車上點2",
        tooltip: "車上點2",
        type: cc.Node
    })
    bus2P: cc.Node = null;
    @property({
        displayName: "車上點3",
        tooltip: "車上點3",
        type: cc.Node
    })
    bus3P: cc.Node = null;
    @property({
        displayName: "車上點4",
        tooltip: "車上點4",
        type: cc.Node
    })
    bus4P: cc.Node = null;


    @property({
        displayName: "辅助板",
        tooltip: "辅助板",
        type: cc.Node
    })
    fuzhuban: cc.Node = null;


    @property({
        displayName: "司机下车放板子点",
        tooltip: "司机下车放板子点",
        type: cc.Node
    })
    fangbanziP: cc.Node = null;

    @property({
        displayName: "司机",
        tooltip: "司机",
        type: cc.Node
    })
    siji: cc.Node = null;
    @property({
        displayName: "公交内",
        tooltip: "公交内",
        type: cc.Node
    })
    gongjiaonei: cc.Node = null;

    @property({
        displayName: "都关闭",
        tooltip: "都关闭",
        type: [cc.Node]
    })
    nodes: cc.Node[] = [];
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null

    data: any = {}

    onDestroy(): void {
        super.onDestroy()
    }

    removeEmitter() {
        Emitter.remove('onEnterShuinidiAfter', this.onEnterShuinidiAfter, this)
        Emitter.remove('onGetPre_shizhang_3Map', this.onGetPre_shizhang_3Map, this)
        Emitter.remove('onEntertishizhunbeibashiAfter', this.onEntertishizhunbeibashiAfter, this)
        Emitter.remove('onEnterBus', this.onEnterBus, this)
        Emitter.remove('onEnterbashizhanAfter', this.onEnterbashizhanAfter, this)
        Emitter.remove('onEnterzhuanyongcheweiAfter', this.onEnterzhuanyongcheweiAfter, this)
        Emitter.remove('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter, this)
        Emitter.remove('onEntershuinidirangluAfter', this.onEntershuinidirangluAfter, this)
        Emitter.remove('onEnterloutipaiduiAfter', this.onEnterloutipaiduiAfter, this)
    }

    registerEmitter() {
        Emitter.register('onEnterShuinidiAfter', this.onEnterShuinidiAfter, this)
        Emitter.register('onGetPre_shizhang_3Map', this.onGetPre_shizhang_3Map, this)
        Emitter.register('onEntertishizhunbeibashiAfter', this.onEntertishizhunbeibashiAfter, this)
        Emitter.register('onEnterBus', this.onEnterBus, this)
        Emitter.register('onEnterbashizhanAfter', this.onEnterbashizhanAfter, this)
        Emitter.register('onEnterzhuanyongcheweiAfter', this.onEnterzhuanyongcheweiAfter, this)
        Emitter.register('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter, this)
        Emitter.register('onEntershuinidirangluAfter', this.onEntershuinidirangluAfter, this)
        Emitter.register('onEnterloutipaiduiAfter', this.onEnterloutipaiduiAfter, this)
    }
    onEnterloutipaiduiAfter(selfName,self,type,onEndCallBack){
        let item = JsonManager.getTalkListItem(TalkListType.最终让路)
        Emitter.fire("onOpenTalk",item,(data)=>{
            Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,501)
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    async onLoad() {
        // this.removeEmitter()
        // this.registerEmitter()
        super.onLoad()

        //开始游戏的定位
        Emitter.fire("onGetCamera", this, (self, mainCamera) => {
            mainCamera.node.setPosition(self.startPlayerP.getPosition())

        })


        // ccLog.log("有没有啊小老弟",this.player)


    }
    async onEnterNPCMoveAfter(selfName,self,type,onEndCallBack,num){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)

        // Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.挨撞,false,0)
        // ccLog.log("播放挨撞")

        Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.挨撞,false,num,this.player,async()=>{
            if (onEndCallBack) {
                // await this.setTimerOnce(2)
                // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
                // Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.空,false,0)
                onEndCallBack(self,null)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })



        // this.player.scaleX = 1
        // let item = JsonManager.getTalkListItem(TalkListType.玩家碰到路障)
        // Emitter.fire("onOpenTalk",item,(data)=>{
        //     if (onEndCallBack) {
        //         this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        //         Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.空,false,0)
        //         onEndCallBack(self,data)
        //         // this.player.setPosition(this.xiepoweizhi.getPosition())
        //     }
        // })


    }
    init() {

        // Emitter.fire("onAddTrafficlights",{
        //     noRunTime : 10,
        //     noRunTipsTime : 4,
        //     goRun : 10,
        //     goRunTipsTime : 4,
        // })

    }

    // onEnterCheckPointEnd_1(){
    //     ccLog.log("第一关过关")
    //
    //     this.node.destroy()
    //     Emitter.fire("onGetGameActivity", this, async (self, node) => {
    //         // ccLog.log("第一关过关 换关",node)
    //       let Pre_shizhang_2 = await UtilsNode.getNode("Pre_shizhang_2",node.RootNode)
    //         Pre_shizhang_2.getComponent("Pre_shizhang_2").setData(node.data)
    //
    //
    //     })
    // }

    //得到第一个关卡
    onGetPre_shizhang_3Map(selfName, self, callback) {
        if (callback) {
            callback(self, this.node)
        }
    }

    async setData(data,otherData ?) {
        this.data = data
        Emitter.fire("onMusicSwitch",SoundType.第5_8關,0.2)
        ccLog.log("第二个页面过来的数据", data)
        Emitter.fire("onOpenGoTips")
        // Emitter.fire("onCountDownSuspend",true)
        Emitter.fire("onCountDownShow", {xuniTime : 600,shijiTime:200})
        // await this.setTimerOnce(0.1)
        // player
        let player = this.player = await UtilsNode.getNode("player", this.node)
        // ccLog.log("有没有啊小老弟",player)
        player.setPosition(this.startPlayerP.getPosition())
        // this.startPlayerP.setPosition()
        player.getComponent("controlPlayer").setData(this.data)

        await this.setTimerOnce(0.1)
        Emitter.fire("onEnterAuto", TalkListType.主角出了港鐵站)
        // Emitter.fire("onEnterBus")
    }

    start() {
        this.init()

    }

    onEntertishizhunbeibashiAfter(selfName, self, type, onEndCallBack) {
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        ccLog.log("有没有啊小老弟", type)
        let item = JsonManager.getTalkListItem(TalkListType.主角出了港鐵站)
        Emitter.fire("onOpenTalk", item, (data) => {
            if (onEndCallBack) {
                onEndCallBack(self, data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }


    onEnterShuinidiAfter(selfName, self, type, onEndCallBack) {
        Emitter.fire("onNPCSp",NPCType.水泥地,spActiconType.闲置,false,0)

        let item = JsonManager.getTalkListItem(TalkListType.主角踏進工地)
        Emitter.fire("onOpenTalk", item, (data) => {
            if (onEndCallBack) {
                this.player.setPosition(this.shuinidiP.getPosition())
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self, data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    onEnterbashizhanAfter(selfName, self, type, onEndCallBack) {
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        // this.player.setPosition(this.xiaohaiweizhi.getPosition())

        let item = JsonManager.getTalkListItem(TalkListType.主角到了巴士站)
        Emitter.fire("onOpenTalk", item, (data) => {
            if (onEndCallBack) {
                Emitter.fire("onNPCSp",NPCType.车站让路路人A,spActiconType.让路,false,0)
                // Emitter.fire("onNPCSp",NPCType.车站让路路人A,spActiconType.让路,false,1)
                Emitter.fire("onNPCSp",NPCType.车站让路路人B,spActiconType.让路,false,0)
                Gongrong.getInstance().addData({type : gongrongType.等车的人,num :gongrongType.等车的人共荣度 },(num)=>{
                    ccLog.log("等车的人",num,Gongrong.getInstance().getData())
                    Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                    Emitter.fire('onTipsShowzhixue')
                })
                // Emitter.fire("onNPCSp",NPCType.车站让路路人B,spActiconType.让路,false,1)
                onEndCallBack(self, data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    onEntershuinidirangluAfter(selfName, self, type, onEndCallBack) {
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        // this.player.setPosition(this.xiaohaiweizhi.getPosition())

        let item = JsonManager.getTalkListItem(TalkListType.水泥地让开)
        Emitter.fire("onOpenTalk", item, (data) => {
            if (onEndCallBack) {
                Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,500)
                Gongrong.getInstance().addData({type : gongrongType.水泥地让路,num :gongrongType.水泥地让路共荣度 },(num)=>{
                    ccLog.log("水泥地让路共荣度",num,Gongrong.getInstance().getData())
                    Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                    Emitter.fire('onTipsShowzhixue')
                })

                onEndCallBack(self, data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }


    onEnterzhuanyongcheweiAfter(selfName, self, type, onEndCallBack) {
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        // this.player.setPosition(this.xiaohaiweizhi.getPosition())

        // let item = JsonManager.getTalkListItem(TalkListType.主角到了巴士站)
        // Emitter.fire("onOpenTalk", item, (data) => {
        //     if (onEndCallBack) {
        //         onEndCallBack(self, data)
        //         // this.player.setPosition(this.xiepoweizhi.getPosition())
        //     }
        // })
        Emitter.fire("onShowMaskUI",false)
        Emitter.fire("onCloseGoTips")
        Emitter.fire("onActionTag",false)
        Emitter.fire("onCountDownSuspend",false)

        Emitter.fire("onEnterBus")
    }
    subclassCall(): any {
        return this
    }

    //車進來的動畫
    onEnterBus() {
        Emitter.fire("onCloseGoTips")
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {

            if (controlPlayer.data.type == playerType.shizhang) {
                UtilsAction.moveTo(this.bus, 2, this.busP.getPosition().x, this.busP.getPosition().y, async() => {
                    await this.setTimerOnce(1)
                    // this.fuzhuban.active = true
                    //
                    this.bus.opacity = 150
                    this.player.getComponent(PhysicsBoxCollider).enabled = false
                    // this.siji.opacity = 255
                    this.player.opacity = 150
                    this.siji.setPosition(this.fangbanziP.getPosition())
                    // Emitter.fire("onNPCSp",NPCType.司机下车放板子,spActiconType.司机下车放板子,false,0)
                    // await this.setTimerOnce(5)
                    this.siji.getComponent("myZIndex").zIndex = 1
                    this.siji.getComponent("myZIndex").setZindex(1)
                    Emitter.fire("onShowMaskUI",false)
                    Emitter.fire("onSp", playerSpType.shizhang_move)
                    UtilsAction.moveTo(this.player, 2, this.buschemen.getPosition().x, this.buschemen.getPosition().y, async () => {
                        // UtilsAction.moveTo(this.player, 2, this.busP.getPosition().x, this.busP.getPosition().y + 20, async () => {
                        await this.setTimerOnce(3)
                        this.player.destroy()
                        this.bus.opacity = 255
                        await this.setTimerOnce(1)
                        // UtilsAction.moveTo(this.bus, 2, this.busP2.getPosition().x, this.busP2.getPosition().y, async() => {
                        //     this.onEnterCheckPointEnd("", MapName.饭店)
                        // })
                        this.onEnterCheckPointEnd("", MapName.饭店)



                        // })
                    })



                    // this.player.setPosition(  this.busshangP.getPosition())
                    // UtilsAction.moveTo(this.player,2,this.bus1P.getPosition().x,this.bus1P.getPosition().y,()=>{
                    //     UtilsAction.moveTo(this.player,2,this.bus2P.getPosition().x,this.bus2P.getPosition().y,()=>{
                    //         UtilsAction.moveTo(this.player,2,this.bus3P.getPosition().x,this.bus3P.getPosition().y,()=>{
                    //             UtilsAction.moveTo(this.player,2,this.bus4P.getPosition().x,this.bus4P.getPosition().y,async()=>{
                    //                 Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
                    //                 await this.setTimerOnce(2)
                    //                 this.player.destroy()
                    //                 this.onEnterCheckPointEnd("",MapName.饭店)
                    //             })
                    //         })
                    //     })
                    // })
                })
            } else if (controlPlayer.data.type == playerType.canzhang) {
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onCloseGoTipsActivit")
                Emitter.fire("onPlaySound",SoundType.SJ_game_17_公交车行走停车声音)
                UtilsAction.moveToByEaseElasticInOut(this.bus, 4, this.busP.getPosition().x, this.busP.getPosition().y, async() => {

                    await this.setTimerOnce(1)
                    // this.fuzhuban.active = true
                    //

                    this.bus.opacity = 150
                    this.player.getComponent(PhysicsBoxCollider).enabled = false
                    this.siji.opacity = 255
                    this.siji.setPosition(this.fangbanziP.getPosition())
                    Emitter.fire("onNPCSp",NPCType.司机下车放板子,spActiconType.司机下车放板子,false,0)
                    Emitter.fire("onPlaySound",SoundType.SJ_game_17_机械板子伸出音效)
                    await this.setTimerOnce(5)
                    this.siji.getComponent("myZIndex").zIndex = 1
                    this.siji.getComponent("myZIndex").setZindex(1)
                    Emitter.fire("onSp", playerSpType.shizhang_move)
                    UtilsAction.moveTo(this.player, 2, this.buschemen.getPosition().x, this.buschemen.getPosition().y, async () => {
                        // UtilsAction.moveTo(this.player, 2, this.busP.getPosition().x, this.busP.getPosition().y + 20, async () => {
                        await this.setTimerOnce(7)
                        Emitter.fire("onTransitions",true,async()=>{
                            Emitter.fire("onMusicSwitch",SoundType.小動畫專用,0.2)
                            for (let i = 0; i < this.nodes.length; i++) {
                                this.nodes[i].active = false
                            }
                            this.gongjiaonei.active = true
                            this.player.setPosition(this.gongjiaonei.getPosition())
                            await this.setTimerOnce(0.1)
                            this.player.active = false
                            Emitter.fire("onInitSPStop",NPCType.公交车路人A,spActiconType.司机车上固定,false)
                            Emitter.fire("onInitSPStop",NPCType.公交车路人B,spActiconType.司机车上固定,false)
                            // Emitter.fire("onPlaySound",SoundType.SJ_game_19_行李箱拉动声)

                            Emitter.fire("onTransitions",false,async()=>{
                                Emitter.fire("onCloseGoTips")
                                let item = JsonManager.getTalkListItem(TalkListType.上车绑定)
                                Emitter.fire("onOpenTalk",item,async(data)=>{
                                    Gongrong.getInstance().addData({type : gongrongType.上车绑定,num :gongrongType.上车绑定荣度 },(num)=>{
                                        ccLog.log("上车绑定共荣度",num,Gongrong.getInstance().getData())
                                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                                        Emitter.fire('onTipsShowzhixue')
                                        Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                                    })
                                    await this.setTimerOnce(1)
                                    Emitter.fire("onNPCSp",NPCType.车上轮椅人,spActiconType.司机车上固定,false,0)
                                    Emitter.fire("onNPCSp",NPCType.司机下车放板子,spActiconType.司机车上固定,false,0)
                                    await this.setTimerOnce(0.1)
                                    Emitter.fire("onNPCSp",NPCType.公交车路人A,spActiconType.司机车上固定,false,0)
                                    Emitter.fire("onPlaySound",SoundType.SJ_game_19_行李箱拉动声)
                                    await this.setTimerOnce(0.5)
                                    Emitter.fire("onNPCSp",NPCType.公交车路人B,spActiconType.司机车上固定,false,0)
                                    Emitter.fire("onPlaySound",SoundType.SJ_game_19_行李箱拉动声)
                                    Emitter.fire("onPlaySound",SoundType.SJ_game_19_卡扣声)

                                    await this.setTimerOnce(3)

                                    await this.setTimerOnce(3)
                                    this.player.destroy()
                                    this.bus.opacity = 255
                                    this.fuzhuban.active = false
                                    // UtilsAction.moveTo(this.bus, 2, this.busP2.getPosition().x, this.busP2.getPosition().y, async() => {
                                    //
                                    // })
                                    await this.setTimerOnce(1)
                                    this.onEnterCheckPointEnd("", MapName.饭店)
                                })



                            })

                        })

                        // })
                    })



                    // this.player.setPosition(  this.busshangP.getPosition())
                    // UtilsAction.moveTo(this.player,2,this.bus1P.getPosition().x,this.bus1P.getPosition().y,()=>{
                    //     UtilsAction.moveTo(this.player,2,this.bus2P.getPosition().x,this.bus2P.getPosition().y,()=>{
                    //         UtilsAction.moveTo(this.player,2,this.bus3P.getPosition().x,this.bus3P.getPosition().y,()=>{
                    //             UtilsAction.moveTo(this.player,2,this.bus4P.getPosition().x,this.bus4P.getPosition().y,async()=>{
                    //                 Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
                    //                 await this.setTimerOnce(2)
                    //                 this.player.destroy()
                    //                 this.onEnterCheckPointEnd("",MapName.饭店)
                    //             })
                    //         })
                    //     })
                    // })
                })
            }

        })


    }


    // onEnterxiaohaiAfter(selfName){
    //     UtilsAction.moveTo(this.player,1,this.xiaohaiweizhi.getPosition().x,this.xiaohaiweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.xiaohaiweizhi.getPosition())
    // }
    // onEntershuiAfter(selfName){
    //     UtilsAction.moveTo(this.player,1,this.shuiweizhi.getPosition().x,this.shuiweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.shuiweizhi.getPosition())
    // }
    // onEnterluzhangAfter(selfName){
    //     UtilsAction.moveTo(this.player,1,this.luzhangweizhi.getPosition().x,this.luzhangweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.luzhangweizhi.getPosition())
    // }
    // update (dt) {}
}

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
    checkOutType,
    chengfaPOPType,
    Collisiontype, ElevatorType, MapName, NPCType,
    playerSpType,
    playerType, spActiconType,
    TalkListType, tipsText, ZindexType
} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import JsonManager from "../manage/JsonManager";
import BaseCheckPoint from "../base/BaseCheckPoint";
import LoadManage from "../System/Load/LoadManage";
import Gongrong, {gongrongType} from "../item/gongrong";
import Utils from "../System/Utils/Utils";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_2 extends BaseCheckPoint {

    @property(cc.Node)
    startPlayerP: cc.Node = null;
    @property(cc.Node)
    Pre_shizhang_1bg: cc.Node = null;
    @property(cc.Node)
    xiaohaiweizhi: cc.Node = null;
    @property(cc.Node)
    shuiweizhi: cc.Node = null;
    @property(cc.Node)
    luzhangweizhi: cc.Node = null;

    @property({
        displayName :"洗手间触发点",
        tooltip: "洗手间触发点",
        type : cc.Node
    })
    xishoujianP: cc.Node = null;
    @property({
        displayName :"洗手间出来点",
        tooltip: "洗手间出来点",
        type : cc.Node
    })
    xishoujianEndP: cc.Node = null;

    @property({
        displayName :"电梯进入点",
        tooltip: "电梯进入点",
        type : cc.Node
    })
    diantiP: cc.Node = null;

    @property({
        displayName :"电梯结束点",
        tooltip: "电梯结束点",
        type : cc.Node
    })
    diantiEndP: cc.Node = null;
    @property({
        displayName :"小孩子",
        tooltip: "小孩子",
        type : cc.Node
    })
    xiaohaizi: cc.Node = null;

    @property({
        displayName :"盲人结束点",
        tooltip: "盲人结束点",
        type : cc.Node
    })
    mangrendian: cc.Node = null;


    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null
    @property({
        displayName :"小孩子结束点",
        tooltip: "小孩子结束点",
        type : cc.Node
    })
    xiaohaizijieshudian: cc.Node = null;

    xishoujianTag : boolean = false

    data : any = {}
     onDestroy(): void {
        super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onEnterxiaohaiAfter', this.onEnterxiaohaiAfter,this)
        Emitter.remove('onEntershuiAfter', this.onEntershuiAfter,this)
        Emitter.remove('onEnterluzhangAfter', this.onEnterluzhangAfter,this)
        Emitter.remove('onEntertishishangchangAfter', this.onEntertishishangchangAfter,this)
        Emitter.remove('onEntertishixishoujianAfter', this.onEntertishixishoujianAfter,this)
        Emitter.remove('onEntershuitanAfter', this.onEntershuitanAfter,this)
        Emitter.remove('onEntershangchangloutiAfter', this.onEntershangchangloutiAfter,this)
        Emitter.remove('onEnterXishoujian', this.onEnterXishoujian,this)
        Emitter.remove('onEnterCheckPointEnd_2Before', this.onEnterCheckPointEnd_2Before,this)
        Emitter.remove('onTakeThe2Elevator', this.onTakeThe2Elevator,this)
        Emitter.remove('onGetPre_shizhang_2', this.onGetPre_shizhang_2,this)
        Emitter.remove('onEnterweishengjianEndAfter', this.onEnterweishengjianEndAfter,this)
        Emitter.remove('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.remove('onEnterrangkaiAfter', this.onEnterrangkaiAfter,this)
        Emitter.remove('onEnterqingjieAfter', this.onEnterqingjieAfter,this)
    }
    registerEmitter(){
        Emitter.register('onEnterxiaohaiAfter', this.onEnterxiaohaiAfter,this)
        Emitter.register('onEntershuiAfter', this.onEntershuiAfter,this)
        Emitter.register('onEnterluzhangAfter', this.onEnterluzhangAfter,this)
        Emitter.register('onEntertishishangchangAfter', this.onEntertishishangchangAfter,this)
        Emitter.register('onEntertishixishoujianAfter', this.onEntertishixishoujianAfter,this)
        Emitter.register('onEntershuitanAfter', this.onEntershuitanAfter,this)
        Emitter.register('onEntershangchangloutiAfter', this.onEntershangchangloutiAfter,this)
        Emitter.register('onEnterXishoujian', this.onEnterXishoujian,this)
        Emitter.register('onEnterCheckPointEnd_2Before', this.onEnterCheckPointEnd_2Before,this)
        Emitter.register('onTakeThe2Elevator', this.onTakeThe2Elevator,this)
        Emitter.register('onGetPre_shizhang_2', this.onGetPre_shizhang_2,this)
        Emitter.register('onEnterweishengjianEndAfter', this.onEnterweishengjianEndAfter,this)
        Emitter.register('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.register('onEnterrangkaiAfter', this.onEnterrangkaiAfter,this)
        Emitter.register('onEnterqingjieAfter', this.onEnterqingjieAfter,this)
    }
    async onLoad () {
        super.onLoad()
        //开始游戏的定位
        Emitter.fire("onGetCamera",this,(self,mainCamera)=>{
          mainCamera.node.setPosition(self.startPlayerP.getPosition())

        })


        // ccLog.log("有没有啊小老弟",this.player)


    }
    init(){

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
    onGetPre_shizhang_2Map(selfName,self,callback){
            if (callback) {
                callback(self,this.node)
            }
    }
    onEnterrangkaiAfter(selfName, self, type, onEndCallBack) {
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        // this.player.setPosition(this.xiaohaiweizhi.getPosition())

        // let item = JsonManager.getTalkListItem(TalkListType.水泥地让开)
        // Emitter.fire("onOpenTalk", item, (data) => {
        //     if (onEndCallBack) {
        //         Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,500)
        //         Gongrong.getInstance().addData({type : gongrongType.水泥地让路,num :gongrongType.水泥地让路共荣度 },(num)=>{
        //             ccLog.log("水泥地让路共荣度",num,Gongrong.getInstance().getData())
        //             Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
        //         })
        //
        //         onEndCallBack(self, data)
        //         // this.player.setPosition(this.xiepoweizhi.getPosition())
        //     }
        // })

        let item1 = JsonManager.getTalkListItem(TalkListType.商场坐电梯下楼NPC让路)
        Emitter.fire("onOpenTalk",item1,async(data)=>{
            Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,100)
            Gongrong.getInstance().addData({type : gongrongType.地铁车上让开,num :gongrongType.地铁车上让开共荣度 },(num)=>{
                ccLog.log("地铁车上让开共荣度",num,Gongrong.getInstance().getData())
                Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                Emitter.fire('onTipsShowzhixue')
            })
            if (onEndCallBack) {
                onEndCallBack(self, data)
            }
            // await self.setTimerOnce(2)
            // ccLog.log("现在点了电梯控制器")
            // Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
            // //坐电梯第一关
            // Emitter.fire("onTakeThe2Elevator")
        })


    }


    onEnterqingjieAfter(selfName, self, type, onEndCallBack) {
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        // this.player.setPosition(this.xiaohaiweizhi.getPosition())

        // let item = JsonManager.getTalkListItem(TalkListType.水泥地让开)
        // Emitter.fire("onOpenTalk", item, (data) => {
        //     if (onEndCallBack) {
        //         Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,500)
        //         Gongrong.getInstance().addData({type : gongrongType.水泥地让路,num :gongrongType.水泥地让路共荣度 },(num)=>{
        //             ccLog.log("水泥地让路共荣度",num,Gongrong.getInstance().getData())
        //             Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
        //         })
        //
        //         onEndCallBack(self, data)
        //         // this.player.setPosition(this.xiepoweizhi.getPosition())
        //     }
        // })
        Emitter.fire("onNPCSp",NPCType.清洁工,spActiconType.说话,true,100)
        let item1 = JsonManager.getTalkListItem(TalkListType.清洁工提示)
        Emitter.fire("onOpenTalk",item1,async(data)=>{
            Emitter.fire("onNPCSp",NPCType.清洁工,spActiconType.闲置,true,100)
            // Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,100)
            // Gongrong.getInstance().addData({type : gongrongType.地铁车上让开,num :gongrongType.地铁车上让开共荣度 },(num)=>{
            //     ccLog.log("地铁车上让开共荣度",num,Gongrong.getInstance().getData())
            //     Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
            // })
            if (onEndCallBack) {
                onEndCallBack(self, data)
            }
            // await self.setTimerOnce(2)
            // ccLog.log("现在点了电梯控制器")
            // Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
            // //坐电梯第一关
            // Emitter.fire("onTakeThe2Elevator")
        })


    }



    async setData(data,otherData ?){
        this.data = data
        Emitter.fire("onMusicSwitch",SoundType.第1_4關,0.2)
        ccLog.log("第二个页面过来的数据",data)
        Emitter.fire("onOpenGoTips")
        // Emitter.fire("onCountDownSuspend",true)
        Emitter.fire("onCountDownShow",{xuniTime : 600,shijiTime:200})
        // await this.setTimerOnce(0.1)
        // player
        let player = this.player = await UtilsNode.getNode("player",this.node)
        // ccLog.log("有没有啊小老弟",player)
        player.setPosition( this.startPlayerP.getPosition())
        // this.startPlayerP.setPosition()
        player.getComponent("controlPlayer").setData(this.data)
        // player.zIndex = 99

        // await this.setTimerOnce(0.1)
        await Utils.setTimerOnce(this,0.2)

        Emitter.fire("onActionTag", false)

        Emitter.fire("onGetControlGameStart",this,async(self,controlGameStart)=>{
            Emitter.fire("onSp", playerSpType.shizhang_move)
            await controlGameStart.move(1.5,player,()=>{
                Emitter.fire("onActionTag", true)
                Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                // Emitter.fire("onEnterAuto",TalkListType.玩家出门)
                Emitter.fire("onEnterAuto",TalkListType.主角到了商場)
            })
        })






        // await this.setTimerOnce(3)
        // Emitter.fire('onTipsShowEndGame', {txt: tipsText.shunlidaoda})

    }

    start () {
        this.init()

    }
    async onEnterNPCMoveAfter(selfName,self,type,onEndCallBack,num) {
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)

        // Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.挨撞,false,0)
        // ccLog.log("播放挨撞")

        Emitter.fire("onNPCSpMove", NPCType.移动的NPC, spActiconType.挨撞, false, num, this.player, async () => {
            if (onEndCallBack) {
                // await this.setTimerOnce(2)
                // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
                // Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.空,false,0)
                onEndCallBack(self, null)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

        // onEnterxiaohaiAfter(selfName){
    //     UtilsAction.moveTo(this.player,1,this.xiaohaiweizhi.getPosition().x,this.xiaohaiweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.xiaohaiweizhi.getPosition())
    // }
    onEntershuiAfter(selfName){
        UtilsAction.moveTo(this.player,1,this.shuiweizhi.getPosition().x,this.shuiweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shuiweizhi.getPosition())
    }
    onEnterluzhangAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.luzhangweizhi.getPosition().x,this.luzhangweizhi.getPosition().y,null)
        // this.player.setPosition(  this.luzhangweizhi.getPosition())

        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            let item
            if (controlPlayer.data.type == playerType.shizhang) {

                if (self.xishoujianTag == true) {

                    // controlPlayer1 = controlPlayer
                    Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                    UtilsAction.fadeOut(self.player,1,async()=>{
                        await self.setTimerOnce(1)
                        self.player.destroy()

                        self.onEnterCheckPointEnd("",MapName.站台,{checkOut : checkOutType.扶手电梯楼梯下楼})
                    })
                }else{
                    let item = JsonManager.getTalkListItem(TalkListType.要先去厕所)
                    Emitter.fire("onOpenTalk",item,async(data)=>{
                        Emitter.fire("onActionTag",true)
                        Emitter.fire("onCountDownSuspend", true)
                        Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                    })
                }




                // UtilsAction.moveTo(self.player,1,self.mangrendian.x,self.mangrendian.y,()=>{
                //
                // })

            } else if (controlPlayer.data.type == playerType.canzhang) {
                item = JsonManager.getTalkListItem(TalkListType.玩家在扶手電梯下去)
                Emitter.fire("onOpenTalk",item,(data)=>{

                    if (onEndCallBack) {
                        this.player.setPosition(this.luzhangweizhi.getPosition())
                        Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                        onEndCallBack(self,data)
                        // this.player.setPosition(this.xiepoweizhi.getPosition())
                    }
                })
            }



        })





    }
    //進入商場的時候調用的
    onEntertishishangchangAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.主角到了商場)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    //去洗手間
    onEntertishixishoujianAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        let item = JsonManager.getTalkListItem(TalkListType.想去洗手間)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEntershuitanAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        Emitter.fire("onNPCSp",NPCType.水桶,spActiconType.挨撞,false,0)
        let item = JsonManager.getTalkListItem(TalkListType.玩家碰到水灘)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                this.player.setPosition(this.shuiweizhi.getPosition())
                Emitter.fire("onNPCSp",NPCType.水桶,spActiconType.空,false,0)
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEnterxiaohaiAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        // this.player.setPosition(this.xiaohaiweizhi.getPosition())
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            let item
            if (controlPlayer.data.type == playerType.shizhang) {
                // controlPlayer1 = controlPlayer
                item = JsonManager.getTalkListItem(TalkListType.盲人碰小朋友)
            } else if (controlPlayer.data.type == playerType.canzhang) {
                item = JsonManager.getTalkListItem(TalkListType.玩家遇到在玩的小朋友)
            }
            Emitter.fire("onOpenTalk",item,(data)=>{
                if (onEndCallBack) {
                    onEndCallBack(self,data)
                    self.xiaohaizi.active = false
                    // self.xiaohaizi.setPosition(self.xiaohaizijieshudian.getPosition())
                    Emitter.fire("onEnterChild")
                    Gongrong.getInstance().addData({type : gongrongType.第三关小孩,num :gongrongType.第三关小孩共荣度 },(num)=>{
                        ccLog.log("第一次增加第三关小孩共荣度",num,Gongrong.getInstance().getData())
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                        Emitter.fire('onTipsShowzhixue')
                    })

                    // this.player.setPosition(this.xiepoweizhi.getPosition())
                }
            })
        })


    }
    onEntershangchangloutiAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        this.player.setPosition(this.luzhangweizhi.getPosition())
        let item = JsonManager.getTalkListItem(TalkListType.玩家在商場樓梯下去)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    onGetPre_shizhang_2(selfName, self, callback) {
        if (callback) {
            // ccLog.log("几次",self)
            callback(self, this)
        }
    }

    onEnterweishengjianEndAfter(selfName,self,type,onEndCallBack){
        let item = JsonManager.getTalkListItem(TalkListType.衛生間已經到了)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.闲置,true,0)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    //去洗手间的动画播放
    async onEnterXishoujian(){
            UtilsAction.moveTo(this.player,1,this.xishoujianP.x,this.xishoujianP.y,()=>{
                UtilsAction.fadeOut(this.player,1,async()=>{
                        // await this.setTimerOnce(1)

                    this.Transitions(3,()=>{
                        Emitter.fire("onPlaySound",SoundType.SJ_game_23_馬桶音效)
                        UtilsAction.fadeIn(this.player,1,async()=>{
                            //出来
                            UtilsAction.moveTo(this.player,1,this.xishoujianEndP.x,this.xishoujianEndP.y,()=>{
                                let item = JsonManager.getTalkListItem(TalkListType.提示要去月台)
                                Emitter.fire("onOpenTalk",item,(data)=>{
                                    Emitter.fire("onActionTag",true)
                                    Emitter.fire("onCountDownSuspend", true)
                                    Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                                    //去过洗手间了
                                    this.xishoujianTag = true

                                    Gongrong.getInstance().addData({type : gongrongType.第三关去洗手间,num :gongrongType.第三关去洗手间共荣度 },(num)=>{
                                        ccLog.log("第一次增加第三关去洗手间共荣度",num,Gongrong.getInstance().getData())
                                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                                        Emitter.fire('onTipsShowzhixue')
                                        Emitter.fire('onFollowStaffAnimStart')
                                    })
                                })
                            })
                        })
                    })





                })
            })
    }
    async onEnterCheckPointEnd_2Before(){
        // this.mainCamera.node.active = true
        // UtilsAction.moveBy(this.mainCamera.node,10,2500,0,()=>{
        //     this.onEnterCheckPointEnd_1()
        // })
        Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
        await this.setTimerOnce(2)
        this.player.destroy()
        this.onEnterCheckPointEnd("",MapName.站台)
    }
    //移动到门口动画表现
    onTakeThe2Elevator(){

        Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
        Emitter.fire('onTipsShowzhixue')

        Emitter.fire("onElevatorOpen",ElevatorType.商场下楼电梯)
        Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
        UtilsAction.moveTo(this.player,1,this.diantiP.x,this.diantiP.y,()=>{
            Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,101)
            UtilsAction.moveTo(this.player,1,this.diantiEndP.x,this.diantiEndP.y,()=>{
                Emitter.fire("onNPCfadeOut",101)

                UtilsAction.fadeOut(this.player,1,()=>{
                    Emitter.fire("onPlaySound",SoundType.SJ_game_04_UI电梯到叮的声音)
                    Emitter.fire("onElevatorClose",ElevatorType.商场下楼电梯)
                    Emitter.fire("onPlaySound",SoundType.SJ_game_14_商场电梯声音)

                    ccLog.log("过关")
                    this.player.destroy()
                    this.onEnterCheckPointEnd("",MapName.站台)
                })
            })
        })


        // let item = JsonManager.getTalkListItem(TalkListType.太好了)
        // Emitter.fire("onOpenTalk",item,(data)=>{
        //
        //
        // })


        // this.player.setPosition(this.zhuangcheweizhi.getPosition())
    }

    subclassCall(): any {
        return this
    }
    // update (dt) {}
}


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
import JsonManager from "../manage/JsonManager";
import BaseCheckPoint from "../base/BaseCheckPoint";
import Gongrong, {gongrongType} from "../item/gongrong";
import Utils from "../System/Utils/Utils";
import {SoundType, SoundTypeIndex} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_1 extends BaseCheckPoint {

    @property(cc.Node)
    startPlayerP: cc.Node = null;
    @property(cc.Node)
    Pre_shizhang_1bg: cc.Node = null;
    @property(cc.Node)
    zhuzi: cc.Node = null;

    @property(cc.Node)
    zhuangcheweizhi: cc.Node = null;
    @property(cc.Node)
    xiepoweizhi: cc.Node = null;
    @property(cc.Node)
    shigonglajitongweizhi: cc.Node = null;
    @property(cc.Node)
    lajitongweizhi: cc.Node = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null


    @property(cc.Node)
    cheAn1: cc.Node = null;

    @property(cc.Node)
    cheAn2: cc.Node = null;

    data : any = {}

    EnterCheckPointEnd_1 : boolean = false
     onDestroy(): void {
        super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onGetPre_shizhang_1Map', this.onGetPre_shizhang_1Map,this)
        Emitter.remove('onEnterCheckPointEnd_1', this.onEnterCheckPointEnd_1,this)
        Emitter.remove('onEnterCheckPointEnd_1Before', this.onEnterCheckPointEnd_1Before,this)
        Emitter.remove('onEnterCarAfter', this.onEnterCarAfter,this)
        Emitter.remove('onEnterXiepoAfter', this.onEnterXiepoAfter,this)
        Emitter.remove('onEnterlajitongAfter', this.onEnterlajitongAfter,this)
        Emitter.remove('onEntershigongAfter', this.onEntershigongAfter,this)
        Emitter.remove('onEnterLoutiAfter', this.onEnterLoutiAfter,this)
        Emitter.remove('onEnterzhengquexiepoAfter', this.onEnterzhengquexiepoAfter,this)
        Emitter.remove('onEntertishihonglvAfter', this.onEntertishihonglvAfter,this)
        Emitter.remove('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
    }
    registerEmitter(){
        Emitter.register('onGetPre_shizhang_1Map', this.onGetPre_shizhang_1Map,this)
        Emitter.register('onEnterCheckPointEnd_1', this.onEnterCheckPointEnd_1,this)
        Emitter.register('onEnterCheckPointEnd_1Before', this.onEnterCheckPointEnd_1Before,this)
        Emitter.register('onEnterCarAfter', this.onEnterCarAfter,this)
        Emitter.register('onEnterXiepoAfter', this.onEnterXiepoAfter,this)
        Emitter.register('onEnterlajitongAfter', this.onEnterlajitongAfter,this)
        Emitter.register('onEntershigongAfter', this.onEntershigongAfter,this)
        Emitter.register('onEnterLoutiAfter', this.onEnterLoutiAfter,this)
        Emitter.register('onEnterzhengquexiepoAfter', this.onEnterzhengquexiepoAfter,this)
        Emitter.register('onEntertishihonglvAfter', this.onEntertishihonglvAfter,this)
        Emitter.register('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)

    }
    async onLoad () {
        super.onLoad()
        // player

        //开始游戏的定位
        Emitter.fire("onGetCamera",this,(self,mainCamera)=>{
          mainCamera.node.setPosition(self.startPlayerP.getPosition())

        })

           this.zhuzi.zIndex = 101
        // ccLog.log("有没有啊小老弟",this.player)

        // Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,100)

    }
    init(){

        Emitter.fire("onAddTrafficlights",{
            noRunTime : 15,
            noRunTipsTime : 4,
            goRun : 15,
            goRunTipsTime : 4,
        })




    }
    async onEnterCheckPointEnd_1Before(){
        // this.mainCamera.node.active = true
        // UtilsAction.moveBy(this.mainCamera.node,10,2500,0,()=>{
        //     this.onEnterCheckPointEnd_1()
        // })
        // Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
        UtilsAction.fadeOut(this.player,2,()=>{

            // Emitter.fire("onElevatorClose",ElevatorType.家门口电梯)
            ccLog.log("过关")
            this.player.destroy()
            this.onEnterCheckPointEnd("",MapName.商場)
        })
        // await this.setTimerOnce(2)
        // this.player.destroy()
        // this.onEnterCheckPointEnd("",MapName.商場)
    }


    onEnterCheckPointEnd_1(){


        // if (this.EnterCheckPointEnd_1 == false) {
        //     this.EnterCheckPointEnd_1 = true
        //
        // }
        ccLog.log("第一关过关")
        this.node.destroy()
        Emitter.fire("onGetGameActivity", this,  async(self, node) => {
            // ccLog.log("第一关过关 换关",node)
            // this.scheduleOnce(async()=>{
            //
            // },0)
            let Pre_shizhang_2 = await UtilsNode.getNode("Pre_shizhang_2",node.RootNode)
            // node.data.type =2
            Pre_shizhang_2.getComponent("Pre_shizhang_2").setData(node.data)
            Emitter.fire("onShowMaskUI",true)

        })

    }

    //得到第一个关卡
    onGetPre_shizhang_1Map(selfName,self,callback){
            if (callback) {
                callback(self,this.node)
            }
    }

    async setData(data,otherData ?){
        Emitter.fire("onMusicSwitch",SoundType.第1_4關,0.2)
        this.data = data
        // this.data.type =2
        ccLog.log("第一个页面过来的数据",data)
        Emitter.fire("onCountDownShow",{xuniTime : 600,shijiTime:200})
        // await this.setTimerOnce(0.1)
        let player = this.player = await UtilsNode.getNode("player",this.node)
        // ccLog.log("有没有啊小老弟",player)
        player.setPosition( this.startPlayerP.getPosition())


        // this.startPlayerP.setPosition()
        player.getComponent("controlPlayer").setData(this.data)
        // player.zIndex = 5


        await Utils.setTimerOnce(this,0.2)

        Emitter.fire("onActionTag", false)

        Emitter.fire("onGetControlGameStart",this,async(self,controlGameStart)=>{
            Emitter.fire("onSp", playerSpType.shizhang_move)
            await controlGameStart.move(1.5,player,()=>{
                Emitter.fire("onActionTag", true)
                Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                // Emitter.fire("onEnterAuto",TalkListType.玩家出门)

            })
        })


    }

    //被车撞了之后
    onEnterCarAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.zhuangcheweizhi.getPosition().x,this.zhuangcheweizhi.getPosition().y,null)
        // this.player.setPosition(  this.zhuangcheweizhi.getPosition())
        this.player.setPosition(this.zhuangcheweizhi.getPosition())
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.玩家被车撞)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.zhuangcheweizhi.getPosition())
            }
        })
    }
    //斜坡
    onEnterXiepoAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.xiepoweizhi.getPosition().x,this.xiepoweizhi.getPosition().y,null)


        // this.player.setPosition(this.xiepoweizhi.getPosition())

        // this.player.setPosition(  this.xiepoweizhi.getPosition())

        // this.player.scaleX = 1
        // controlPlayer.data.type == playerType.canzhang
        // if (type == playerType.canzhang){
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            let type
            if (controlPlayer.data.type == playerType.shizhang) {
                type = TalkListType.玩家在石堆下去盲人
            } else if (controlPlayer.data.type == playerType.canzhang) {
                type = TalkListType.玩家在石堆下去
            }

            let item = JsonManager.getTalkListItem(type)
            Emitter.fire("onOpenTalk",item,(data)=>{
                if (onEndCallBack) {
                    self.player.setPosition(self.xiepoweizhi.getPosition())
                    onEndCallBack(self,data)
                    Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                    // this.player.setPosition(this.xiepoweizhi.getPosition())
                }
            })

        })
        // TalkListType.玩家在石堆下去盲人


        // }

    }
    //樓梯
    onEnterLoutiAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.xiepoweizhi.getPosition().x,this.xiepoweizhi.getPosition().y,null)


        // this.player.setPosition(this.xiepoweizhi.getPosition())

        // this.player.setPosition(  this.xiepoweizhi.getPosition())

        // this.player.scaleX = 1
        // controlPlayer.data.type == playerType.canzhang
        // if (type == playerType.canzhang){
        let item = JsonManager.getTalkListItem(TalkListType.玩家在樓梯下去)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                this.player.setPosition(this.xiepoweizhi.getPosition())
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
        // }

    }
    //
    onEnterlajitongAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.lajitongweizhi.getPosition().x,this.lajitongweizhi.getPosition().y,null)
        Emitter.fire("onNPCSp",NPCType.垃圾桶,spActiconType.挨撞,false,0)

        let item = JsonManager.getTalkListItem(TalkListType.玩家碰到垃圾桶)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                this.player.setPosition(  this.lajitongweizhi.getPosition())
                Emitter.fire("onNPCSp",NPCType.垃圾桶,spActiconType.空,false,0)
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEntershigongAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)

        Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.挨撞,false,0)
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.玩家碰到路障)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
                Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.空,false,0)
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
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
    onEnterzhengquexiepoAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.正確的斜坡下去)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                Emitter.fire('onTipsShowzhixue')
                Emitter.fire("onPlaySound",SoundType.SJ_game_07_UI成功加分音效)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    async onEntertishihonglvAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        Emitter.fire("onSetonShowRedLight")
        let item = JsonManager.getTalkListItem(TalkListType.玩家在紅綠燈前)
        Emitter.fire("onOpenTalk",item,async(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                Emitter.fire("onSetShowGreenLight")
                Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,100)


                Emitter.fire("onShowMaskUI",false)
                // Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onCountDownSuspend",false)
                let data1 = {
                    self : this,
                    otherData : "红绿灯",
                    sound: SoundTypeIndex.SJ_game_08_绿灯音效,
                    volume : 1,
                    upTimeMax : 3
                }
                cc.log("揍我了吗",data1)
                Emitter.fire("onControlSoundPlay",data1)

                await Utils.setTimerOnce(this,1)
                Emitter.fire("onSp", playerSpType.shizhang_move)

              await  UtilsAction.moveTo(this.player,4,this.cheAn1.x,this.cheAn1.y,null)
                await  UtilsAction.moveTo(this.player,8,this.cheAn2.x,this.cheAn2.y,null)
                Emitter.fire("onShowMaskUI",false)
                Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                Emitter.fire('onTipsShowzhixue')
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onCountDownSuspend",false)
                UtilsAction.fadeOut(this.player,2,()=>{

                    // Emitter.fire("onElevatorClose",ElevatorType.家门口电梯)
                    ccLog.log("过关")
                    this.player.destroy()
                    this.onEnterCheckPointEnd("",MapName.商場)
                })

                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })


    }



    start () {
        //跳关
        // this.onEnterCheckPointEnd_1()
        // return
        this.init()
    }

    subclassCall(): any {
        return this
    }

    // update (dt) {}
}

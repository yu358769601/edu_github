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
import Gongrong, {gongrongType} from "../item/gongrong";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_7 extends BaseCheckPoint {

    @property(cc.Node)
    startPlayerP: cc.Node = null;
    @property(cc.Node)
    shigonglajitongweizhi: cc.Node = null;
    // @property(cc.Node)
    // xiaohaiweizhi: cc.Node = null;
    // @property(cc.Node)
    // shuiweizhi: cc.Node = null;
    // @property(cc.Node)
    // luzhangweizhi: cc.Node = null;
    @property(cc.Node)
    loutiP: cc.Node = null;

    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null
    @property({
        displayName :"小孩子",
        tooltip: "小孩子",
        type : cc.Node
    })
    xiaohaizi: cc.Node = null;
    data : any = {}
     onDestroy(): void {
        super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onGetPre_shizhang_7Map', this.onGetPre_shizhang_7Map,this)
        Emitter.remove('onEnterLouti6After', this.onEnterLouti6After,this)
        Emitter.remove('onEntertishi7chumenAfter', this.onEntertishi7chumenAfter,this)
        Emitter.remove('onEnterhuodongdidianAfter', this.onEnterhuodongdidianAfter,this)
        Emitter.remove('onEntertishi7huodongAfter', this.onEntertishi7huodongAfter,this)
        Emitter.remove('onEnter7jieshuAfter', this.onEnter7jieshuAfter,this)
        Emitter.remove('onEnterhuodongshigongAfter', this.onEnterhuodongshigongAfter,this)
        Emitter.remove('onEnterhuodongloutiAfter', this.onEnterhuodongloutiAfter,this)
        Emitter.remove('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.remove('onEnterloutipaiduiAfter', this.onEnterloutipaiduiAfter,this)
        Emitter.remove('onEnterxiaohaiAfter', this.onEnterxiaohaiAfter,this)
    }
    registerEmitter(){
        Emitter.register('onGetPre_shizhang_7Map', this.onGetPre_shizhang_7Map,this)
        Emitter.register('onEnterLouti6After', this.onEnterLouti6After,this)
        Emitter.register('onEntertishi7chumenAfter', this.onEntertishi7chumenAfter,this)
        Emitter.register('onEnterhuodongdidianAfter', this.onEnterhuodongdidianAfter,this)
        Emitter.register('onEntertishi7huodongAfter', this.onEntertishi7huodongAfter,this)
        Emitter.register('onEnter7jieshuAfter', this.onEnter7jieshuAfter,this)
        Emitter.register('onEnterhuodongshigongAfter', this.onEnterhuodongshigongAfter,this)
        Emitter.register('onEnterhuodongloutiAfter', this.onEnterhuodongloutiAfter,this)
        Emitter.register('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.register('onEnterloutipaiduiAfter', this.onEnterloutipaiduiAfter,this)
        Emitter.register('onEnterxiaohaiAfter', this.onEnterxiaohaiAfter,this)
    }
    async onLoad () {
        // this.removeEmitter()
        // this.registerEmitter()
        super.onLoad()

        //开始游戏的定位
        Emitter.fire("onGetCamera",this,(self,mainCamera)=>{
          mainCamera.node.setPosition(self.startPlayerP.getPosition())

        })

        // Emitter.fire('onTipsShowEndGame', {typeItem :playerType.canzhang })
        // ccLog.log("有没有啊小老弟",this.player)


    }
    async onEnterhuodongdidianAfter(selfName,self,type,onEndCallBack){
        // let item = JsonManager.getTalkListItem(TalkListType.主角經過斜坡上茶餐廳)
        // Emitter.fire("onOpenTalk",item,async(data)=>{
        //     // if (onEndCallBack) {
        //     //     onEndCallBack(self,data)
        //     //     // this.player.setPosition(this.xiepoweizhi.getPosition())
        //     // }
        //
        // })


        // this.onEnterCheckPointEnd("",MapName.活动现场)
        Emitter.fire("onEnterAuto",TalkListType.主角小心穿過公園到達目的地)



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
    onGetPre_shizhang_7Map(selfName,self,callback){
            if (callback) {
                callback(self,this.node)
            }
    }

    async setData(data,otherData ?){
        this.data = data
        Emitter.fire("onMusicSwitch",SoundType.第5_8關,0.2)
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
        ccLog.log("被調用了幾次啊 0",TalkListType.主角吃完飯)
        await this.setTimerOnce(0.2)
        Emitter.fire("onActionTag", false)

        Emitter.fire("onGetControlGameStart",this,async(self,controlGameStart)=>{
            Emitter.fire("onSp", playerSpType.shizhang_move)
            await controlGameStart.move(1.5,player,()=>{
                Emitter.fire("onActionTag", true)
                Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                Emitter.fire("onEnterAuto",TalkListType.主角吃完飯)

                // Emitter.fire("onEnterAuto",TalkListType.玩家出门)

            },()=>{
                Emitter.fire("onSp", playerSpType.shizhang_move)
            })
        })
        // Emitter.fire("onEnterAuto",TalkListType.主角吃完飯)
    }

    start () {
        this.init()

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



    onEnterhuodongshigongAfter(selfName,self,type,onEndCallBack,num){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        Emitter.fire("onNPCSp",NPCType.活动现场施工,spActiconType.挨撞,false,num)

        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.玩家碰到路障)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEnterhuodongloutiAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        ccLog.log("活動樓梯上去呢")

        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.玩家在樓梯下去)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    onEntertishi7chumenAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        Emitter.fire("onActionTag",false)
        Emitter.fire("onCountDownSuspend",false)
        // ccLog.log("有没有啊小老弟",type)
        let item = JsonManager.getTalkListItem(TalkListType.主角吃完飯)
        Emitter.fire("onOpenTalk",item,(data)=>{

            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEnterLouti6After(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        this.player.setPosition(  this.loutiP.getPosition())
        // this.player.scaleX = 1
        Emitter.fire("onActionTag",false)
        Emitter.fire("onCountDownSuspend",false)
        // ccLog.log("有没有啊小老弟",type)
        let item = JsonManager.getTalkListItem(TalkListType.主角下樓梯)
        Emitter.fire("onOpenTalk",item,(data)=>{

            if (onEndCallBack) {
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEntertishi7huodongAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        Emitter.fire("onActionTag",false)
        Emitter.fire("onCountDownSuspend",false)
        // ccLog.log("有没有啊小老弟",type)
        let item = JsonManager.getTalkListItem(TalkListType.主角吃完飯)
        Emitter.fire("onOpenTalk",item,(data)=>{

            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())

            }
        })
    }

    onEnter7jieshuAfter(selfName,self,type,onEndCallBack){
        Emitter.fire("onShowMaskUI",false)
        Emitter.fire("onActionTag",false)
        Emitter.fire("onCloseGoTips")
        Emitter.fire("onCountDownSuspend",false)
        // this.player.setPosition(  this.startPlayerP.getPosition())
        let item = JsonManager.getTalkListItem(TalkListType.主角小心穿過公園到達目的地)
        Emitter.fire("onOpenTalk",item,async(data)=>{
            // if (onEndCallBack) {
            //     onEndCallBack(self,data)
            //     // ccLog.log("主角上樓梯")
            //     // this.player.setPosition(this.xiepoweizhi.getPosition())
            //
            // }
            await this.setTimerOnce(2)
            Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
                if (controlPlayer.data.type == playerType.shizhang) {
                    Emitter.fire('onTipsShowEndGame', {typeItem :playerType.shizhang })
                }else if (controlPlayer.data.type == playerType.canzhang) {
                    Emitter.fire('onTipsShowEndGame', {typeItem :playerType.canzhang })
                }
            })
            Emitter.fire("onPlaySound",SoundType.SJ_game_22_胜利音效)
            Emitter.fire("onPlaySound",SoundType.SJ_game_22_闪闪发光)
            // Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})

        })
    }
    onEnterloutipaiduiAfter(selfName,self,type,onEndCallBack){
        let item = JsonManager.getTalkListItem(TalkListType.最终让路)
        Emitter.fire("onOpenTalk",item,(data)=>{
            Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,500)
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    subclassCall(): any {
        return this
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

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
import Utils from "../System/Utils/Utils";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_6 extends BaseCheckPoint {

    @property(cc.Node)
    startPlayerP: cc.Node = null;

    @property({
        displayName :"樓梯點",
        tooltip: "樓梯點",
        type : cc.Node
    })
    loutiP: cc.Node = null;
    // @property(cc.Node)
    // Pre_shizhang_1bg: cc.Node = null;
    // @property(cc.Node)
    // xiaohaiweizhi: cc.Node = null;
    // @property(cc.Node)
    // shuiweizhi: cc.Node = null;
    // @property(cc.Node)
    // luzhangweizhi: cc.Node = null;



    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null

    data : any = {}
     onDestroy(): void {
        super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onGetPre_shizhang_6Map', this.onGetPre_shizhang_6Map,this)
        Emitter.remove('onEntertishibusxiacheAfter', this.onEntertishibusxiacheAfter,this)
        Emitter.remove('onEnterchacantingAfter', this.onEnterchacantingAfter,this)
        Emitter.remove('onEnterLouti6After', this.onEnterLouti6After,this)
        Emitter.remove('onEnterEnd6After', this.onEnterEnd6After,this)
        Emitter.remove('onEnterchacantinghuatAfter', this.onEnterchacantinghuatAfter,this)
        Emitter.remove('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
    }
    registerEmitter(){
        Emitter.register('onGetPre_shizhang_6Map', this.onGetPre_shizhang_6Map,this)
        Emitter.register('onEntertishibusxiacheAfter', this.onEntertishibusxiacheAfter,this)
        Emitter.register('onEnterchacantingAfter', this.onEnterchacantingAfter,this)
        Emitter.register('onEnterLouti6After', this.onEnterLouti6After,this)
        Emitter.register('onEnterEnd6After', this.onEnterEnd6After,this)
        Emitter.register('onEnterchacantinghuatAfter', this.onEnterchacantinghuatAfter,this)
        Emitter.register('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
    }
    async onLoad () {
        // this.removeEmitter()
        // this.registerEmitter()
        super.onLoad()

        //开始游戏的定位
        Emitter.fire("onGetCamera",this,(self,mainCamera)=>{
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
    onGetPre_shizhang_6Map(selfName,self,callback){
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
        await Utils.setTimerOnce(this,0.2)

        Emitter.fire("onActionTag", false)
        Emitter.fire("onSp", playerSpType.shizhang_move)
        Emitter.fire("onGetControlGameStart",this,async(self,controlGameStart)=>{
            Emitter.fire("onSp", playerSpType.shizhang_move)
            await controlGameStart.move(1.5,player,()=>{
                Emitter.fire("onActionTag", true)
                Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                Emitter.fire("onEnterAuto",TalkListType.主角在巴士站下車)

                // Emitter.fire("onEnterAuto",TalkListType.玩家出门)

            },()=>{
                Emitter.fire("onSp", playerSpType.shizhang_move)
            })
        })




    }

    start () {
        this.init()

    }
    onEntertishibusxiacheAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        Emitter.fire("onActionTag",false)
        Emitter.fire("onCountDownSuspend",false)
        // ccLog.log("有没有啊小老弟",type)
        let item = JsonManager.getTalkListItem(TalkListType.主角在巴士站下車)
        Emitter.fire("onOpenTalk",item,(data)=>{

            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEnterchacantinghuatAfter(selfName,self,type,onEndCallBack){
        let item = JsonManager.getTalkListItem(TalkListType.主角經過斜坡上茶餐廳)
        Emitter.fire("onOpenTalk",item,async(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                Emitter.fire('onTipsShowzhixue')
                Emitter.fire("onShowMaskUI",false)
                Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                await this.setTimerOnce(2)
                this.player.destroy()
                this.onEnterCheckPointEnd("",MapName.活动现场)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
            // Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
            // await this.setTimerOnce(2)
            // this.onEnterCheckPointEnd("",MapName.活动现场)
        })
    }
    async onEnterchacantingAfter(selfName,self,type,onEndCallBack){
        // let item = JsonManager.getTalkListItem(TalkListType.主角經過斜坡上茶餐廳)
        // Emitter.fire("onOpenTalk",item,async(data)=>{
        //     // if (onEndCallBack) {
        //     //     onEndCallBack(self,data)
        //     //     // this.player.setPosition(this.xiepoweizhi.getPosition())
        //     // }
        //
        // })
        Emitter.fire("onShowMaskUI",false)
        Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
        await this.setTimerOnce(2)
        this.player.destroy()
        this.onEnterCheckPointEnd("",MapName.活动现场)
    }
    onEnterLouti6After(selfName,self,type,onEndCallBack){
        this.player.setPosition(  this.loutiP.getPosition())
        let item = JsonManager.getTalkListItem(TalkListType.主角上樓梯)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                Gongrong.getInstance().koufen(gongrongType.斜坡共荣度)
                onEndCallBack(self,data)
                // ccLog.log("主角上樓梯")
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEnterEnd6After(selfName,self,type,onEndCallBack){
        this.player.setPosition(  this.loutiP.getPosition())
        let item = JsonManager.getTalkListItem(TalkListType.主角上樓梯)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // ccLog.log("主角上樓梯")
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    //  onEnterchacantingAfter(selfName,self,type,onEndCallBack){
    //     // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
    //     // this.player.scaleX = 1
    //
    //     // ccLog.log("有没有啊小老弟",type)
    //     let item = JsonManager.getTalkListItem(TalkListType.主角經過斜坡上茶餐廳)
    //     Emitter.fire("onOpenTalk",item,async(data)=>{
    //         // if (onEndCallBack) {
    //         //     onEndCallBack(self,data)
    //             // this.player.setPosition(this.xiepoweizhi.getPosition())
    //         // }
    //         Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
    //         await this.setTimerOnce(2)
    //         this.onEnterCheckPointEnd("",MapName.活动现场)
    //     })
    // }


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

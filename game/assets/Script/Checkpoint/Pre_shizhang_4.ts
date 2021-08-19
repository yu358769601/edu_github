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
    ElevatorType,
    MapName,
    NPCType,
    playerType, spActiconType,
    TalkListType,
    tipsText
} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import JsonManager from "../manage/JsonManager";
import BaseCheckPoint from "../base/BaseCheckPoint";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_4 extends BaseCheckPoint {

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



    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null

    @property({
        displayName :"升降梯上面的点",
        tooltip: "升降梯上面的点",
        type : cc.Node
    })
    shengjiangti1P: cc.Node = null;
    @property({
        displayName :"升降梯上面的点B",
        tooltip: "升降梯上面的点B",
        type : cc.Node
    })
    shengjiangti1PB: cc.Node = null;
    @property({
        displayName :"升降梯下面的点",
        tooltip: "升降梯下面的点",
        type : cc.Node
    })
    shengjiangti2P: cc.Node = null;
    @property({
        displayName :"升降梯下面的点B",
        tooltip: "升降梯下面的点B",
        type : cc.Node
    })
    shengjiangti2PB: cc.Node = null;


    data : any = {}
     onDestroy(): void {
        super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onEntertishitianqiaoAfter', this.onEntertishitianqiaoAfter,this)
        Emitter.remove('onEnterzhengquetianqiaoAfter', this.onEnterzhengquetianqiaoAfter,this)
        Emitter.remove('onEntertishitianqiaowanchengAfter', this.onEntertishitianqiaowanchengAfter,this)
        Emitter.remove('onEntertishibashizhanAfter', this.onEntertishibashizhanAfter,this)
        Emitter.remove('onEntershengjiangtishangAfter', this.onEntershengjiangtishangAfter,this)
        Emitter.remove('onEntershengjiangtixiaAfter', this.onEntershengjiangtixiaAfter,this)
        Emitter.remove('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.remove('onEntertianqiaopaiduiAfter', this.onEntertianqiaopaiduiAfter,this)
    }
    registerEmitter(){
        Emitter.register('onEntertishitianqiaoAfter', this.onEntertishitianqiaoAfter,this)
        Emitter.register('onEnterzhengquetianqiaoAfter', this.onEnterzhengquetianqiaoAfter,this)
        Emitter.register('onEntertishitianqiaowanchengAfter', this.onEntertishitianqiaowanchengAfter,this)
        Emitter.register('onEntertishibashizhanAfter', this.onEntertishibashizhanAfter,this)
        Emitter.register('onEntershengjiangtishangAfter', this.onEntershengjiangtishangAfter,this)
        Emitter.register('onEntershengjiangtixiaAfter', this.onEntershengjiangtixiaAfter,this)
        Emitter.register('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.register('onEntertianqiaopaiduiAfter', this.onEntertianqiaopaiduiAfter,this)
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
        await this.setTimerOnce(0.1)
        Emitter.fire("onEnterAuto",TalkListType.接下來要去巴士站轉車)
    }
    onEntertishitianqiaoAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        ccLog.log("有没有啊小老弟",type)
        let item = JsonManager.getTalkListItem(TalkListType.接下來要去巴士站轉車)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEntertishitianqiaowanchengAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        // 主角過天橋完成盲人
        ccLog.log("有没有啊小老弟",type)

        let item
        let newtype

        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
            if (controlPlayer.data.type == playerType.shizhang) {
                newtype = TalkListType.主角過天橋完成盲人
            } else if (controlPlayer.data.type == playerType.canzhang) {
                newtype = TalkListType.主角過天橋完成
            }
        })


         item = JsonManager.getTalkListItem(newtype)
        Emitter.fire("onOpenTalk",item,(data)=>{
            this.player.opacity = 0
            this.player.setPosition(  this.shengjiangti2P.getPosition())

            Emitter.fire("onElevatorOpen",ElevatorType.天桥右面)
            UtilsAction.fadeIn(this.player,1,async()=>{

                await this.setTimerOnce(1)



                // this.player.setPosition(this.shengjiangti2P.getPosition())
                UtilsAction.moveTo(this.player,1,this.shengjiangti2PB.getPosition().x,this.shengjiangti2P.getPosition().y,()=>{
                    if (onEndCallBack) {
                        onEndCallBack(self,data)

                        // this.player.setPosition(this.xiepoweizhi.getPosition())
                    }

                })
                Emitter.fire("onElevatorClose",ElevatorType.天桥右面)
                this.player.opacity = 255



            })



        })
    }
     onEntertishibashizhanAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        ccLog.log("有没有啊小老弟",type)
        let item = JsonManager.getTalkListItem(TalkListType.主角到達巴士站指示牌下)
        Emitter.fire("onOpenTalk",item,async(data)=>{
            // if (onEndCallBack) {
            //     onEndCallBack(self,data)
            //     // this.player.setPosition(this.xiepoweizhi.getPosition())
            //
            // }
            Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
            await this.setTimerOnce(2)
            this.player.destroy()
            this.onEnterCheckPointEnd("",MapName.等车)

        })
    }
    start () {
        this.init()

    }
    onEnterzhengquetianqiaoAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.正確的斜坡下去)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    onEntershengjiangtishangAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        // let item = JsonManager.getTalkListItem(TalkListType.正確的斜坡下去)
        // Emitter.fire("onOpenTalk",item,(data)=>{
        //
        // })

        UtilsAction.moveTo(this.player,1,this.shengjiangti1PB.getPosition().x,this.shengjiangti1PB.getPosition().y,()=>{
            Emitter.fire("onElevatorOpen",ElevatorType.天桥左面)
            UtilsAction.fadeOut(this.player,1,async ()=>{
                Emitter.fire("onElevatorClose",ElevatorType.天桥左面)
                await this.setTimerOnce(3)
                this.player.opacity = 255
                this.player.setPosition(this.shengjiangti1P.getPosition())
                if (onEndCallBack) {
                    onEndCallBack(self,null)
                }
            })
        })



    }
    onEntershengjiangtixiaAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        // let item = JsonManager.getTalkListItem(TalkListType.正確的斜坡下去)
        // Emitter.fire("onOpenTalk",item,(data)=>{
        //
        // })

        UtilsAction.fadeOut(this.player,1,async()=>{
            Emitter.fire("onElevatorOpen",ElevatorType.天桥右面)
            await this.setTimerOnce(3)
            this.player.opacity = 255
            Emitter.fire("onElevatorClose",ElevatorType.天桥右面)


            // this.player.setPosition(this.shengjiangti2P.getPosition())
            UtilsAction.moveTo(this.player,1,this.shengjiangti2P.getPosition().x,this.shengjiangti2P.getPosition().y,null)
            if (onEndCallBack) {
                onEndCallBack(self,null)
            }
        })
    }
    onEntertianqiaopaiduiAfter(selfName,self,type,onEndCallBack){
        let item = JsonManager.getTalkListItem(TalkListType.天桥电梯排队)
        Emitter.fire("onOpenTalk",item,(data)=>{
            Emitter.fire("onNPCSpMove",NPCType.天桥电梯排队,spActiconType.让路,false,500)
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

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
    Collisiontype,
    ElevatorType,
    MapName, playerSpType,
    playerType,
    TalkListType,
    tipsText
} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import JsonManager from "../manage/JsonManager";
import BaseCheckPoint from "../base/BaseCheckPoint";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_0 extends BaseCheckPoint {

    @property(cc.Node)
    startPlayerP: cc.Node = null;
    @property({
        displayName :"做电梯开始点",
        tooltip: "做电梯开始点",
        type : cc.Node
    })
    TakeTheElevatorP: cc.Node = null;
    @property({
        displayName :"做电梯结束点",
        tooltip: "做电梯结束点",
        type : cc.Node
    })
    TakeTheElevatorEndP: cc.Node = null;
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

    data : any = {}

    EnterCheckPointEnd_1 : boolean = false
     onDestroy(): void {
        super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onGetPre_shizhang_1Map', this.onGetPre_shizhang_1Map,this)
        // Emitter.remove('onEnterCheckPointEnd_1Before', this.onEnterCheckPointEnd_1Before,this)
        // Emitter.remove('onEnterCarAfter', this.onEnterCarAfter,this)
        // Emitter.remove('onEnterXiepoAfter', this.onEnterXiepoAfter,this)
        // Emitter.remove('onEnterlajitongAfter', this.onEnterlajitongAfter,this)
        // Emitter.remove('onEntershigongAfter', this.onEntershigongAfter,this)
        // Emitter.remove('onEnterLoutiAfter', this.onEnterLoutiAfter,this)
        // Emitter.remove('onEnterzhengquexiepoAfter', this.onEnterzhengquexiepoAfter,this)
        // Emitter.remove('onEntertishihonglvAfter', this.onEntertishihonglvAfter,this)
        Emitter.remove('onEntertishichumenAfter', this.onEntertishichumenAfter,this)
        Emitter.remove('onTakeTheElevator', this.onTakeTheElevator,this)
    }
    registerEmitter(){
        Emitter.register('onGetPre_shizhang_1Map', this.onGetPre_shizhang_1Map,this)
        // Emitter.register('onEnterCheckPointEnd_1Before', this.onEnterCheckPointEnd_1Before,this)
        // Emitter.register('onEnterCarAfter', this.onEnterCarAfter,this)
        // Emitter.register('onEnterXiepoAfter', this.onEnterXiepoAfter,this)
        // Emitter.register('onEnterlajitongAfter', this.onEnterlajitongAfter,this)
        // Emitter.register('onEntershigongAfter', this.onEntershigongAfter,this)
        // Emitter.register('onEnterLoutiAfter', this.onEnterLoutiAfter,this)
        // Emitter.register('onEnterzhengquexiepoAfter', this.onEnterzhengquexiepoAfter,this)
        // Emitter.register('onEntertishihonglvAfter', this.onEntertishihonglvAfter,this)
        Emitter.register('onEntertishichumenAfter', this.onEntertishichumenAfter,this)
        Emitter.register('onTakeTheElevator', this.onTakeTheElevator,this)

    }
    async onLoad () {
        super.onLoad()

        //开始游戏的定位
        Emitter.fire("onGetCamera",this,(self,mainCamera)=>{
          mainCamera.node.setPosition(self.startPlayerP.getPosition())

        })

           // this.zhuzi.zIndex = 101
        // ccLog.log("有没有啊小老弟",this.player)

        Emitter.fire("onCountDownShow",{xuniTime : 600,shijiTime:200})


        // Emitter.fire("ontimeOutDialog")

    }
    init(){

        Emitter.fire("onAddTrafficlights",{
            noRunTime : 15,
            noRunTipsTime : 4,
            goRun : 15,
            goRunTipsTime : 4,
        })




    }
    //移动到门口动画表现
    onTakeTheElevator(){
        Emitter.fire("onElevatorOpen",ElevatorType.家门口电梯)
        Emitter.fire("onSp", playerSpType.shizhang_move)
        UtilsAction.moveTo(this.player,1,this.TakeTheElevatorP.x,this.TakeTheElevatorP.y,()=>{
            UtilsAction.moveTo(this.player,1,this.TakeTheElevatorEndP.x,this.TakeTheElevatorEndP.y,()=>{


                UtilsAction.fadeOut(this.player,1,()=>{

                    Emitter.fire("onElevatorClose",ElevatorType.家门口电梯)
                    ccLog.log("过关")
                    this.player.destroy()
                    this.onEnterCheckPointEnd("",MapName.街道) 
                })
            })
        })
        // this.player.setPosition(this.zhuangcheweizhi.getPosition())
    }


    //玩家出门
    onEntertishichumenAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.玩家出门)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    onEnterCheckPointEnd_1Before(){
        // this.mainCamera.node.active = true
        // UtilsAction.moveBy(this.mainCamera.node,10,2500,0,()=>{
        //     this.onEnterCheckPointEnd_1()
        // })
    }


    //得到第一个关卡
    onGetPre_shizhang_1Map(selfName,self,callback){
            if (callback) {
                callback(self,this.node)
            }
    }

    async setData(data,otherData ?){
        this.data = data
        // this.data.type =2
        ccLog.log("第一个页面过来的数据",data)
        let player = this.player = await UtilsNode.getNode("player",this.node)
        // ccLog.log("有没有啊小老弟",player)
        player.setPosition( this.startPlayerP.getPosition())


        // this.startPlayerP.setPosition()
        player.getComponent("controlPlayer").setData(this.data)
        Emitter.fire("onMusicSwitch",SoundType.第1_4關,0.2)
        Emitter.fire("onActionTag", false)
        Emitter.fire("onOpenDialog",{name : "transitionsDialog"},()=>{

            Emitter.fire("onGetControlGameStart",this,async(self,controlGameStart)=>{
                Emitter.fire("onSp", playerSpType.shizhang_move)
                await controlGameStart.move(1,player,()=>{
                    Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                    Emitter.fire("onEnterAuto",TalkListType.玩家出门)
                })
            })
        })
        // await this.setTimerOnce(0.1)





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
        this.player.setPosition(this.xiepoweizhi.getPosition())
        // this.player.scaleX = 1
        // controlPlayer.data.type == playerType.canzhang
        // if (type == playerType.canzhang){
           let item = JsonManager.getTalkListItem(TalkListType.玩家在石堆下去)
            Emitter.fire("onOpenTalk",item,(data)=>{
                if (onEndCallBack) {
                    onEndCallBack(self,data)
                    // this.player.setPosition(this.xiepoweizhi.getPosition())
                }
            })
        // }

    }
    //樓梯
    onEnterLoutiAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.xiepoweizhi.getPosition().x,this.xiepoweizhi.getPosition().y,null)


        // this.player.setPosition(this.xiepoweizhi.getPosition())

        // this.player.setPosition(  this.xiepoweizhi.getPosition())
        this.player.setPosition(this.xiepoweizhi.getPosition())
        // this.player.scaleX = 1
        // controlPlayer.data.type == playerType.canzhang
        // if (type == playerType.canzhang){
        let item = JsonManager.getTalkListItem(TalkListType.玩家在樓梯下去)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
        // }

    }
    //
    onEnterlajitongAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.lajitongweizhi.getPosition().x,this.lajitongweizhi.getPosition().y,null)
        this.player.setPosition(  this.lajitongweizhi.getPosition())
        let item = JsonManager.getTalkListItem(TalkListType.玩家碰到垃圾桶)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    onEntershigongAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.玩家碰到路障)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }

    onEnterzhengquexiepoAfter(selfName,self,type,onEndCallBack){
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
    onEntertishihonglvAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1
        let item = JsonManager.getTalkListItem(TalkListType.玩家在紅綠燈前)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
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

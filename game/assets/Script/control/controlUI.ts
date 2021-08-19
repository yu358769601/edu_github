// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsAction from "../System/Utils/UtilsAction";
import ccLog from "../System/Log/ccLog";
import {ZindexType} from "../System/Type/enums";
import Tools from "../System/Utils/Tools";
import BaseComponent from "../System/Base/BaseComponent";
import StaticData from "../System/data/StaticData";
import JsonManager from "../manage/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlUI extends BaseComponent {

    @property(cc.Node)
    quit: cc.Node = null;
    @property(cc.Node)
    mask: cc.Node = null;


    @property(cc.Slider)
    speedSlider: cc.Slider = null;
    @property(cc.Label)
    speedNum: cc.Label = null;
    @property({
        displayName :"转场node",
        tooltip: "转场node",
        type : cc.Node
    })
    transitions: cc.Node = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onShowMaskUI', this.onShowMaskUI, this)
        Emitter.remove('onTransitions', this.onTransitions, this)
        Emitter.remove('onGetControlUI', this.onGetControlUI, this)
        // Emitter.remove('onGongrong', this.onGongrong, this)


    }

    registerEmitter() {
        Emitter.register('onShowMaskUI', this.onShowMaskUI, this)
        Emitter.register('onTransitions', this.onTransitions, this)
        Emitter.register('onGetControlUI', this.onGetControlUI, this)
        // Emitter.register('onGongrong', this.onGongrong, this)

    }
    // Emitter.fire("onGongrong")

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        this.quit.on(cc.Node.EventType.TOUCH_END,()=>{
            Emitter.fire("onQuit",0)
        },this)


        // UtilsAction.heartbeatRepeatForever(this.mask,1,1.1,1.1,null)
    }
    // Emitter.fire("onShowMaskUI")
    onShowMaskUI(selfName,b){
        if (b) {
            this.mask.active = true
            this.mask.scaleX = 1
            this.mask.scaleY = 1
            // UtilsAction.heartbeatRepeatForever(this.mask,1,1.1,1.1,null)
        }else{
            UtilsAction.scaleTo(this.mask,1,5,5,()=>{
                this.mask.active = false
            })


        }
    }

     onTransitions(selfName,type,callback){
        if (type == true) {
            UtilsAction.fadeIn(this.transitions,2,async()=>{
                await this.setTimerOnce(3)
                if (callback) {
                    callback()
                }
            })

        }else if (type == false) {
            UtilsAction.fadeOut(this.transitions,2,async ()=>{
                await this.setTimerOnce(3)
                if (callback) {
                    callback()
                }
            })
        }

    }


    setSpeedSlider(){
       let pro = this.speedSlider.progress
        ccLog.log("当前进度",pro)
        Emitter.fire("onGetPlayer", this,  (self, player) => {
            // player1 = player
            // player.node.zIndex = ZindexType.zhencghang
            // ccLog.log("出去了吗")
            // ccLog.log(self, player)
            // player.lunyiSpeedNum = Math.round(pro*100)/100
            // self.speedSlider.progress = player.lunyiSpeedNum
            // ccLog.log("变动的",self.speedSlider.progress)
            // self.speedNum.string = self.speedSlider.progress

        })
    }

    start () {

        Emitter.fire("onOpenGoTips")

        this.setSpeedSlider()
    }

    onGetControlUI(selfName, self, callback) {
        if (callback) {
            // ccLog.log("几次",self)
            callback(self, this)
        }
    }


    update (dt) {
        if (this.mask.active == true) {

            // Emitter.fire("onGetPlayer", this,  (self, player) => {
            //     // player1 = player
            //     // player.node.zIndex = ZindexType.zhencghang
            //     // ccLog.log("出去了吗")
            //     // ccLog.log(self, player)
            //     // player.lunyiSpeedNum = Math.round(pro*100)/100
            //     // self.speedSlider.progress = player.lunyiSpeedNum
            //     // ccLog.log("变动的",self.speedSlider.progress)
            //     // self.speedNum.string = self.speedSlider.progress
            //
            //     let p = Tools.convetOtherNodeSpace(player.node ,self.node)
            //     // let p  =self.node.convertToNodeSpaceAR(player.node.getPosition())
            //     // let p  =player.node.getPosition()
            //     self.mask.setPosition(p)
            // })
        }


    }

    callBackTimeOut(id, data) {
    }
}

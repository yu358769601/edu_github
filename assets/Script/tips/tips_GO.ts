// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import BaseComponent from "../System/Base/BaseComponent";
import UtilsAction from "../System/Utils/UtilsAction";
import ccLog from "../System/Log/ccLog";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tips_GO extends BaseComponent {

    @property(cc.Node)
    go: cc.Node = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    time : number = 0
    timeMax : number = 3
    timeTag : boolean = false

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onOpenGoTips', this.onOpenGoTips,this)
        Emitter.remove('onCloseGoTips', this.onCloseGoTips,this)
        Emitter.remove('onCloseGoTipsActivit', this.onCloseGoTipsActivit,this)


    }
    registerEmitter(){
        Emitter.register('onOpenGoTips', this.onOpenGoTips,this)
        Emitter.register('onCloseGoTips', this.onCloseGoTips,this)
        Emitter.register('onCloseGoTipsActivit', this.onCloseGoTipsActivit,this)
    }
    onLoad () {

        this.removeEmitter()
        this.registerEmitter()
        this.go.active = false
        // this.playerGameType = PlayerGameType.wudi
    }
    onOpenGoTips(selfName,data ?){
        if (data == null) {

        }else{
           this.timeMax = data.timeMax
        }
        this.time = 0
        this.timeTag = true
        ccLog.log("现在go 开启 ")
    }
    onCloseGoTips(selfName){
        this.go.active = false
        this.time = 0
        this.timeTag = false

        ccLog.log("现在go 关闭 ")
    }
    onCloseGoTipsActivit(selfName){
     this.node.active = false
    }

    start () {

    }
    async timeOut(){
        this.go.active = true
        this.go.opacity = 255
        UtilsAction.scaleToAndfadeOut(this.go,2,1,1,1.5,1.5,async()=>{
           // await this.setTimerOnce(1)
            this.time = 0
            this.timeTag = true
        })
        // Emitter.fire("onPlaySound",SoundType.SJ_game_06_UIGO出现音效)

    }
    update (dt) {
        if (this.timeTag) {
            this.time+=dt
            if (this.time>=this.timeMax) {
                this.timeTag = false
                this.time = 0
                this.timeOut()
            }
        }


    }

    callBackTimeOut(id, data) {
    }
}

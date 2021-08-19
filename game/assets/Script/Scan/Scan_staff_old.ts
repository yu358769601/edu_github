// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scan_staff_old extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onEnterScan_staff_oldTag', this.onEnterScan_staff_oldTag,this)


    }
    registerEmitter(){
        Emitter.register('onEnterScan_staff_oldTag', this.onEnterScan_staff_oldTag,this)

    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }


    enterTag : boolean = false
    start () {

    }
    onEnterScan_staff_oldTag(){
        this.enterTag = true
    }
    onCollisionEnter(other,self){              //碰撞则播放爆炸动画
        // ccLog.log("碰我的单位是 撞车",other ,"我是谁 ",self)
        if (this.enterTag == false) {
            // this.enterTag = true
            Emitter.fire("onEnterstaff_old")

            // this.node.getComponent("BoxCollider").enabled = false
            // this.enabled = false
        }

    }
    onCollisionExit(other,self){              //碰撞则播放爆炸动画
        // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        Emitter.fire("onExitstaff_old")
    }
    // update (dt) {}
}

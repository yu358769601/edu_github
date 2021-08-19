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
export default class Scan_staff_new extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    onCollisionEnter(other,self){              //碰撞则播放爆炸动画
        // ccLog.log("碰我的单位是 撞车",other ,"我是谁 ",self)
        // Emitter.fire("onEnterstaff_new")
        // this.enabled = false
        Emitter.fire("onEnterstaff_new")
    }
    onCollisionStay (other, self) {
        Emitter.fire("onStaystaff_new")
    }
    // onCollisionExit(other,self){              //碰撞则播放爆炸动画
    //     // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
    //     Emitter.fire("onExitWarning")
    // }
    // update (dt) {}
}

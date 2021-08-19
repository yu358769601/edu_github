// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {Collisiontype, TalkListType, wantType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scan_tolet extends cc.Component {

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
        ccLog.log("我现在应该肚子疼")
        // Emitter.fire("onWant",{type :wantType.duzitong })
        // Emitter.fire("onWant",{type :wantType.duzitong })
        Emitter.fire("onEnterAuto",TalkListType.想去洗手間)

        this.node.destroy()
    }
    // onCollisionExit(other,self){              //碰撞则播放爆炸动画
    //     // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
    //     Emitter.fire("onExitWarning")
    // }
    // update (dt) {}
}

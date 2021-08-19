// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {tipsText} from "../System/Type/enums";
import BaseComponent from "../System/Base/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scan_checkPointEnd_2 extends BaseComponent {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    gameTag : boolean = true
    start () {

    }
    async onCollisionEnter(other,self){              //碰撞则播放爆炸动画
        // ccLog.log("有单位进行下一场了")
        // Emitter.fire('onTipsShowMidEnd', {txt: tipsText.ceshijieshu})
        // Emitter.fire("onActionTag",false)
        // Emitter.fire("onCloseGoTips")
        // Emitter.fire("stopTime")
        // Emitter.fire("onEnterCheckPointEnd_1")
        // this.node.destroy()
        if (this.gameTag) {
            this.gameTag = false
            Emitter.fire("onShowMaskUI",false)

            Emitter.fire("onActionTag",false)
            Emitter.fire("onCloseGoTips")
            Emitter.fire("onCountDownSuspend",false)
            await this.setTimerOnce(2)

            Emitter.fire('onEnterCheckPointEnd_2Before')
        }
    }
    onCollisionExit(other,self){              //碰撞则播放爆炸动画
        // // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        // Emitter.fire("onExitWarning")
    }

    callBackTimeOut(id, data) {
    }
    // update (dt) {}
}

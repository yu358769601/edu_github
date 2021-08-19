// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../../Script/System/Msg/Emitter";
import {tipsText} from "../../Script/System/Type/enums";
import BaseComponent from "../../Script/System/Base/BaseComponent";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TimeOutDialog extends BaseComponent {

    @property(cc.Label)
    wenzi: cc.Label = null;
    @property(cc.Button)
    subBtn: cc.Button = null;
    @property(cc.Label)
    subBtnLabel: cc.Label = null;
    @property({
        displayName :"lose图片",
        tooltip: "lose图片",
        type : cc.Node
    })
    lose: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    async start () {
        this.wenzi.string = tipsText.shijianwanle
        this.subBtnLabel.string = tipsText.chonglai
        this.subBtn.node.active = false
        // this.subBtn.node.on(cc.Node.EventType.TOUCH_END,()=>{
        //     this.node.destroy()
        //     Emitter.fire("onQuit",0)
        // })
        this.lose.opacity = 0
        UtilsAction.fadeIn( this.lose,1,null)


       await this.setTimerOnce(8)
        Emitter.fire("onQuit",0)
    }
    initCallBack(callBack){

    }
    setData(data){

    }
    callBackTimeOut(id, data) {
    }

    // update (dt) {}
}

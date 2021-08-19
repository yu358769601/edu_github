// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {clickPOPType, clickPOPTypeNode, Collisiontype, tipsText} from "../System/Type/enums";
import BaseComponent from "../System/Base/BaseComponent";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scan_tips extends BaseComponent {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:


    @property({type: cc.Enum(clickPOPTypeNode)})    // call cc.Enum
    public collisiontype = clickPOPTypeNode.第一关电梯;
    @property({type: cc.Enum(clickPOPType)})    // call cc.Enum
    public clickPOP = clickPOPType.提示点我或者按空格;
    gameTag : boolean = true
    start () {

    }
    async onLoad () {
        // this.node.zIndex = 999

        // playerClickPOP
       // let playerClickPOP = await UtilsNode.getNode("playerClickPOP",this.node)
       //  playerClickPOP.getComponent("ClickPOP").setData({collisiontype:this.collisiontype,clickPOP:this.clickPOP})
    }
    async onCollisionEnter(other,self){              //碰撞则播放爆炸动画
        // ccLog.log("有单位进行下一场了")
        // Emitter.fire('onTipsShowMidEnd', {txt: tipsText.ceshijieshu})
        // Emitter.fire("onActionTag",false)
        Emitter.fire("onCloseGoTips")
        ccLog.log("关闭提示")
        // Emitter.fire("stopTime")
        // Emitter.fire("onEnterCheckPointEnd_1")
        // this.node.destroy()
        // ccLog.log("碰到了嗎",this.collisiontype)
        // Emitter.fire("onClickPOP",this.clickPOP,this.collisiontype,true)
    }
    onCollisionExit(other,self){              //碰撞则播放爆炸动画
        // // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        // Emitter.fire("onExitWarning")
        // Emitter.fire('onExitditiegongzuorenyuan')
        // Emitter.fire("onClickPOP",this.clickPOP,this.collisiontype,false)
        Emitter.fire("onOpenGoTips")
    }

    callBackTimeOut(id, data) {
    }
    // update (dt) {}
}

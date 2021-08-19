// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {ItemPanelController} from "./ItemPanelController";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export class labelpanelcontroller extends ItemPanelController {

    msg  = null;

    labelmsg_label: cc.Node;

    onLoad() {
        this.labelmsg_label = cc.find('label', this.node);
        this.node.on('touchend', () => {
            // console.log(this.msg);
            // console.log(this.node.getSiblingIndex())
            Emitter.fire("onToSelectRole",this.msg)
            // ccLog.log("点了什么",this.msg.name)

        }, this)
    }

    ResetPanel(res) {
        if (res == undefined) { return }
        this.msg = res;
        this.labelmsg_label.getComponent(cc.Label).string = this.msg.txt;


    }

}
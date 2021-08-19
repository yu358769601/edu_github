// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseComponent from "../System/Base/BaseComponent";
import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TransitionsDialog extends BaseComponent {


    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('ontimeOutDialog', this.ontimeOutDialog,this)


    }

    registerEmitter() {
        Emitter.register('ontimeOutDialog', this.ontimeOutDialog,this)
    }

    onLoad() {

        this.removeEmitter()
        this.registerEmitter()

        // this.playerGameType = PlayerGameType.wudi
    }
    async ontimeOutDialog(){
        let timeOutDialog = await UtilsNode.getNode("timeOutDialog", this.node);
        // upLvDialog.getComponent("timeOutDialog").setData(data)
        timeOutDialog.zIndex = 90
    }
    async setData(self, data) {
        // ccLog.log(" 要打开对话框的请求 ",data);
        // this.checkAllChildren()
        // let timeOutDialog = await UtilsNode.getNode("timeOutDialog", this.node);
        // cc.log(" upLvDialog ",upLvDialog);
        // upLvDialog.getComponent("timeOutDialog").setData(data)
        // timeOutDialog.zIndex = 90
        await this.setTimerOnce(2)
        UtilsAction.fadeOut(this.node, 2, async () => {
            if (this.callBack) {
                this.callBack()
                this.node.destroy()
            }
        })
    }

    callBack() {
    }

    initCallBack(callBack) {
        this.callBack = callBack
    }

    start() {

    }

    callBackTimeOut(id, data) {
    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlGameStart extends cc.Component {

    @property({
        displayName: "开始移动的点",
        tooltip: "开始移动的点",
        type: cc.Node
    })
    startMoveP: cc.Node [] = [];

    index: number = 0

    protected onDestroy(): void {
        this.removeEmitter()
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()


    }

    removeEmitter() {
        Emitter.remove('onGetControlGameStart', this.onGetControlGameStart, this)
    }

    registerEmitter() {
        Emitter.register('onGetControlGameStart', this.onGetControlGameStart, this)
    }

    start() {

    }

    onGetControlGameStart(selfName, self, callback) {
        if (callback) {
            callback(self, this)
        }
    }

    async move(time,node ,callBack,itemCallBack ?) {
        this.index = 0

        for (let i = 0; i < this.startMoveP.length; i++) {
            let item = this.startMoveP[i]
            if (item !=null) {

                await UtilsAction.moveTo(node, time, item.x, item.y, null)
                if (itemCallBack) {
                    itemCallBack()
                }
            }

        }

        if (callBack) {
            callBack()
        }


    }


    // update (dt) {}
}

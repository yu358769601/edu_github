// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import ccLog from "../System/Log/ccLog";
import BaseComponent from "../System/Base/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlCar extends BaseComponent {

    @property(cc.Node)
    carStart_P: cc.Node = null;

    @property(cc.Node)
    carEnd_P: cc.Node = null;

    protected onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onGoCar', this.onGoCar, this)
    }

    registerEmitter() {
        Emitter.register('onGoCar', this.onGoCar, this)
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()

    }

    onGoCar(selfName) {
        // UtilsNode.getNode("car")
        ccLog.log("现在已经 去开车了 0")
        Emitter.fire("onGetPre_shizhang_1Map", this, async (self, map) => {
            self.rootMap = map
            // await this.setTimerOnce(1)
            let car = await UtilsNode.getNode("car", self.rootMap)
            car.getComponent("car").setData({
                carStart_P : self.carStart_P,
                carEnd_P : self.carEnd_P
            })
            // car.getComponent("car").setIndex(i)
            car.setPosition(self.carStart_P.getPosition())
            // await this.setTimerOnce(1)
            // let car1 = await UtilsNode.getNode("car", self.rootMap)
            // car1.getComponent("car").setData({
            //     carStart_P : self.carStart_P,
            //     carEnd_P : self.carEnd_P
            // })
            // // car.getComponent("car").setIndex(i)
            // car1.setPosition(self.carStart_P.getPosition())
            // await this.setTimerOnce(2)
            // let car2 = await UtilsNode.getNode("car", self.rootMap)
            // car2.getComponent("car").setData({
            //     carStart_P : self.carStart_P,
            //     carEnd_P : self.carEnd_P
            // })
            // // car.getComponent("car").setIndex(i)
            // car2.setPosition(self.carStart_P.getPosition())
            // await this.setTimerOnce(2)
            // let car3 = await UtilsNode.getNode("car", self.rootMap)
            // car3.getComponent("car").setData({
            //     carStart_P : self.carStart_P,
            //     carEnd_P : self.carEnd_P
            // })
            // // car.getComponent("car").setIndex(i)
            // car3.setPosition(self.carStart_P.getPosition())
        })
    }

    start() {

    }

    callBackTimeOut(id, data) {
    }

    // update (dt) {}
}

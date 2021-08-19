// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import Tips from "./Tips";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TpsRoot extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';
    tips : Tips = null
    // LIFE-CYCLE CALLBACKS:
    removeEmitter() {

        Emitter.remove('onTipsShow', this.onTipsShow,this)
        Emitter.remove('onTipsShowMidAn', this.onTipsShowMidAn,this)
        Emitter.remove('onTipsShowMidEnd', this.onTipsShowMidEnd,this)
        Emitter.remove('onTipsShowShunli', this.onTipsShowShunli,this)
        Emitter.remove('onTipsShowEndGame', this.onTipsShowEndGame,this)
        Emitter.remove('onTipsShowzhixue', this.onTipsShowzhixue,this)
    }

    registerEmitter() {

        Emitter.register('onTipsShow', this.onTipsShow,this)
        Emitter.register('onTipsShowMidAn', this.onTipsShowMidAn,this)
        Emitter.register('onTipsShowMidEnd', this.onTipsShowMidEnd,this)
        Emitter.register('onTipsShowShunli', this.onTipsShowShunli,this)
        Emitter.register('onTipsShowEndGame', this.onTipsShowEndGame,this)
        Emitter.register('onTipsShowzhixue', this.onTipsShowzhixue,this)

    }

    protected onDestroy(): void {
        // cc.log(" 现在删不掉吗 ","PK");
        this.removeEmitter()
        // this.node.off(cc.Node.EventType.TOUCH_END)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }
    async onTipsShow(self,showData) {
        await this.getTips()
        this.tips.node.setPosition(this.node.x, this.node.y-100)
        // cc.log("点了多少下 ",showData)
        this.tips.flyTopAn(showData)
    }
    async onTipsShowMidAn(self,showData) {
        await this.getTips()
        this.tips.node.setPosition(this.node.x, this.node.y)
        // cc.log("点了多少下 ",showData)
        this.tips.midAn(showData)
    }
    async onTipsShowShunli(self,showData) {
        await this.getTips()
        this.tips.node.setPosition(this.node.x, this.node.y)
        // cc.log("点了多少下 ",showData)
        this.tips.midShunli(showData)
    }
    async onTipsShowzhixue(self,showData) {
        await this.getTips()
        this.tips.node.setPosition(this.node.x, this.node.y)
        // cc.log("点了多少下 ",showData)
        this.tips.zhixuekaishi()
    }
    async onTipsShowMidEnd(self,showData) {
        await this.getTips()
        this.tips.node.setPosition(this.node.x, this.node.y)
        // cc.log("点了多少下 ",showData)
        this.tips.midEnd(showData)
    }
    async onTipsShowEndGame(self,showData) {
        await this.getTips()
        this.tips.node.setPosition(this.node.x, this.node.y)
        // cc.log("点了多少下 ",showData)
        this.tips.endGame(showData)
    }
    async getTips() {
        let tipss = await UtilsNode.getNode("tips", this.node);
        this.tips = tipss.getComponent("Tips")
    }
    start () {

    }

    // update (dt) {}
}

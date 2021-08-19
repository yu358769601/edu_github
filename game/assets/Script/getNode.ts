// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseComponent from "./System/Base/BaseComponent";
import Emitter from "./System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GetNode extends cc.Component {


    @property(cc.Integer)
    num: number = 0;

    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onGetNode', this.onGetNode,this)
    }
    registerEmitter(){
        Emitter.register('onGetNode', this.onGetNode,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }
    // Emitter.fire("onGetNode",0,false)
    onGetNode(selfName,index,b){
        if (index == this.num) {
            this.node.active = b
        }
    }
    start () {

    }


    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TalkManage extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onOpenTalk', this.onOpenTalk,this)


    }
    registerEmitter(){
        Emitter.register('onOpenTalk', this.onOpenTalk,this)
    }
    onLoad () {

        this.removeEmitter()
        this.registerEmitter()

        // this.playerGameType = PlayerGameType.wudi
    }

    start () {

    }
    // Emitter.fire("onOpenTalk",data)
    async onOpenTalk(selfName,data,onEndCallBack){
        ccLog.log("onOpenTalk ",data)
      let node =  await UtilsNode.getNode(data.itemName,this.node)
       let component = node.addComponent(data.itemAddComponent)
        ccLog.log("添加成功了嗎 ",this.node,data)
        if (component) {
            component.setData(data)
            component.initListen(onEndCallBack)
        }
    }
    // update (dt) {}
}

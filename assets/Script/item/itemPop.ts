// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemPop extends cc.Component {

    @property([cc.Node])
    ItemPops : cc.Node [] = [];
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    data : any = null
    // onLoad () {}

    start () {

    }
    setData(data){
        this.data = data
        let node = this.ItemPops[this.data.type]
        ccLog.log("应该飘出来了才对额",node,data)
        node.active = true
        UtilsAction.scaleToAndfadeOut_sequence(node,1,2,0,0,1,1,()=>{
            this.node.destroy()
            // ccLog.log("动作完成",data)
        })
    }
    // update (dt) {}
}

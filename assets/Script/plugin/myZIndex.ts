// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {ActivityType, ZindexType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MyZIndex extends cc.Component {

    @property({type: cc.Enum(ZindexType)})
    zIndex: number = ZindexType.zhencghang;


    // LIFE-CYCLE CALLBACKS:
    offsetY: number = 20000

    onLoad() {

    }

    setZindex(index) {
        this.node.zIndex = index
        // ccLog.log("我是谁",this.node.name,"我现在的层级",this.node.zIndex)
        this.zIndex = ZindexType.普通
    }

    start() {
        this.node.zIndex = this.zIndex
        // ccLog.log("层级", this.node.name, "父级", this.node.parent.name, this.node.zIndex)
    }

    update(dt) {
        if (this.zIndex == ZindexType.自动层级) {
            // ccLog.log("我是谁",this.node.name,"原来的层级",this.node.zIndex,"现在的层级",this.offsetY + this.node.y)
            if (this.node.zIndex !=  parseInt(this.offsetY - this.node.y-this.node.height/4+"") ) {
                this.node.zIndex = parseInt(this.offsetY - this.node.y-this.node.height/4+"")
                // ccLog.log("我是谁",this.node.name,"我现在的层级",this.node.zIndex)
            }

        }

    }
}

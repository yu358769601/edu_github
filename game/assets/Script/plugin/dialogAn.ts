// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import UtilsAction from "../System/Utils/UtilsAction";
import Emitter from "../System/Msg/Emitter";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogAn extends cc.Component {

    @property(cc.Node)
    actionNode: cc.Node = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        // ccLog.log("每次窦经理吗")
    }
    onAn(callback?){
        Emitter.fire("onPlaySound",SoundType.SJ_game_02_UI各種框出来声音)
        this.actionNode.scaleX = 0.5
        this.actionNode.scaleY = 0.5
        UtilsAction.scaleToEaseInOut(this.actionNode,1,1,1,()=>{
            if (callback) {
                callback()
            }
        })
    }



    // update (dt) {}
}

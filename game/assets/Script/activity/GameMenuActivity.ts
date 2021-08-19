// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Activity from "../System/Ui/Activity";
import Emitter from "../System/Msg/Emitter";
import UIActivity from "../System/Ui/UIActivity";
import {playerType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMenuActivity extends Activity {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    protected onDestroy(): void {
        this.removeEmitter()
        cc.game.off(cc.game.EVENT_SHOW);
        cc.game.off(cc.game.EVENT_HIDE);
        cc.game.off(cc.game.EVENT_GAME_INITED)
    }
    removeEmitter(){
        Emitter.remove('onSelectRole', this.onSelectRole,this)
    }
    registerEmitter(){
        Emitter.register('onSelectRole', this.onSelectRole,this)
    }
    async onSelectRole(selfName,data){
        ccLog.log("发过去什么呢",data)
        // this.finsh()
       await UIActivity.startToActivity("GameActivity",data)

    }

    start () {

    }

    // update (dt) {}
}

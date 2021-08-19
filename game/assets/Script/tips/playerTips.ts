// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import {chengfaPOPType, clickPOPType} from "../System/Type/enums";
import Utils from "../System/Utils/Utils";
import ccLog from "../System/Log/ccLog";
import UtilsAction from "../System/Utils/UtilsAction";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerTips extends cc.Component {

    @property([cc.Node])
    playerTips: cc.Node[] = [];

    protected onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onShowHidePlayerTips', this.onShowHidePlayerTips, this)


    }

    registerEmitter() {
        Emitter.register('onShowHidePlayerTips', this.onShowHidePlayerTips, this)

    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()
        //
        //点了按钮 和 按了空格之后
    }
    // onLoad () {}
    async onShowHidePlayerTips(selfName, type, b){

            if (b) {
                for (let i = 0; i < this.playerTips.length; i++) {
                    this.playerTips[i].active = false
                }
            }
            ccLog.log("现在是播放多少的  ",type,b)
            this.playerTips[type].active = b
        this.playerTips[type].y = 113
        this.playerTips[type].opacity = 255
        UtilsAction.gongrongTips(this.playerTips[type],3,0,200,()=>{
            if (b == true) {

                this.playerTips[type].active = false
            }
        })
        // await Utils.setTimerOnce(this,3)
        if (type == chengfaPOPType.增加共融值) {
            Emitter.fire("onPlaySound",SoundType.SJ_game_07_UI成功加分音效)
        }else{
            Emitter.fire("onPlaySound",SoundType.SJ_game_05_UI扣分音效)
        }

    }
    start () {

    }

    // update (dt) {}
}

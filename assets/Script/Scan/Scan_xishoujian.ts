// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {
    chengfaPOPType,
    NPCType,
    playerSpType,
    spActiconType,
    TalkListType,
    tipsText
} from "../System/Type/enums";
import JsonManager from "../manage/JsonManager";
import Gongrong, {gongrongType} from "../item/gongrong";
import Utils from "../System/Utils/Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scan_xishoujian extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    async onCollisionEnter(other,self){              //碰撞则播放爆炸动画
        // ccLog.log("有单位进行下一场了")
        // Emitter.fire('onTipsShowMidEnd', {txt: tipsText.ceshijieshu})
        Emitter.fire("onActionTag",false)
        // Emitter.fire("onCloseGoTips")
        Emitter.fire("stopTime")
        // Emitter.fire("onEnterCheckPointEnd_1")
        // this.node.destroy()
        Emitter.fire("onFollowStaffAnimStop")
        let item = JsonManager.getTalkListItem(TalkListType.占用便捷厕所)
        Emitter.fire("onOpenTalk",item,async (data)=>{
            Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,99)

            await Utils.setTimerOnce(this,1)
            this.quxishou()
            this.node.destroy()
        })


    }

    quxishou(){
        Emitter.fire("onEnterXishoujian")
    }


    onCollisionExit(other,self){              //碰撞则播放爆炸动画
        // // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        // Emitter.fire("onExitWarning")
    }
    // update (dt) {}
}

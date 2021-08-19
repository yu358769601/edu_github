// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import UtilsNode from "../System/Utils/UtilsNode";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {
    clickPOPType,
    clickPOPTypeNode,
    NPCType,
    spActiconType, TalkListType,
    wantType
} from "../System/Type/enums";
import BaseComponent from "../System/Base/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlBoom extends BaseComponent {

    @property(cc.Animation)
    _anim: cc.Animation = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onBoom', this.onBoom,this)



    }
    registerEmitter(){
        Emitter.register('onBoom', this.onBoom,this)


    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        this._anim = this.getComponent(cc.Animation)
    }

    start () {
    }
    async onBoom(selfName,data){
        ccLog.log("我现在 应该肚子疼的条目出来")
        // let itemPop =await UtilsNode.getNode("itemPop",this.node)
        // itemPop.getComponent("itemPop").setData(data)

        this._anim.play("boom")

        this._anim.on('stop', (type: string, state: cc.AnimationState)=>{
            // ccLog.log("导购动画"," type ",type," state ",state)
            // // Emitter.fire('onTipsShow', {txt: tipsText.mudidi})
            // // Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.闲置,true,0)
            // Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.说话,true,0)
            // Emitter.fire("onEnterAuto",TalkListType.衛生間已經到了)
            this.getComponent(cc.Sprite).spriteFrame = null

        }, this);
    }

    callBackTimeOut(id, data) {
    }



    // update (dt) {}
}

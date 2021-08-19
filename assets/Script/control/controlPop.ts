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
import {clickPOPType, clickPOPTypeNode, wantType} from "../System/Type/enums";
import BaseComponent from "../System/Base/BaseComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlPop extends BaseComponent {

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
        Emitter.remove('onWant', this.onWant,this)
        Emitter.remove('onEnterstaff_old', this.onEnterstaff_old,this)
        Emitter.remove('onExitstaff_old', this.onExitstaff_old,this)
        Emitter.remove('onEnterCheckpoint1Elevator', this.onEnterCheckpoint1Elevator,this)
        Emitter.remove('onExitCheckpoint1Elevator', this.onExitCheckpoint1Elevator,this)
        Emitter.remove('onEnterCheckpoint2Elevator', this.onEnterCheckpoint2Elevator,this)
        Emitter.remove('onExitCheckpoint2Elevator', this.onExitCheckpoint2Elevator,this)
        Emitter.remove('onEnterCheckpoint4Elevator', this.onEnterCheckpoint4Elevator,this)
        Emitter.remove('onExitCheckpoint4Elevator', this.onExitCheckpoint4Elevator,this)
        Emitter.remove('onEnterditiegongzuorenyuan', this.onEnterditiegongzuorenyuan,this)
        Emitter.remove('onClickPOP', this.onClickPOP,this)


    }
    registerEmitter(){
        Emitter.register('onWant', this.onWant,this)
        Emitter.register('onEnterstaff_old', this.onEnterstaff_old,this)
        Emitter.register('onExitstaff_old', this.onExitstaff_old,this)
        Emitter.register('onEnterCheckpoint1Elevator', this.onEnterCheckpoint1Elevator,this)
        Emitter.register('onExitCheckpoint1Elevator', this.onExitCheckpoint1Elevator,this)
        Emitter.register('onEnterCheckpoint2Elevator', this.onEnterCheckpoint2Elevator,this)
        Emitter.register('onExitCheckpoint2Elevator', this.onExitCheckpoint2Elevator,this)
        Emitter.register('onEnterCheckpoint4Elevator', this.onEnterCheckpoint4Elevator,this)
        Emitter.register('onExitCheckpoint4Elevator', this.onExitCheckpoint4Elevator,this)
        Emitter.register('onEnterditiegongzuorenyuan', this.onEnterditiegongzuorenyuan,this)
        Emitter.register('onClickPOP', this.onClickPOP,this)

    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    start () {
    }
    async onWant(selfName,data){
        ccLog.log("我现在 应该肚子疼的条目出来")
        // let itemPop =await UtilsNode.getNode("itemPop",this.node)
        // itemPop.getComponent("itemPop").setData(data)
    }
    //进入商场服务员
    async onEnterstaff_old(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,true,clickPOPTypeNode.第三关工作人员)


    }
    //离开商场服务员
    async onExitstaff_old(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,false,clickPOPTypeNode.第三关工作人员)
    }
    //进入第一关电梯
    async onEnterCheckpoint1Elevator(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,true,clickPOPTypeNode.第一关电梯)
    }
    //离开第一关电梯
    async onExitCheckpoint1Elevator(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,false,clickPOPTypeNode.第一关电梯)
    }
    async onEnterCheckpoint2Elevator(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,true,clickPOPTypeNode.第三关电梯)
    }
    async onExitCheckpoint2Elevator(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,false,clickPOPTypeNode.第三关电梯)
    }

    async onEnterCheckpoint4Elevator(){
        Emitter.fire("onGetPre_shizhang_3", this, async (self, Pre_shizhang_3) => {
            if (Pre_shizhang_3.bangzhuTag == true) {

            }else{
                Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,true,clickPOPTypeNode.第四關地鐵門)
            }
        })

    }
    async onExitCheckpoint4Elevator(){
        Emitter.fire("onGetPre_shizhang_3", this, async (self, Pre_shizhang_3) => {
            if (Pre_shizhang_3.bangzhuTag == true) {

            }else{
                Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,false,clickPOPTypeNode.第四關地鐵門)
            }
        })

    }
    async onEnterditiegongzuorenyuan(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,true,clickPOPTypeNode.第四關工作人員)
    }
    async onExitditiegongzuorenyuan(){
        Emitter.fire('onShowHideClickPop',clickPOPType.提示点我或者按空格,false,clickPOPTypeNode.第四關工作人員)
    }
    // Emitter.fire("onClickPOP",clickPOPType.提示点我或者按空格,clickPOPTypeNode.第四關工作人員,b)
    async onClickPOP(selfName,showType,type,b){
        switch (type) {
            case clickPOPTypeNode.第四關地鐵門:
                Emitter.fire("onGetPre_shizhang_3", this, async (self, Pre_shizhang_3) => {

                    if (Pre_shizhang_3.bangzhuTag == true) {

                    }else{
                        Emitter.fire('onShowHideClickPop',showType,b,type)
                    }
                })
            break

            default:
                Emitter.fire('onShowHideClickPop',showType,b,type)
        }


        ccLog.log("到這裡了嗎 ",type)
        Emitter.fire('onShowHideClickPop',showType,b,type)
    }

    callBackTimeOut(id, data) {
    }

    // update (dt) {}
}

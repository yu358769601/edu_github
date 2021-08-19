// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseComponent from "../System/Base/BaseComponent";

const {ccclass, property} = cc._decorator;
import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import {NPCType, spActiconType, TalkListType, tipsText, wantType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";
@ccclass
export default class ControlStaff extends BaseComponent {

    @property(cc.Node)
    staff_old: cc.Node = null;
    @property(cc.Node)
    staff_new: cc.Node = null;
    @property(cc.Node)
    nv: cc.Node = null;

    @property(cc.Animation)
    staff_anim: cc.Animation = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    playCount : number = 0
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onEnterstaff_old2', this.onEnterstaff_old2,this)
        Emitter.remove('onEnterstaff_new', this.onEnterstaff_new,this)
        Emitter.remove('onStaystaff_new', this.onStaystaff_new,this)
        Emitter.remove('onFollowStaffAnimPause', this.onFollowStaffAnimPause,this)
        Emitter.remove('onFollowStaffAnimStop', this.onFollowStaffAnimStop,this)
        Emitter.remove('onFollowStaffAnimStart', this.onFollowStaffAnimStart,this)
        // Emitter.remove('onResetGameData', this.onResetGameData,this)
    }
    registerEmitter(){
        Emitter.register('onEnterstaff_old2', this.onEnterstaff_old2,this)
        Emitter.register('onEnterstaff_new', this.onEnterstaff_new,this)
        Emitter.register('onStaystaff_new', this.onStaystaff_new,this)
        Emitter.register('onFollowStaffAnimPause', this.onFollowStaffAnimPause,this)
        Emitter.register('onFollowStaffAnimStop', this.onFollowStaffAnimStop,this)
        Emitter.register('onFollowStaffAnimStart', this.onFollowStaffAnimStart,this)
        // Emitter.register('onResetGameData', this.onResetGameData,this)
    }

    moveTag : boolean  = false

     onLoad () {
        this.removeEmitter()
        this.registerEmitter()
        this.staff_anim = this.getComponent(cc.Animation)

    }

    start () {
        this.node.zIndex = 100
        this.staff_old.active = true
        this.staff_new.active = false

    }
    //开始对话
    async onEnterstaff_old2(){
        // let itemPop =await UtilsNode.getNode("itemPop",this.node)
        // itemPop.getComponent("itemPop").setData({type :wantType.genwolai })

        await this.setTimerOnce(0.5)

        this.staff_old.active = false
        this.staff_new.active = true

        Emitter.fire("onActionTag",true)
        Emitter.fire('onEnterFollowStaff',{time : 2})

        Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.运动,true,0)

        Emitter.fire("onGetNode",0,false)
        ccLog.log("是不是走到这里了")


        this.moveTag = true
    }
    async onStaystaff_new(){
        // let itemPop =await UtilsNode.getNode("itemPop",this.node)
        // itemPop.getComponent("itemPop").setData({type :wantType.genwolai })
        Emitter.fire('onEnterFollowStaff',{time : 2})
        // await this.setTimer(2000)
        // Emitter.fire('onEnterstaff_old2')

    }
    async onEnterstaff_new(){
        if (this.isStop == true){
            return
        }

        let animationState = this.staff_anim.getAnimationState("staffAnim")
        if (animationState.isPlaying == false && animationState.isPaused == false) {
            // ccLog.log("现在有没有 动画 现在是第一次播放动画",animationState)
            if (this.playCount == 0) {
                // let itemPop =await UtilsNode.getNode("itemPop",this.node)
                // itemPop.getComponent("itemPop").setData({type :wantType.genwolai })
            }else{
                // Emitter.fire('onTipsShow', {txt: tipsText.mudidi})
            }
        }
        // Emitter.fire('onEnterFollowStaff',{time : 2})
        // await this.setTimer(2000)
        // Emitter.fire('onEnterstaff_old2')

        this.nv.scaleX = -1
        if (animationState != null) {


                if (animationState.isPlaying == false && animationState.isPaused == false) {
                    ccLog.log("现在有没有 动画 现在是第一次播放动画",animationState)
                    if (this.playCount == 0) {
                    // animationState.repeatCount = 1
                        Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.运动,true,0)
                    this.staff_anim.play("staffAnim")
                    this.playCount = 1

                        this.staff_anim.on('stop', (type: string, state: cc.AnimationState)=>{
                            ccLog.log("导购动画"," type ",type," state ",state)
                            if (this.isStop == false) {
                                // Emitter.fire('onTipsShow', {txt: tipsText.mudidi})
                                // Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.闲置,true,0)
                                Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.说话,true,0)
                                Emitter.fire("onEnterAuto",TalkListType.衛生間已經到了)
                            }



                        }, this);
                    }
                }else if (animationState.isPlaying == true && animationState.isPaused == true) {
                    ccLog.log("现在有没有 动画 现在不是第一次播放动画",animationState)
                    this.staff_anim.resume()
                    Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.运动,true,0)
                }



        } else{

        }
        ccLog.log("现在有没有 动画" , animationState)
    }
    isStop : boolean = false

    //店员 动画暂停
    onFollowStaffAnimPause(){
        if (this.isStop == false) {
            Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.闲置,true,0)
            this.staff_anim.pause()
        }

    }

    // Emitter.fire("onFollowStaffAnimStop")
    //停止
    onFollowStaffAnimStop(){
        if (this.moveTag == true) {
            Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.闲置,true,0)
            this.staff_anim.pause()
            this.isStop = true
        }

    }
    onFollowStaffAnimStart(){
        // Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.闲置,true,0)
        // this.staff_anim.resume()
        // this.isStop = false
    }


    callBackTimeOut(id, data) {
    }
    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import TalkItem from "./TalkItem";
import BaseComponent from "../System/Base/BaseComponent";
import ccLog from "../System/Log/ccLog";
import UtilsNode from "../System/Utils/UtilsNode";
import LoadManage from "../System/Load/LoadManage";
import {Collisiontype, playerSpType, playerType} from "../System/Type/enums";
import Emitter from "../System/Msg/Emitter";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class TalKBase extends BaseComponent {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    talkItem : TalkItem = null
    index: number = 0
    subclass : any = null
    onLoad () {
        this.talkItem =  this.getComponent(TalkItem)
    }
    setSubclass(subclass){
        this.subclass = subclass

        this.onClickNext()

    }

    onClickNext(){
        if (this.talkItem) {
            this.talkItem.leftchat_Node_next.on(cc.Node.EventType.TOUCH_END,()=>{
                // ccLog.log("點了繼續 1 ")
                this.onNextClick()
            },this)
            this.talkItem.rightchat_Node_next.on(cc.Node.EventType.TOUCH_END,()=>{
                // ccLog.log("點了繼續 2 ")
                this.onNextClick()
            },this)
        }
    }
    async onNextPager(index) {
        if (index < this.subclass.data.list.length) {
            this.index = index
            let item = this.subclass.data.list[this.index]

            ccLog.log("展示什麼內容啊",item)

            if (item) {
                // {
                //     "head" : "",
                //     "type" : 0,
                //     "text" : "這破石堆明顯不適合輪椅行駛呀!你可找一些讓輪椅安全行駛的路徑."
                // },
                if (item.type == 0) {
                    this.subclass.talkItem.leftchat_Node.active = true

                    // if (data.type == playerType.shizhang) {
                    //     // this.sp.spriteFrame = await LoadManage.getSpriteForName("blind_normal")
                    //     // ccLog.log("好用吗", this.sp.spriteFrame)
                    // } else if (data.type == playerType.canzhang) {
                    //     // wheel
                    //
                    //     this.sp.skeletonData =await LoadManage.getSkeletonDataForName("wheel")
                    // }
                    Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
                        // if (controlPlayer.data.type == playerType.shizhang) {
                        //     // controlPlayer1 = controlPlayer
                        //
                        // } else if (controlPlayer.data.type == playerType.canzhang) {
                        //
                        // }

                        if (item.head != "") {
                            this.subclass.talkItem.leftchat_Node_head.spriteFrame = await LoadManage.getSpriteForName(item.playerType[controlPlayer.data.type].head)
                        }
  
                    })


                    this.subclass.talkItem.leftchat_Node_Label.string = item.text
                    await this.setTimerOnce(1)
                    this.subclass.talkItem.leftchat_Node_next.active = true

                }else if (item.type == 1) {
                    this.subclass.talkItem.rightchat_Node.active = true
                    this.subclass.talkItem.rightchat_Node_Label.string = item.text
                    if (item.head != "") {
                        this.subclass.talkItem.rightchat_Node_head.spriteFrame = await LoadManage.getSpriteForName(item.head)
                    }
                    await this.setTimerOnce(1)
                    this.subclass.talkItem.rightchat_Node_next.active = true
                }

            }
        } else {
            if (this.subclass.callback) {
                this.subclass.callback({tag : "MAP2_1"})
                this.node.destroy()
            }
        }
    }

    onNextClick() {
        this.subclass.talkItem.leftchat_Node_next.active = false
        this.subclass.talkItem.leftchat_Node.active = false

        this.subclass.talkItem.rightchat_Node_next.active = false
        this.subclass.talkItem.rightchat_Node.active = false

        Emitter.fire("onPlaySound",SoundType.SJ_game_04_UI点击声音)
        this.onNextPager( this.subclass.index+1)
    }

    start () {

    }

    // update (dt) {}
}

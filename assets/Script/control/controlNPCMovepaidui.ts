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
    Collisiontype, ElevatorType, MapName, NPCType,
    PlayerGameType,
    playerSpType,
    playerType, spActiconType, ZindexType
} from "../System/Type/enums";
import UtilsNode from "../System/Utils/UtilsNode";
import LoadManage from "../System/Load/LoadManage";
import BaseComponent from "../System/Base/BaseComponent";
import UtilsAction from "../System/Utils/UtilsAction";
import Utils from "../System/Utils/Utils";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlNPCMovepaidui extends BaseComponent {

    @property(sp.Skeleton)
    sp: sp.Skeleton = null;

    // @property(cc.Node)
    // body: cc.Node = null;


    // @property([cc.SpriteFrame])
    // spf: cc.SpriteFrame[] = [];
    // LIFE-CYCLE CALLBACKS:


    @property({type: cc.Enum(NPCType)})    // call cc.Enum
    public npcType = NPCType.商店女导购;

    @property([cc.Node])
    public ps : cc.Node [] = []
    @property(cc.Node)
    public endp : cc.Node  = null
    @property(cc.Integer)
    npcNum: number = 0;

    data: any = {}
    myAnimation: any[] = []
    mixTime: number = 0.5
    protected onDestroy(): void {
        this.removeEmitter()
    }
    _setMix(anim1, anim2) {
        this.sp.setMix(anim1, anim2, this.mixTime);
        this.sp.setMix(anim2, anim1, this.mixTime);
    }
    removeEmitter() {
        Emitter.remove('onNPCfadeOut', this.onNPCfadeOut, this)
        Emitter.remove('onNPCSpMove', this.onNPCSpMove, this)
        // Emitter.remove('onGetControlNPC', this.onGetControlNPC, this)
    }

    registerEmitter() {
        Emitter.register('onNPCfadeOut', this.onNPCfadeOut, this)
        Emitter.register('onNPCSpMove', this.onNPCSpMove, this)
        // Emitter.register('onGetControlNPC', this.onGetControlNPC, this)
    }

    onNPCfadeOut(selfName,npcNum ,callback) {
        if (npcNum ==this.npcNum) {
            UtilsAction.fadeOut(this.node, 1, () => {
            })
        }

    }


    async onLoad() {
        // this.sp = this.getComponent(sp.Skeleton)
        this.removeEmitter()
        this.registerEmitter()
        // brake   刹车
        // happy  成功
        // hit        撞到陷阱
        // idle      待机
        // run      移动
        // sad      感到彷徨
        // this.myAnimation[MonsterType.WALK] = "run"
        // if (this.npcType == NPCType.商店女导购
        //     || this.npcType == NPCType.地铁男工作人员
        // ) {
        //     this._setMix(spActiconType.闲置, spActiconType.运动)
        //     this._setMix(spActiconType.闲置, spActiconType.说话)
        //     this._setMix(spActiconType.运动, spActiconType.说话)
        // }else if ( this.npcType == NPCType.天桥老板) {
        //     this._setMix(spActiconType.闲置, spActiconType.说话)
        // }else if ( this.npcType == NPCType.车站让路路人A ||this.npcType == NPCType.车站让路路人B ) {
        //     this._setMix(spActiconType.闲置, spActiconType.让路)
        // }


       // await this.setTimerOnce(1)
       //     this.gotoRun()

    }


    start() {

    }

    onGetControlNPC(selfName, self,npcType,npcNum ,callback) {
        if (callback) {
            if (npcType == this.npcType && npcNum ==this.npcNum ) {
                callback(self, this)
            }

        }
    }

    async setData(data) {
        this.data = data
        ccLog.log("什么样子的", data.type)
        if (data.type == playerType.shizhang) {
            // this.sp.spriteFrame = await LoadManage.getSpriteForName("blind_normal")
            // ccLog.log("好用吗", this.sp.spriteFrame)
        } else if (data.type == playerType.canzhang) {
            // wheel

            this.sp.skeletonData =await LoadManage.getSkeletonDataForName("wheel")
        }
        let Player = this.getComponent("Player")
        if (this.data.type == playerType.shizhang) {
            Player.lunyiTag = false
            Player.shizhangTag = true
            Emitter.fire("onQuan", true)
        } else if (this.data.type == playerType.canzhang) {
            Player.lunyiTag = true
            Player.shizhangTag = false
            Emitter.fire("onQuan", false)
        }

        // this.scheduleOnce(()=>{
        //     this.sp.spriteFrame = this.spf[ data.type]
        // },0)


    }

    gotoRun(npcType,npcNum){
        // ccLog.log("有没有",this.sp)
        if (this.sp) {
            this.sp.timeScale = 0.5
            UtilsAction.moveTo(this.node,1.5,this.endp.x,this.endp.y,(type)=>{
                // if (type == 0) {
                //     this.sp.node.scaleX = 1
                // }else if (type == 1) {
                //     this.sp.node.scaleX = -1
                // }
                this.sp.timeScale = 1
                this.sp.setAnimation(0, spActiconType.闲置, true);
            })
        }

    }

    // Emitter.fire("onNPCSpMove",NPCType.商店女导购,spActiconType.说话,true,0)
    async onNPCSpMove(selfName,npcType,onNPCSp,onNPCSpTag,npcNum,player,callback) {
        // this.sp = this.getComponent(sp.Skeleton)
        // ccLog.log("进来了吗 前提",this.sp,"上面是谁",this.node.name)
        // ccLog.log("进来了吗 前提","npcType ",npcType,"npcNum ",npcNum)
        // ccLog.log("播放挨撞",npcType == this.npcType,npcNum ==this.npcNum )
        if (npcType == this.npcType && npcNum ==this.npcNum ){
            // ccLog.log("进来了吗","npcType ",npcType,"npcNum ",npcNum)
            let res = null
                switch (onNPCSp) {
                    case spActiconType.运动:
                        res = spActiconType.运动
                        if (this.sp.animation != onNPCSp ) {
                            this.sp.setAnimation(0, res, onNPCSpTag);
                        }
                        break
                    case spActiconType.让路:
                        res = spActiconType.让路
                        if (this.sp.animation != onNPCSp ) {
                            this.sp.setAnimation(0, res, onNPCSpTag);
                            // await this.setTimerOnce(0.5)
                            this.gotoRun()
                        }
                        break
                    case spActiconType.挨撞:
                        res = spActiconType.挨撞
                        if (this.sp.animation != onNPCSp ) {

                            this.sp.setAnimation(0, res, onNPCSpTag);
                            this.node.stopAllActions()

                            await this.setTimerOnce(1)
                            player.setPosition(this.endp.getPosition())
                            res = spActiconType.运动
                            this.sp.setAnimation(0, res, true);
                            this.gotoRun()
                            if (callback) {
                                callback()
                            }
                        }
                        break
                }



        }
        // if (this.data.type == playerType.shizhang) {
        //     let res = null
        //
        //     switch (type) {
        //         case playerSpType.shizhang_zhengchang:
        //             res = "blind_normal"
        //             break
        //         case playerSpType.shizhang_weixian:
        //             res = "blind_warning"
        //             break
        //         case playerSpType.shizhang_che:
        //             res = "blind_trap"
        //             break
        //     }
        //     if (res != null) {
        //         // this.sp.spriteFrame = await LoadManage.getSpriteForName(res)
        //     }
        //
        //
        // } else if (this.data.type == playerType.canzhang) {
        //     let res = null
        //     ccLog.log("都进来什么了 ",type)
        //     switch (type) {
        //         case playerSpType.shizhang_zhengchang:
        //             res = "idle"
        //             this.sp.setAnimation(0, res, false);
        //             break
        //         case playerSpType.shizhang_che:
        //             res = "hit"
        //             this.sp.setAnimation(0, res, false);
        //             break
        //         case playerSpType.shizhang_happy:
        //             res = "happy"
        //             this.sp.setAnimation(0, res, false);
        //             break
        //         case playerSpType.shizhang_move:
        //             res = "run"
        //             ccLog.log("运动",this.sp.animation,"  ",res)
        //             if (this.sp.animation != res) {
        //                 this.sp.setAnimation(0, res, true);
        //             }
        //
        //             break
        //         case playerSpType.shizhang_stop:
        //             res = "idle"
        //             if (this.sp.animation != res) {
        //                 this.sp.setAnimation(0, res, true);
        //             }
        //
        //             break
        //         case playerSpType.shizhang_brake:
        //             res = "brake"
        //             if (this.sp.animation != res && this.sp.animation!= "idle") {
        //                 Emitter.fire("onGetPlayer", this, async (self, player) => {
        //                     ccLog.log("走到这里来过没",player.actionTag)
        //                     if (player.actionTag == false) {
        //
        //                     }else{
        //                         if (self.sp.animation != res && self.sp.animation!= "idle") {
        //                             self.sp.setAnimation(0, res, false);
        //                             await self.setTimerOnce(1)
        //                             self.sp.setAnimation(0, "idle", true);
        //                         }
        //
        //                     }
        //                 })
        //
        //             }
        //
        //             break
        //     }
        //    /* if (res != null) {
        //         this.sp.setAnimation(0, res, false);
        //     }*/
        // }
    }


    //朝向
    onNPCOrientation(selfName,npcType,npcNum ,moveDir) {
        // Emitter.fire("onGetPlayer", this, async (self, player) => {
        //     // player1 = player
        //     if (moveDir.x < 0) {
        //         player.node.scaleX = -1
        //     } else {
        //         player.node.scaleX = 1
        //     }
        //     // ccLog.log("出去了吗")
        // })
        if (npcType == this.npcType && npcNum ==this.npcNum ){
            if (moveDir.x < 0) {
                this.sp.node.scaleX = -1
                // this.body.scaleX = -1
            } else {
                this.sp.node.scaleX = 1
                // this.body.scaleX = 1
            }
        }

    }

    callBackTimeOut(id, data) {
    }

    // update (dt) {}
}

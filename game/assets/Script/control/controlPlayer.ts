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
    Collisiontype,
    PlayerGameType,
    playerSpType,
    playerType, ZindexType
} from "../System/Type/enums";
import UtilsNode from "../System/Utils/UtilsNode";
import LoadManage from "../System/Load/LoadManage";
import BaseComponent from "../System/Base/BaseComponent";
import Tools from "../System/Utils/Tools";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlPlayer extends BaseComponent {

    @property(sp.Skeleton)
    sp: sp.Skeleton = null;

    @property(cc.Node)
    body: cc.Node = null;


    @property([cc.SpriteFrame])
    spf: cc.SpriteFrame[] = [];

    @property(cc.Node)
    quan: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    isWarning : boolean = false

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
        Emitter.remove('onOrientation', this.onOrientation, this)
        Emitter.remove('onSp', this.onSp, this)
        Emitter.remove('onGetControlPlayer', this.onGetControlPlayer, this)
        // Emitter.remove('onShowMaskUI', this.onShowMaskUI, this)
    }

    registerEmitter() {
        Emitter.register('onOrientation', this.onOrientation, this)
        Emitter.register('onSp', this.onSp, this)
        Emitter.register('onGetControlPlayer', this.onGetControlPlayer, this)
        // Emitter.register('onShowMaskUI', this.onShowMaskUI, this)
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()





    }


    start() {

    }

    onGetControlPlayer(selfName, self, callback) {
        if (callback) {
            callback(self, this)
        }
    }
    onShowMaskUI(selfName,b){
        if (b) {
            this.quan.active = true
            // UtilsAction.heartbeatRepeatForever(this.mask,1,1.1,1.1,null)
        }else{
            this.quan.active = false
        }
    }
    async setData(data) {
        this.data = data
        ccLog.log("什么样子的", data.type)
        if (data.type == playerType.shizhang) {
            // this.sp.spriteFrame = await LoadManage.getSpriteForName("blind_normal")
            // ccLog.log("好用吗", this.sp.spriteFrame)
            this.sp.skeletonData =await LoadManage.getSkeletonDataForName("blind")
            this.quan.active = true

            // brake   刹车
            // happy  成功
            // hit        撞到陷阱
            // idle      待机
            // run      移动
            // sad      感到彷徨
            // this.myAnimation[MonsterType.WALK] = "run"
            this._setMix("warning", "happy")
            this._setMix("warning", "hit")
            this._setMix("warning", "idle")
            this._setMix("warning", "run")

            this._setMix("happy", "hit")
            this._setMix("happy", "idle")
            this._setMix("happy", "run")

            this._setMix("hit", "idle")
            this._setMix("hit", "run")

            this._setMix("idle", "run")



        } else if (data.type == playerType.canzhang) {
            // wheel

            this.sp.skeletonData =await LoadManage.getSkeletonDataForName("wheel")

            this._setMix("brake", "happy")
            this._setMix("brake", "hit")
            this._setMix("brake", "idle")
            this._setMix("brake", "run")
            this._setMix("brake", "sad")

            this._setMix("happy", "hit")
            this._setMix("happy", "idle")
            this._setMix("happy", "run")
            this._setMix("happy", "sad")

            this._setMix("hit", "idle")
            this._setMix("hit", "run")
            this._setMix("hit", "sad")

            this._setMix("idle", "run")
            this._setMix("idle", "sad")

            this._setMix("run", "sad")

        }
        let Player = this.getComponent("Player")
        if (this.data.type == playerType.shizhang) {
            Player.lunyiTag = false
            Player.shizhangTag = true
            Emitter.fire("onQuan", true)
            Emitter.fire("onShowMaskUI",true)
            // Player.rigidbody = false
        } else if (this.data.type == playerType.canzhang) {
            Player.lunyiTag = true
            Player.shizhangTag = false
            Emitter.fire("onQuan", false)
            Emitter.fire("onShowMaskUI",false)
            // Player.rigidbody = true
        }

        // this.scheduleOnce(()=>{
        //     this.sp.spriteFrame = this.spf[ data.type]
        // },0)


    }

    async onSp(selfName, type) {
        if (this.data.type == playerType.shizhang) {
            let res = null
            // ccLog.log("进来是什么",type)
            switch (type) {
                case playerSpType.shizhang_weixian:
                    res = "warning"
                    this.sp.setAnimation(0, res, true);
                    break
                case playerSpType.shizhang_zhengchang:
                    if (this.isWarning == true) {
                        res = "warning"
                        if (this.sp.animation != res) {
                            this.sp.setAnimation(0, res, true);
                        }
                    }else{
                        res = "idle"
                        this.sp.setAnimation(0, res, false);
                    }

                    break
                case playerSpType.shizhang_che:
                    res = "hit"
                    this.sp.setAnimation(0, res, true);
                    break
                case playerSpType.shizhang_happy:
                    res = "happy"
                    this.sp.setAnimation(0, res, false);
                    break
                case playerSpType.shizhang_move:
                    res = "run"
                    if (this.isWarning == true) {
                        res = "warning"
                    }


                    // ccLog.log("运动",this.sp.animation,"  ",res)
                    if (this.sp.animation != res) {
                        this.sp.setAnimation(0, res, true);
                    }

                    break
                case playerSpType.shizhang_stop:
                    res = "idle"
                    if (this.isWarning == true) {
                        res = "warning"
                    }
                    if (this.sp.animation != res) {
                        this.sp.setAnimation(0, res, true);
                    }

                    break
                case playerSpType.shizhang_brake:
                    res = "brake"
                    if (this.sp.animation != res && this.sp.animation!= "idle") {
                        Emitter.fire("onGetPlayer", this, async (self, player) => {
                            // ccLog.log("走到这里来过没",player.actionTag)
                            if (player.actionTag == false) {

                            }else{
                                if (self.isWarning == true) {
                                    res = "warning"
                                    if (self.sp.animation != res) {
                                        self.sp.setAnimation(0, res, true);
                                    }
                                }else{
                                    if (self.sp.animation != res && self.sp.animation!= "idle") {
                                        // self.sp.setAnimation(0, res, false);
                                        // await self.setTimerOnce(1)
                                        self.sp.setAnimation(0, "idle", true);
                                    }
                                }

                            }
                        })

                    }

                    break
            }


        } else if (this.data.type == playerType.canzhang) {
            let res = null
            // ccLog.log("都进来什么了 ",type)


            // ccLog.log("sp动作 ",type,"  ",res)
            switch (type) {
                case playerSpType.shizhang_zhengchang:
                    res = "idle"
                    // ccLog.log("sp动作 停止",this.sp.animation,"  ",res)
                    this.sp.setAnimation(0, res, false);
                    break
                case playerSpType.shizhang_che:
                    res = "hit"
                    this.sp.setAnimation(0, res, true);
                    break
                case playerSpType.shizhang_happy:
                    res = "happy"
                    this.sp.setAnimation(0, res, false);
                    break
                case playerSpType.shizhang_move:
                    res = "run"
                    // ccLog.log("sp动作 运动",this.sp.animation,"  ",res)
                    if (this.sp.animation != res) {
                        this.sp.setAnimation(0, res, true);
                    }

                    break
                case playerSpType.shizhang_stop:
                    res = "idle"
                    if (this.sp.animation != res) {
                        this.sp.setAnimation(0, res, true);
                    }

                    break
                case playerSpType.shizhang_brake:
                    res = "brake"
                    if (this.sp.animation != res && this.sp.animation!= "idle") {
                        Emitter.fire("onGetPlayer", this, async (self, player) => {
                            // ccLog.log("走到这里来过没",player.actionTag)
                            if (player.actionTag == false) {

                            }else{
                                if (self.sp.animation != res && self.sp.animation!= "idle") {
                                    self.sp.setAnimation(0, res, false);
                                    await self.setTimerOnce(1)
                                    self.sp.setAnimation(0, "idle", true);
                                }

                            }
                        })

                    }

                    break
            }
           /* if (res != null) {
                this.sp.setAnimation(0, res, false);
            }*/
        }
    }


    //朝向
    onOrientation(selfName, moveDir) {
        // Emitter.fire("onGetPlayer", this, async (self, player) => {
        //     // player1 = player
        //     if (moveDir.x < 0) {
        //         player.node.scaleX = -1
        //     } else {
        //         player.node.scaleX = 1
        //     }
        //     // ccLog.log("出去了吗")
        // })
        if (moveDir.x < 0) {
            this.sp.node.scaleX = -1
            this.body.scaleX = -1
        } else {
            this.sp.node.scaleX = 1
            this.body.scaleX = 1
        }
    }

    callBackTimeOut(id, data) {
    }

    update (dt) {

            // Emitter.fire("onGetControlUI", this,  (self, ControlUI) => {
            //     // player1 = player
            //     // player.node.zIndex = ZindexType.zhencghang
            //     // ccLog.log("出去了吗")
            //     // ccLog.log(self, player)
            //     // player.lunyiSpeedNum = Math.round(pro*100)/100
            //     // self.speedSlider.progress = player.lunyiSpeedNum
            //     // ccLog.log("变动的",self.speedSlider.progress)
            //     // self.speedNum.string = self.speedSlider.progress
            //     if (ControlUI.mask.active == true) {
            //         let p = Tools.convetOtherNodeSpace(self.node,ControlUI.mask)
            //         ccLog.log("出去了吗",p)
            //         ControlUI.mask.setPosition(p)
            //     }
            //
            //
            //     // let p  =self.node.convertToNodeSpaceAR(ControlUI.node.getPosition())
            //     // let p  =player.node.getPosition()
            //
            //     // ControlUI.mask.node.setPosition(p)
            // })

    }
}

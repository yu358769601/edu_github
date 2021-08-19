import {SpeedType} from "./Joystick";

const {ccclass, property} = cc._decorator;

import {instance} from "./Joystick";
import ccLog from "../System/Log/ccLog";
import Utils from "../System/Utils/Utils";
import Tools from "../System/Utils/Tools";
import Emitter from "../System/Msg/Emitter";
import {playerSpType, playerType} from "../System/Type/enums";
import BaseComponent from "../System/Base/BaseComponent";
import {SoundType} from "../System/sound/sound";

@ccclass
export default class Player extends BaseComponent {
    @property({
        displayName: "刚体模式",
        tooltip: "不会立即停止",
    })
    rigidbody = false;
    @property({
        displayName: "角度不会跟随变化模式",
        tooltip: "角度不会跟随变化模式",
    })
    angleTag = false;

    @property({
        displayName: "视障困难",
        tooltip: "视障困难",
    })
    shizhangTag = false;
    @property({
        displayName: "轮椅模式",
        tooltip: "轮椅模式",
    })
    lunyiTag = false;
    // from joystick
    @property({
        displayName: "Move Dir",
        tooltip: "移动方向",
    })
    moveDir = cc.v2(0, 1);

    @property({
        displayName: "Speed Type",
        tooltip: "速度级别",
    })
    _speedType: SpeedType = SpeedType.STOP;

    // from self
    @property({
        type: cc.Integer,
        displayName: "Move Speed",
        tooltip: "移动速度",
    })
    _moveSpeed = 0;

    @property({
        type: cc.Integer,
        displayName: "Stop Speed",
        tooltip: "停止时速度",
    })
    stopSpeed = 0;

    @property({
        type: cc.Integer,
        tooltip: "正常速度",
    })
    normalSpeed = 100;

    @property({
        type: cc.Integer,
        tooltip: "最快速度",
    })
    fastSpeed = 200;

    _body: cc.RigidBody;
    camera: cc.Camera;


    actionTag : boolean = false

    //轮椅速度
    lunyiSpeed : number = 1200
    lunyiSpeedNum : number = 0.2
    lunyiSpeedMin : number = 5

    upTag : boolean = false
    protected onDestroy(): void {
        this.removeEmitter()
        instance.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        instance.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    removeEmitter(){
        Emitter.remove('onActionTag', this.onActionTag,this)
        Emitter.remove('onGetPlayer', this.onGetPlayer,this)


    }
    registerEmitter(){
        Emitter.register('onActionTag', this.onActionTag,this)
        Emitter.register('onGetPlayer', this.onGetPlayer,this)
    }





    onLoad() {
        this.removeEmitter()
        this.registerEmitter()


        if (this.rigidbody) {
            // cc.director.getPhysicsManager().enabled = true;

            this._body = this.getComponent(cc.RigidBody);
            ccLog.log("没有东西吗" ," active ",this._body.active)
            this._body.active = true
        }

        instance.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        instance.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        instance.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);

        //注册按钮事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        Emitter.fire("onPlayerMove",this.node)
        Emitter.fire("onSp", playerSpType.shizhang_stop)
        this.upTag = true
    }
    onTouchStart(){

    }
    onGetPlayer(selfName, self, callback) {
        if (callback) {
            // ccLog.log("几次",self)
            callback(self, this)
        }
    }

    onKeyDown(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.d:
                // this.right = true;
                break;

            case cc.macro.KEY.a:
                // this.left = true;
                break;

            case cc.macro.KEY.w:
                // this.up = true;
                break;

            case cc.macro.KEY.s:
                // this.down = true;
                break;

            case cc.macro.KEY.space:
                // this.down = true;
                Emitter.fire("onKeyDownSpace")
                break;
        }
    }

    onKeyUp(event)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.d:
                // this.right = false;
                break;

            case cc.macro.KEY.a:
                // this.left = false;
                break;

            case cc.macro.KEY.w:
                // this.up = false;
                break;

            case cc.macro.KEY.s:
                // this.down = false;
                break;
        }
    }


    onTouchMove(event: cc.Event.EventTouch, data) {
        this._speedType = data.speedType;
        this.moveDir = data.moveDistance;
        // ccLog.log("移动的this.moveDir" , this.moveDir.x,this.moveDir.y)

    }

    onTouchEnd(event: cc.Event.EventTouch, data) {
        this._speedType = data.speedType;
    }
    //如果不允许操作 就不能移动
    onActionTag(selfName,b){
        this.actionTag = b
        if (b == false) {
            if (this.rigidbody) {
                // 设置移动速度
                this._body.linearVelocity = cc.v2(0,0)
            }
        }
    }
    soundNum = 0
    soundNumMax = 2

    /**
     * 移动
     */
    move(dt) {
        // dt = Math.min(dt, 1/60)
        // ccLog.log("dt是啥",dt)
        //现在是不能操作的
        if (this.actionTag !=true) {
            return
        }

        if (!this.angleTag) {
            this.node.angle =
                cc.misc.radiansToDegrees(Math.atan2(this.moveDir.y, this.moveDir.x)) - 90;
        }
        // performance.now()

        if (this.rigidbody) {
            //轮椅模式
            if (this.lunyiTag) {

                // if (this.moveDir.x > 0) {
                //     this.moveDir.x-=dt
                // }
                // if (this.moveDir.y > 0) {
                //     this.moveDir.y-=dt
                // }

                let v =  cc.v2(this.moveDir.x * this.lunyiSpeedFun(dt)+Utils.random(100,1000)*Utils.randomZF(), this.moveDir.y * this.lunyiSpeedFun(dt)+Utils.random(100,1000)*Utils.randomZF())
                // ccLog.log("没有东西吗" ," v ", v,this._body.active)
                // this._body.active = true
                this._body.applyForceToCenter(
                    v,
                    true
                );
                // ccLog.log("移动的this.moveDir 位置懂了妈" , this._body.node.getPosition().x,this._body.node.getPosition().y)
                // ccLog.log("移动的this.moveDir" ," x ", this.moveDir.x ," y ", this.moveDir.y)
                Emitter.fire("onOrientation",this.moveDir)

                if (this.soundNum == 0) {
                    Emitter.fire("onPlaySound",SoundType.SJ_game_04_UI电动轮椅行走)
                }
                this.soundNum+=dt
                if (this.soundNum>=this.soundNumMax) {
                    this.soundNum = 0
                }



                return
            }

            // 获取移动速度
            // let velocity = this._body.linearVelocity;
            // ccLog.log("现在的速度",velocity)
            // 设置移动速度
            this._body.linearVelocity = cc.v2(this.moveDir.x * this.lunyiSpeedFun(dt)/15, this.moveDir.y * this.lunyiSpeedFun(dt)/15)


            // ccLog.log("移动的this.moveDir 位置懂了妈" , this._body.node.getPosition().x,this._body.node.getPosition().y)
            // ccLog.log("移动的this.moveDir" , this.moveDir)
            Emitter.fire("onOrientation",this.moveDir)
        } else {
            const oldPos = cc.v2();
            this.node.getPosition(oldPos);
            // ccLog.log("移动的this.moveDir" , this.moveDir)
            //转向 向左转 向右转
            // if (this.moveDir.x < 0) {
            //     this.node.scaleX = -1
            // }else{
            //     this.node.scaleX = 1
            // }
            Emitter.fire("onOrientation",this.moveDir)
            let newPos = oldPos.add(this.moveDir.mul(this._moveSpeed / 120));
            if (this.shizhangTag) {
                newPos.addSelf(cc.v2(this.lunyiSpeedFun(dt)/1000,this.lunyiSpeedFun(dt)/1000))
            }

            this.node.setPosition(newPos);
            Emitter.fire("onPlayerMove",this.node)
        }
    }
    lunyiSpeedFun(dt){
        // this.lunyiSpeed

        // ccLog.log("帧率呢",cc.game.getFrameRate())
        let sum = this.lunyiSpeed*this.lunyiSpeedMin*this.lunyiSpeedNum*dt*2*cc.game.getFrameRate()
        // ccLog.log("参数是呢",sum,"是不是他有问题",dt,"帧率",cc.game.getFrameRate(),"this.lunyiSpeed",this.lunyiSpeed,"this.lunyiSpeedMin",this.lunyiSpeedMin,"this.lunyiSpeedNum",this.lunyiSpeedNum)

        // ccLog.log("有没有",sum)
        return sum
    }

    update(dt) {
       if (this.upTag) {
           Emitter.fire("onPlayerMove",this.node)
           switch (this._speedType) {
               case SpeedType.STOP:
                   this._moveSpeed = this.stopSpeed;
                   break;
               case SpeedType.NORMAL:
                   this._moveSpeed = this.normalSpeed;
                   break;
               case SpeedType.FAST:
                   this._moveSpeed = this.fastSpeed;
                   break;
               default:
                   break;
           }
           if (this._speedType !== SpeedType.STOP) {
               if (this.actionTag == true) {
                   Emitter.fire("onSp", playerSpType.shizhang_move)
               }

               this.move(dt);
               // ccLog.log("什么呢速度",this._body.linearVelocity.x,this._body.linearVelocity.y)
               // this.updateCameraPosition(this.node.getPosition());
           }else{
               this.soundNum = 0
               if (this.rigidbody) {
                   if (!this.lunyiTag) {
                       // 设置移动速度
                       this._body.linearVelocity = cc.v2(0,0)

                   }

               }


               if (this.actionTag == true) {
                   // ccLog.log("这里有问题")
                   Emitter.fire("onSp", playerSpType.shizhang_brake)
               }

               // await this.setTimerOnce(1)
               // Emitter.fire("onSp", playerSpType.shizhang_stop)
           }


       }


        // if(this.right)
        // {
        //     this.node.scaleX = 1;
        //     this.node.x += this.speed*dt;
        // }
        // else if(this.left)
        // {
        //     this.node.scaleX = -1;
        //     this.node.x-=this.speed*dt;
        // }
        // if(this.up)
        // {
        //     this.node.y+=this.speed*dt;
        // }
        // else if(this.down)
        // {
        //     this.node.y-=this.speed*dt
        // }


    }

    callBackTimeOut(id, data) {
    }


}

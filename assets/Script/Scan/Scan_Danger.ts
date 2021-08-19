// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {ActivityType, Collisiontype} from "../System/Type/enums";
import PhysicsPolygonCollider = cc.PhysicsPolygonCollider;
import {ControlNPCMoveType} from "../control/controlNPCMove";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Scan_Danger extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';
    @property({type: cc.Enum(ControlNPCMoveType)})    // call cc.Enum
    public controlNPCMoveType = ControlNPCMoveType.男的;
    // LIFE-CYCLE CALLBACKS:
    @property({type: cc.Enum(Collisiontype)})    // call cc.Enum
    public collisiontype = Collisiontype.meishi;
    // onLoad () {}

    start () {

    }
    onCollisionEnter(other,self){              //碰撞则播放爆炸动画
       // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        Emitter.fire("onEnterDanger",this.collisiontype)
        if (this.controlNPCMoveType == ControlNPCMoveType.垃圾桶 ) {
            Emitter.fire("onPlaySound",SoundType.SJ_game_11_撞到垃圾桶)
        }else if (this.controlNPCMoveType == ControlNPCMoveType.路障) {
            Emitter.fire("onPlaySound",SoundType.SJ_game_09_撞到路障声音)
        }
        //只触发一次
        // switch (this.collisiontype) {
        //     case Collisiontype.lajitong:
        //     case Collisiontype.shigong:
        //     case Collisiontype.shuinidi:
        //     case Collisiontype.shui:
        //         this.node.destroy()
        //         break
        // }
        switch (this.collisiontype) {
            case Collisiontype.lajitong:
            case Collisiontype.shigong:
            case Collisiontype.shuinidi:
            case Collisiontype.shui:
            case Collisiontype.活動現場施工:
            case Collisiontype.活動現場施工1:
                // this.node.destroy()
                this.getComponent(PhysicsPolygonCollider).enabled = true
                break
        }
        switch (this.collisiontype) {
            case Collisiontype.等車的人:
            case Collisiontype.水泥地让路:
            case Collisiontype.商场让路:
            case Collisiontype.tishihonglvdeng:
            case Collisiontype.清洁工:
            case Collisiontype.天桥电梯排队:
            case Collisiontype.最后楼梯阻挡:
                this.node.destroy()
                break
        }


    }
    onCollisionExit(other,self){              //碰撞则播放爆炸动画
       // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        Emitter.fire("onExitDanger")
    }
    onCollisionStay(other,self){
        Emitter.fire("onStayDanger",this.collisiontype)
    }



    // update (dt) {}
}

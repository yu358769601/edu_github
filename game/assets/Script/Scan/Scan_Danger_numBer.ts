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
export default class Scan_Danger_numBer extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property({type: cc.Enum(Collisiontype)})    // call cc.Enum
    public collisiontype = Collisiontype.meishi;


    @property({type: cc.Enum(ControlNPCMoveType)})    // call cc.Enum
    public controlNPCMoveType = ControlNPCMoveType.男的;

    // onLoad () {}
    @property(cc.Integer)
    npcNum: number = 0;
    start () {

    }
    onCollisionEnter(other,self){              //碰撞则播放爆炸动画
       // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        Emitter.fire("onEnterDangerMove",this.collisiontype,this.npcNum)

        if (this.controlNPCMoveType == ControlNPCMoveType.男的 ) {
            cc.log("撞人了",this.controlNPCMoveType)
            Emitter.fire("onPlaySound",SoundType.SJ_game_10_撞到男人)
        }else if (this.controlNPCMoveType == ControlNPCMoveType.女的 ) {
            cc.log("撞人了",this.controlNPCMoveType)
            Emitter.fire("onPlaySound",SoundType.SJ_game_10_撞到女人)
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
        // switch (this.collisiontype) {
        //     case Collisiontype.lajitong:
        //     case Collisiontype.shigong:
        //     case Collisiontype.shuinidi:
        //     case Collisiontype.shui:
        //     case Collisiontype.活動現場施工:
        //     case Collisiontype.活動現場施工1:
        //         // this.node.destroy()
        //         this.getComponent(PhysicsPolygonCollider).enabled = true
        //         break
        // }
        // switch (this.collisiontype) {
        //     case Collisiontype.tishihonglvdeng:
        //         this.node.destroy()
        //         break
        // }


    }
    onCollisionExit(other,self){              //碰撞则播放爆炸动画
       // ccLog.log("碰我的单位是 我现在是危险",other ,"我是谁 ",self)
        Emitter.fire("onExitDanger")
    }
    // update (dt) {}
}

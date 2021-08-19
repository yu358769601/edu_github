// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {Collisiontype, ElevatorType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import UtilsAction from "../System/Utils/UtilsAction";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Elevator extends cc.Component {

    @property(cc.Node)
    left: cc.Node = null;

    @property(cc.Node)
    leftMask: cc.Node = null;

    @property(cc.Node)
    right: cc.Node = null;

    @property(cc.Node)
    rightMask: cc.Node = null;

    @property({type: cc.Enum(ElevatorType)})    // call cc.Enum
    public elevatorType = ElevatorType.家门口电梯;

    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onElevatorOpen', this.onElevatorOpen, this)
        Emitter.remove('onElevatorClose', this.onElevatorClose, this)
        Emitter.remove('onElevatorCloseNow', this.onElevatorCloseNow, this)
    }

    registerEmitter() {
        Emitter.register('onElevatorOpen', this.onElevatorOpen, this)
        Emitter.register('onElevatorClose', this.onElevatorClose, this)
        Emitter.register('onElevatorCloseNow', this.onElevatorCloseNow, this)
    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()
        // this.playerGameType = PlayerGameType.wudi
    }
    // Emitter.fire("onElevatorOpen",ElevatorType.家门口电梯)
    onElevatorOpen(selfName,type){

        if (type == this.elevatorType) {
            Emitter.fire("onPlaySound",SoundType.SJ_game_04_UI电梯到叮的声音)
            Emitter.fire("onPlaySound",SoundType.SJ_game_04_UI电梯门开启)
            UtilsAction.moveTo(this.left,1,-this.leftMask.width,0,null)
            UtilsAction.moveTo(this.right,1,this.rightMask.width,0,null)
        }
    }
    // Emitter.fire("onElevatorClose",ElevatorType.家门口电梯)
    async onElevatorClose(selfName,type){
        if (type == this.elevatorType) {
            UtilsAction.moveTo(this.left,1,0,0,null)
           await UtilsAction.moveTo(this.right,1,0,0,null)
            Emitter.fire("onPlaySound",SoundType.SJ_game_04_UI电梯门关闭)
        }
    }
    onElevatorCloseNow(selfName,type){
        if (type == this.elevatorType) {
            UtilsAction.moveTo(this.left,0.01,0,0,null)
            UtilsAction.moveTo(this.right,0.01,0,0,null)

        }
    }
    start () {

    }

    // update (dt) {}
}

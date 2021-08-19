// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlFollow extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    time : number = 0
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onEnterFollowStaff', this.onEnterFollowStaff,this)
    }
    registerEmitter(){
        Emitter.register('onEnterFollowStaff', this.onEnterFollowStaff,this)
    }



    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    start () {

    }
    //跟随店员
    onEnterFollowStaff(selfName,data){
        this.time = data.time
        ccLog.log("动画 开始 ")
    }
    update (dt) {
        if ( this.time  < 0) {
            this.time = 0
            ccLog.log("动画 暂停 ")
            Emitter.fire('onFollowStaffAnimPause')
        }
        if ( this.time  > 0) {
            this.time-=dt
        }
    }
}

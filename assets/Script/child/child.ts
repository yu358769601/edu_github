// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import UtilsAction from "../System/Utils/UtilsAction";
import {ZindexType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Child extends cc.Component {

    @property(cc.Node)
    nodeEnd: cc.Node = null;

    @property(sp.Skeleton)
    sp: sp.Skeleton = null;

    clickPOPType

    @property(cc.Node)
    kuang: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    onDestroy(): void {
        ccLog.log("清除")
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onEnterChild', this.onEnterChild,this)
    }
    registerEmitter(){
        Emitter.register('onEnterChild', this.onEnterChild,this)

    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        // this.sp = this.getComponent(sp.Skeleton)
    }
    onEnterChild(){

        this.kuang.getComponent(cc.PhysicsPolygonCollider).enabled = true
        // this.kuang.getComponent(cc.PolygonCollider).enabled = false
        this.node.getComponent("myZIndex").setZindex(ZindexType.jin)
        this.sp.timeScale = 0.5
        this.sp.setAnimation(0, "way", true);
        ccLog.log("我的 位置 xy",this.node.getPosition().x,this.node.getPosition().y)
        ccLog.log("目的地 位置 xy",this.nodeEnd.getPosition().x,this.nodeEnd.getPosition().y)
        UtilsAction.moveTo(this.sp.node,1.5,this.nodeEnd.getPosition().x,this.nodeEnd.getPosition().y,()=>{

        })
        // UtilsAction.moveTo(this.node,1.5,this.nodeEnd.getPosition().x,this.nodeEnd.getPosition().y,()=>{
        //
        // })
        this.sp.setCompleteListener(async(track)=>{
            // ccLog.log("Skeleton 有东西 监听结束 ",track.animation.name)
            if (track.animation.name == "way") {
                this.sp.timeScale = 1
                this.sp.setAnimation(0, "idle", true);
            }
        })
    }



    start () {

    }

    // update (dt) {}
}

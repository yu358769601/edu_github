// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Trafficlights extends cc.Component {

    @property(cc.Node)
    red: cc.Node = null;
    @property(cc.Node)
    green: cc.Node = null;
    @property(cc.Node)
    body: cc.Node = null;

    index : number = 0
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    // soundTimeMax: number = 1
    // soundTimeMin: number = 0
    // myTime : number = 0
    // myTimeTag : boolean = false
    // run : boolean = false
    // onLoad () {}
    data : any = null
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onShowGreenLight', this.onShowGreenLight,this)
        Emitter.remove('onShowRedLight', this.onShowRedLight,this)
        Emitter.remove('onToSoundLightSound', this.onToSoundLightSound,this)
    }
    registerEmitter(){
        Emitter.register('onShowGreenLight', this.onShowGreenLight,this)
        Emitter.register('onShowRedLight', this.onShowRedLight,this)
        Emitter.register('onToSoundLightSound', this.onToSoundLightSound,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()


        this.onShowGreenLight()
    }
    onToSoundLightSound(selfName,run){
        if (run == true) {
            // ccLog.log("播放 绿灯声音")
            Emitter.fire("onGreenLightSound",this)

        }else{
            // ccLog.log("播放 红灯声音")
            Emitter.fire("onRedLightSound",this)
        }
    }

    onShowRedLight(){
        this.red.active = false
        this.green.active = true
    }
    onShowGreenLight(){
        this.red.active = true
        this.green.active = false
    }

    // index: number = 0
    start () {

    }
    setData(data){
        // noRunTime : 10,
        //     noRunTipsTime : 6,
        //     goRun : 10,
        //     goRunTipsTime : 6,
        this.data = data
        // this.run = false
        // this.myTimeTag = true

        //
        // ccLog.log("会走这里的是吧")
        this.body.getComponent(cc.RigidBody).syncPosition(true);
    }
    setIndex(index){
        // noRunTime : 10,
        //     noRunTipsTime : 6,
        //     goRun : 10,
        //     goRunTipsTime : 6,
    this.index = index
    }



    // toSound(dt){
    //     this.soundTimeMin+=dt
    //     if (this.soundTimeMin>=this.soundTimeMax) {
    //         this.soundTimeMin = 0
    //         if (this.run == true) {
    //             // ccLog.log("播放 绿灯声音")
    //             Emitter.fire("onGreenLightSound",this,this.index)
    //         }else{
    //             // ccLog.log("播放 红灯声音")
    //             Emitter.fire("onRedLightSound",this,this.index)
    //         }
    //
    //     }
    // }




    //
    // update (dt) {
    //     if (this.data == null) {
    //         return
    //     }
    //     if (this.myTimeTag) {
    //         //现在开始不让通行
    //         if (this.run == false) {
    //             this.myTime+=dt
    //             this.toSound(dt)
    //             this.red.active = true
    //             this.green.active = false
    //
    //             //红灯提示音
    //             if (this.myTime >= this.data.noRunTime) {
    //                 this.myTimeTag = false
    //                 this.myTime = 0
    //                 this.soundTimeMin  = 0
    //                 this.run = true
    //                 this.myTimeTag = true
    //                 //绿灯
    //                 // Emitter.fire("onGoCar")
    //             }
    //         }else{
    //             this.myTime+=dt
    //             this.toSound(dt)
    //             this.red.active = false
    //             this.green.active = true
    //             // Emitter.fire("onGreenLight",this,this.index)
    //             //绿灯提示音
    //             if (this.myTime >= this.data.goRun) {
    //                 this.myTimeTag = false
    //                 this.myTime = 0
    //                 this.soundTimeMin  = 0
    //                 this.run = false
    //                 this.myTimeTag = true
    //                 //红灯
    //                 Emitter.fire("onGoCar")
    //             }
    //         }
    //     }
    //
    //
    // }
}

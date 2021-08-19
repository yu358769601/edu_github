// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlTrafficlights extends cc.Component {
    //红绿灯控制器
    //红绿灯 位置
    @property([cc.Node])
    TrafficlightsPs: cc.Node[] = [];

    rootMap: cc.Node = null;

    soundTimeMax: number = 1
    soundTimeMin: number = 0
    myTime : number = 0
    myTimeTag : boolean = false
    run : boolean = false
    data : any = null
    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onAddTrafficlights', this.onAddTrafficlights,this)
        Emitter.remove('onGetControlTrafficlights', this.onGetControlTrafficlights,this)
        Emitter.remove('onSetShowGreenLight', this.onSetShowGreenLight,this)
        Emitter.remove('onSetonShowRedLight', this.onSetonShowRedLight,this)
    }
    registerEmitter(){
        Emitter.register('onAddTrafficlights', this.onAddTrafficlights,this)
        Emitter.register('onGetControlTrafficlights', this.onGetControlTrafficlights,this)
        Emitter.register('onSetShowGreenLight', this.onSetShowGreenLight,this)
        Emitter.register('onSetonShowRedLight', this.onSetonShowRedLight,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

    }
    //创建 红绿灯
    async onAddTrafficlights(selfName,data){
        this.data = data
        Emitter.fire("onGetPre_shizhang_1Map",this,async(self,map)=>{
            self.rootMap = map

            for (let i = 0; i <self.TrafficlightsPs.length ; i++) {
                let TrafficlightsP = self.TrafficlightsPs[i]
                let Trafficlights =  await UtilsNode.getNode("Trafficlights",self.rootMap)
                Trafficlights.setPosition(TrafficlightsP.getPosition())
                Trafficlights.getComponent("Trafficlights").setData(data)
                Trafficlights.getComponent("Trafficlights").setIndex(i)

            }

            //暂时不开启
            // self.run = true
            // self.myTimeTag = true


            // Emitter.fire("onGoCar")
        })


    }
    toSound(dt){
        this.soundTimeMin+=dt
        if (this.soundTimeMin>=this.soundTimeMax) {
            this.soundTimeMin = 0

            Emitter.fire("onToSoundLightSound",this.run )


        }
    }

    onGetControlTrafficlights(selfName, self, callback) {
        if (callback) {
            callback(self, this)
        }
    }


    start () {

    }

    onSetShowGreenLight(){
        Emitter.fire("onShowRedLight")
    }
    onSetonShowRedLight(){
        Emitter.fire("onShowGreenLight")
        Emitter.fire("onGoCar")
    }


    update (dt) {
        // if (this.data == null) {
        //     return
        // }
        // if (this.myTimeTag) {
        //     //现在开始不让通行
        //     if (this.run == false) {
        //         this.myTime+=dt
        //         this.toSound(dt)
        //
        //         Emitter.fire("onShowGreenLight")
        //         //红灯提示音
        //         if (this.myTime >= this.data.noRunTime) {
        //             this.myTimeTag = false
        //             this.myTime = 0
        //             this.soundTimeMin  = 0
        //             this.run = true
        //             this.myTimeTag = true
        //             //绿灯
        //
        //         }
        //     }else{
        //         this.myTime+=dt
        //         this.toSound(dt)
        //         Emitter.fire("onShowRedLight")
        //
        //         // Emitter.fire("onGreenLight",this,this.index)
        //         //绿灯提示音
        //         if (this.myTime >= this.data.goRun) {
        //             this.myTimeTag = false
        //             this.myTime = 0
        //             this.soundTimeMin  = 0
        //             this.run = false
        //             this.myTimeTag = true
        //
        //             Emitter.fire("onGoCar")
        //         }
        //     }
        // }


    }
}

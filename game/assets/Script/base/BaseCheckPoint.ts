// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

interface subclass {
    //子类调用的方法
    /**
     * 子類在父類中註冊自己的方法返回值 this
     */
    subclassCall() : any
}


@ccclass
export  default abstract class  BaseCheckPoint extends cc.Component implements subclass{
    subclass : any = null
    // onLoad () {}

    setSubclassCall(subclass){
        this.subclass = subclass
    }
     onDestroy(): void {
        ccLog.log("清除")
        this.removeEmitter()
        this.removeBaseEmitter()
    }
    removeBaseEmitter(){
        Emitter.remove('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)
    }
    registerBaseEmitter(){
        Emitter.register('onEnterCheckPointEnd', this.onEnterCheckPointEnd,this)

    }
     onLoad () {
        this.removeEmitter()
        this.removeBaseEmitter()
        this.registerEmitter()
        this.registerBaseEmitter()

         this.subclass = this.subclassCall()

    }
    abstract removeEmitter()
    abstract registerEmitter()

    start () {

    }
    async onEnterCheckPointEnd(selfName,PreName,otherData){


        // if (this.EnterCheckPointEnd_1 == false) {
        //     this.EnterCheckPointEnd_1 = true
        //
        // }
        ccLog.log("过关")

        Emitter.fire("onGetGameActivity", this,  async(self, node) => {
            // ccLog.log("第一关过关 换关",node)
            // this.scheduleOnce(async()=>{
            //
            // },0)
            Emitter.fire("onTransitions",true,async()=>{
                self.node.destroy()
                let Pre_shizhang_1 = await UtilsNode.getNode(PreName,node.RootNode)
                // await self.setTimerOnce(0.1)
                // node.data.type =2
                await Pre_shizhang_1.getComponent(PreName).setData(node.data,otherData)
                // Emitter.fire("onShowMaskUI",true)
                ccLog.log("过关之後呢")

                // await this.setTimerOnce(1)
                Emitter.fire("onTransitions",false,async()=>{


                })

            })




        })

    }
    public setTimerOnce(d){


        return new Promise <any>((resolve, reject) => {
            this.scheduleOnce(()=>{
                resolve()
            },d)
        })
    }
    public Transitions(timer,callback){
        Emitter.fire("onTransitions",true,async()=>{

            await this.setTimerOnce(timer)
            Emitter.fire("onTransitions",false,async()=>{
                if (callback) {
                    callback()
                }

            })

        })
    }
    public Transitionscall(timer,callback1,callback2){
        Emitter.fire("onTransitions",true,async()=>{

            await this.setTimerOnce(timer)
            if (callback1) {
                callback1()
            }
            Emitter.fire("onTransitions",false,async()=>{
                if (callback2) {
                    callback2()
                }

            })

        })
    }

    abstract subclassCall(): any;

    // update (dt) {}
}

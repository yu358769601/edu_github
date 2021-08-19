// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Activity from "../System/Ui/Activity";
import UtilsNode from "../System/Utils/UtilsNode";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import Vec2 = cc.Vec2;
import {MapName, playerType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameActivity extends Activity{

    @property(cc.Node)
    RootNode: cc.Node = null;
    @property(cc.Node)
    quan: cc.Node = null;

    @property(cc.Camera)
    gameCamera: cc.Camera = null;
    //
    // @property
    // text: string = 'hello';
    data : any = {}
    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onQuit', this.onQuit,this)
        Emitter.remove('onGetGameCamera', this.onGetGameCamera,this)
        Emitter.remove('onGetGameActivity', this.onGetGameActivity,this)
        Emitter.remove('onQuan', this.onQuan,this)
    }
    registerEmitter(){
        Emitter.register('onQuit', this.onQuit,this)
        Emitter.register('onGetGameCamera', this.onGetGameCamera,this)
        Emitter.register('onGetGameActivity', this.onGetGameActivity,this)
        Emitter.register('onQuan', this.onQuan,this)
    }
    onQuan(selfName,b){
        this.quan.active = b
    }


    onGetGameCamera(selfName,self,callback){
        if (callback) {
            callback(self,this.gameCamera)
        }
    }
    //得到 游戏视窗
    onGetGameActivity(selfName,self,callback){
        if (callback) {
            callback(self,this)
        }
    }
    async onLoad () {
        this.removeEmitter()
        this.registerEmitter()


        // Pre_shizhang_1.getComponent("Pre_shizhang_1").setCamera(this.mainCamera)
    }
// {type : playerType.shizhang}
//     setData(){
//
//     }
    async onCreate(data){
        ccLog.log("创建的时候调用的",this.node.name,"前个页面 数据",data)
        this.data = data
        // await this.setTimerOnce(0.1)
        // Emitter.fire("onTransitions",true,async()=>{
        //
        // })
        let Pre_shizhang_1 = await UtilsNode.getNode(data.mapName,this.RootNode)
        Pre_shizhang_1.getComponent(data.mapName).setData(this.data)

        if (data.mapName == "Pre_shizhang_0") {

        }
        
        
        // Emitter.fire("onTransitions",true,async()=>{
        //
        //     // await this.setTimerOnce(timer)
        //     Emitter.fire("onTransitions",false,async()=>{
        //
        //     })
        //
        // })


    }
    onQuit(){
        ccLog.log("收到了 并且关闭了")
        this.finsh()
        Emitter.fire("onGetCamera",this,(self,mainCamera)=>{
            mainCamera.node.setPosition(new Vec2(0,0))

        })
        Emitter.fire("onInitStartGame")
    }
    start () {

    }

    // update (dt) {}
}

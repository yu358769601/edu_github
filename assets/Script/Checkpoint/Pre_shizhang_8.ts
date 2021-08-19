// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsNode from "../System/Utils/UtilsNode";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {playerType} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_6 extends cc.Component {

    @property(cc.Node)
    startPlayerP: cc.Node = null;
    // @property(cc.Node)
    // Pre_shizhang_1bg: cc.Node = null;
    // @property(cc.Node)
    // xiaohaiweizhi: cc.Node = null;
    // @property(cc.Node)
    // shuiweizhi: cc.Node = null;
    // @property(cc.Node)
    // luzhangweizhi: cc.Node = null;



    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null

    data : any = {}
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onEnterxiaohaiAfter', this.onEnterxiaohaiAfter,this)
        Emitter.remove('onEntershuiAfter', this.onEntershuiAfter,this)
        Emitter.remove('onEnterluzhangAfter', this.onEnterluzhangAfter,this)
        // Emitter.remove('onEnterCheckPointEnd_1', this.onEnterCheckPointEnd_1,this)
    }
    registerEmitter(){
        Emitter.register('onEnterxiaohaiAfter', this.onEnterxiaohaiAfter,this)
        Emitter.register('onEntershuiAfter', this.onEntershuiAfter,this)
        Emitter.register('onEnterluzhangAfter', this.onEnterluzhangAfter,this)
        // Emitter.register('onEnterCheckPointEnd_1', this.onEnterCheckPointEnd_1,this)
    }
    async onLoad () {
        // this.removeEmitter()
        // this.registerEmitter()


        //开始游戏的定位
        Emitter.fire("onGetCamera",this,(self,mainCamera)=>{
          mainCamera.node.setPosition(self.startPlayerP.getPosition())

        })


        // ccLog.log("有没有啊小老弟",this.player)


    }
    init(){

        // Emitter.fire("onAddTrafficlights",{
        //     noRunTime : 10,
        //     noRunTipsTime : 4,
        //     goRun : 10,
        //     goRunTipsTime : 4,
        // })

    }
    // onEnterCheckPointEnd_1(){
    //     ccLog.log("第一关过关")
    //
    //     this.node.destroy()
    //     Emitter.fire("onGetGameActivity", this, async (self, node) => {
    //         // ccLog.log("第一关过关 换关",node)
    //       let Pre_shizhang_2 = await UtilsNode.getNode("Pre_shizhang_2",node.RootNode)
    //         Pre_shizhang_2.getComponent("Pre_shizhang_2").setData(node.data)
    //
    //
    //     })
    // }

    //得到第一个关卡
    onGetPre_shizhang_2Map(selfName,self,callback){
            if (callback) {
                callback(self,this.node)
            }
    }

    async setData(data){
        this.data = data
        ccLog.log("第二个页面过来的数据",data)

        // player
        let player = this.player = await UtilsNode.getNode("player",this.node)
        // ccLog.log("有没有啊小老弟",player)
        player.setPosition( this.startPlayerP.getPosition())
        // this.startPlayerP.setPosition()
        player.getComponent("controlPlayer").setData(this.data)
        // player.zIndex = 99
    }

    start () {
        this.init()
        Emitter.fire("onOpenGoTips")
        // Emitter.fire("onCountDownSuspend",true)
        Emitter.fire("onCountDownShow",{xuniTime : 600,shijiTime:200})
    }
    // onEnterxiaohaiAfter(selfName){
    //     UtilsAction.moveTo(this.player,1,this.xiaohaiweizhi.getPosition().x,this.xiaohaiweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.xiaohaiweizhi.getPosition())
    // }
    // onEntershuiAfter(selfName){
    //     UtilsAction.moveTo(this.player,1,this.shuiweizhi.getPosition().x,this.shuiweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.shuiweizhi.getPosition())
    // }
    // onEnterluzhangAfter(selfName){
    //     UtilsAction.moveTo(this.player,1,this.luzhangweizhi.getPosition().x,this.luzhangweizhi.getPosition().y,null)
    //     // this.player.setPosition(  this.luzhangweizhi.getPosition())
    // }
    // update (dt) {}
}

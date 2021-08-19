// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import {MapName, playerSpType, playerType} from "../System/Type/enums";
import UIActivity from "../System/Ui/UIActivity";
import ccLog from "../System/Log/ccLog";
import Model from "../control/model";
import StaticData from "../System/data/StaticData";
import BaseComponent from "../System/Base/BaseComponent";
import UtilsNode from "../System/Utils/UtilsNode";
import Gongrong, {gongrongType} from "../item/gongrong";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameController extends BaseComponent {

    @property(cc.Node)
    user1: cc.Node = null;

    @property(cc.Node)
    user2: cc.Node = null;
    @property([cc.Node])
    mangrens: cc.Node [] = [];
    @property([cc.Node])
    lunyis: cc.Node [] = [];
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    kaishi: cc.Node = null;
    @property(cc.Node)
    xuanren: cc.Node = null;
    // onLoad () {}
    @property(cc.Node)
    testMap: cc.Node = null;

    @property(cc.Node)
    s1btn: cc.Node = null;
    @property(cc.Node)
    s2btn: cc.Node = null;
    @property(cc.Node)
    s1btnTips: cc.Node = null;
    @property(cc.Node)
    s2btnTips: cc.Node = null;
    @property(cc.Node)
    caozuo: cc.Node = null;
    data : any = null


    count : number = 0

    @property(Model)
    player1: Model = null;
    @property(Model)
    player2: Model = null;


    clickTimeMin : number = 0

    clickTimeMax : number = 1
    clickTimeTag : boolean = false

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onInitStartGame', this.onInitStartGame,this)
    }
    registerEmitter(){
        Emitter.register('onInitStartGame', this.onInitStartGame,this)
    }

    onInitStartGame(){
        this.xuanren.active = false
        this.s1btn.active = false
        this.s2btn.active = false
        this.s1btnTips.active = false
        this.s2btnTips.active = false
        // this.user1.active = true
        this.user2.active = true
        this.lunyis[0].active = false
        this.lunyis[1].active = false
        this.lunyis[2].active = false
        this.lunyis[3].active = false

        this.mangrens[0].active = false
        this.mangrens[1].active = false
        this.mangrens[2].active = false
        Emitter.fire("onMusicSwitch",SoundType.標題到教程結束,0.3)
        // let data = {
        //     self : this,
        //     otherData : "发光"
        // }
        // Emitter.fire("onGetControlSound",data,(selfData,self)=>{
        //     self.playSound()
        // })
        StaticData.getInstance().addData("危险次数",null)
    }


    start () {
        Emitter.fire("onMusicSwitch",SoundType.標題到教程結束,0.3)
        let data = {
            self : this,
            otherData : "发光"
        }
        Emitter.fire("onGetControlSound",data,(selfData,self)=>{
            self.playSound()
        })

        this.kaishi.on(cc.Node.EventType.TOUCH_START,()=>{
            // Emitter.fire('onTipsShow', {txt: "建设中 很快见面"})
            // let data = {
            //     type : playerType.shizhang
            // }
            // UIActivity.startToActivity("SelectCheckPointActivity",data)
            Emitter.fire("onPlaySound",SoundType.SJ_game_01_UI点击START)
            this.xuanren.active = true
        },this)



        this.user1.on(cc.Node.EventType.TOUCH_START,async ()=>{
            let data = {
                self : this,
                otherData : "发光"
            }
            Emitter.fire("onGetControlSound",data,(selfData,self)=>{
                self.stopSound()
            })
        this.s1btn.active = true
        this.s2btn.active = false

            this.s1btnTips.active = true
            this.s1btnTips.getComponent("dialogAn").onAn()
            this.s2btnTips.active = false

            this.player1.onPlay(playerSpType.shizhang_happy)
            this.player2.onPlay(playerSpType.shizhang_zhengchang)

        },this)
        this.user2.on(cc.Node.EventType.TOUCH_START,()=>{
            // Emitter.fire("onSelectRole",   {type : playerType.canzhang})
            // Emitter.fire('onTipsShow', {txt: "建设中 很快见面"})
            // Emitter.fire("onSelectRole",   {type : playerType.canzhang,mapName : "Pre_shizhang_1"})
            this.s2btn.active = true
            this.s1btn.active = false

            this.s1btnTips.active = false

            this.s2btnTips.active = true
            this.s2btnTips.getComponent("dialogAn").onAn()

            this.player1.onPlay(playerSpType.shizhang_zhengchang)
            this.player2.onPlay(playerSpType.shizhang_happy)

        },this)

        this.lunyis[0].on(cc.Node.EventType.TOUCH_START,()=>{

            if ( this.setClickTimeTag(true) == true) {
                this.lunyis[0].active = false
                this.lunyis[1].active = true
                this.lunyis[1].getComponent("dialogAn").onAn()
            }

            //测试
            // Emitter.fire("onSelectRole",   {type : this.data.type,mapName : "Pre_shizhang_7"})
        },this)
        this.lunyis[1].on(cc.Node.EventType.TOUCH_START,()=>{
            if ( this.setClickTimeTag(true) == true){
                this.lunyis[1].active = false
                // UIActivity.startToActivity("SelectCheckPointActivity",this.data)
                this.lunyis[2].active = true
                this.lunyis[2].getComponent("dialogAn").onAn()
            }


        },this)
        this.lunyis[2].on(cc.Node.EventType.TOUCH_START,()=>{
            if ( this.setClickTimeTag(true) == true){
                this.lunyis[2].active = false
                this.lunyis[3].active = true
                this.lunyis[3].getComponent("dialogAn").onAn()
                // UIActivity.startToActivity("SelectCheckPointActivity",this.data)

            }
            // Emitter.fire("onGetGameActivity", this,  async(self, node) => {
            //     // ccLog.log("第一关过关 换关",node)
            //     // this.scheduleOnce(async()=>{
            //     //
            //     // },0)
            //     Emitter.fire("onTransitions",true,async()=>{
            //
            //         // await this.setTimerOnce(1)
            //         Emitter.fire("onTransitions",false,async()=>{
            //
            //
            //         })
            //
            //     })
            //
            //
            //
            //
            // })
            // this.player1.onPlay(playerSpType.shizhang_zhengchang)
            // this.player2.onPlay(playerSpType.shizhang_zhengchang)
            //
            //
            // Gongrong.getInstance().addData(null)
            //
            // //选关
            // Emitter.fire("onSelectRole",   {type : this.data.type,mapName : "Pre_shizhang_7"})

            // Emitter.fire("onMusicSwitch",SoundType.標題到教程結束,0.3)
            // let data = {
            //     self : this,
            //     otherData : "发光"
            // }
            // Emitter.fire("onGetControlSound",data,(selfData,self)=>{
            //     self.stopSound()
            // })

        },this)

        this.lunyis[3].on(cc.Node.EventType.TOUCH_START,()=>{
            if ( this.setClickTimeTag(true) == true){
                this.lunyis[3].active = false
                // UIActivity.startToActivity("SelectCheckPointActivity",this.data)
                this.player1.onPlay(playerSpType.shizhang_zhengchang)
                this.player2.onPlay(playerSpType.shizhang_zhengchang)
            }
            // Emitter.fire("onGetGameActivity", this,  async(self, node) => {
            //     // ccLog.log("第一关过关 换关",node)
            //     // this.scheduleOnce(async()=>{
            //     //
            //     // },0)
            //     Emitter.fire("onTransitions",true,async()=>{
            //
            //         // await this.setTimerOnce(1)
            //         Emitter.fire("onTransitions",false,async()=>{
            //
            //
            //         })
            //
            //     })
            //
            //
            //
            //
            // })
            this.player1.onPlay(playerSpType.shizhang_zhengchang)
            this.player2.onPlay(playerSpType.shizhang_zhengchang)


            Gongrong.getInstance().addData(null)

            //选关
            Emitter.fire("onSelectRole",   {type : this.data.type,mapName : "Pre_shizhang_0"})

            // Emitter.fire("onMusicSwitch",SoundType.標題到教程結束,0.3)
            // let data = {
            //     self : this,
            //     otherData : "发光"
            // }
            // Emitter.fire("onGetControlSound",data,(selfData,self)=>{
            //     self.stopSound()
            // })

        },this)



        this.mangrens[0].on(cc.Node.EventType.TOUCH_START,()=>{
            if ( this.setClickTimeTag(true) == true){
                this.mangrens[0].active = false
                this.mangrens[1].active = true
                this.mangrens[1].getComponent("dialogAn").onAn()
            }

            //测试
            // Emitter.fire("onSelectRole",   {type : this.data.type,mapName : "Pre_shizhang_7"})
        },this)
        // this.mangrens[1].on(cc.Node.EventType.TOUCH_START,()=>{
        //     this.mangrens[1].active = false
        //     // UIActivity.startToActivity("SelectCheckPointActivity",this.data)
        //     this.mangrens[2].active = true
        // },this)
        // this.mangrens[2].on(cc.Node.EventType.TOUCH_START,()=>{
        //     this.mangrens[2].active = false
        //     // UIActivity.startToActivity("SelectCheckPointActivity",this.data)
        //     Emitter.fire("onSelectRole",   {type : this.data.type,mapName : "Pre_shizhang_0"})
        // },this)


        // this.testMap.on(cc.Node.EventType.TOUCH_START,()=>{
        //     // Emitter.fire("onSelectRole",   {type : playerType.canzhang})
        //     // Emitter.fire('onTipsShow', {txt: "建设中 很快见面"})
        //     Emitter.fire("onSelectRole",   {type : playerType.canzhang,mapName : MapName.Pre_shizhang_3})
        // },this)


        this.s1btn.on(cc.Node.EventType.TOUCH_START,()=>{
            this.data = {
                type : playerType.shizhang
            }
            // UIActivity.startToActivity("SelectCheckPointActivity",this.data)
            this.xuanren.active = false
            this.mangrens[0].active = true
            this.mangrens[0].getComponent("dialogAn").onAn()
        },this)
        this.s2btn.on(cc.Node.EventType.TOUCH_START,()=>{



            this.data = {
                type : playerType.canzhang
            }
            // UIActivity.startToActivity("SelectCheckPointActivity",this.data)
            this.xuanren.active = false
            this.lunyis[0].active = true
            this.lunyis[0].getComponent("dialogAn").onAn()
        },this)

    }

    callBackTimeOut(id, data) {
    }

    setClickTimeTag(b){
        if (this.clickTimeTag !=b ) {
            this.clickTimeTag = b
            return b
        }
        return !b
    }

    update (dt) {
        if (this.clickTimeTag == true) {
            this.clickTimeMin+=dt
            if (this.clickTimeMin >= this.clickTimeMax) {
                this.clickTimeTag = false
                this.clickTimeMin = 0
            }
        }
    }
}

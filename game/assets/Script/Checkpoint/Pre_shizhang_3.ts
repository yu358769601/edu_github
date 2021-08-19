// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsNode from "../System/Utils/UtilsNode";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import {
    chengfaPOPType, ElevatorType,
    MapName, NPCType,
    playerSpType,
    playerType, spActiconType,
    TalkListType, tipsText
} from "../System/Type/enums";
import UtilsAction from "../System/Utils/UtilsAction";
import JsonManager from "../manage/JsonManager";
import BaseCheckPoint from "../base/BaseCheckPoint";
import Gongrong, {gongrongType} from "../item/gongrong";
import Utils from "../System/Utils/Utils";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_3 extends BaseCheckPoint {

    @property(cc.Node)
    startPlayerP: cc.Node = null;
    @property(cc.Node)
    startPlayerfushouP: cc.Node = null;
    // @property(cc.Node)
    // Pre_shizhang_1bg: cc.Node = null;
    // @property(cc.Node)
    // xiaohaiweizhi: cc.Node = null;
    // @property(cc.Node)
    // shuiweizhi: cc.Node = null;
    // @property(cc.Node)
    // luzhangweizhi: cc.Node = null;
    @property({
        displayName :"地鐵上車點開始",
        tooltip: "地鐵上車點開始",
        type : cc.Node
    })
    shangditieP: cc.Node = null;
    @property({
        displayName :"地鐵上車點結束",
        tooltip: "地鐵上車點結束",
        type : cc.Node
    })
    shangditieEndP: cc.Node = null;

    @property({
        displayName :"Npc地鐵門口點",
        tooltip: "Npc地鐵門口點",
        type : cc.Node
    })
    npcEndP: cc.Node = null;
    @property({
        displayName :"Npc",
        tooltip: "Npc",
        type : cc.Node
    })
    npc: cc.Node = null;

    @property({
        displayName :"上車觸發點",
        tooltip: "上車觸發點",
        type : cc.Node
    })
    shangche: cc.Node = null;
    @property({
        displayName :"車門口",
        tooltip: "車門口",
        type : cc.Node
    })
    chemenkou: cc.Node = null;
    @property({
        displayName :"板子",
        tooltip: "板子",
        type : cc.Node
    })
    banzi: cc.Node = null;

    // @property({
    //     displayName :"盲人起始点",
    //     tooltip: "板子",
    //     type : cc.Node
    // })
    // startPlayerP: cc.Node = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    player: cc.Node = null;
    @property(cc.Camera)
    mainCamera: cc.Camera = null

    @property([cc.Node])
    titiemenkouNpcs: cc.Node [] = [];

    @property(cc.Node)
    mangrenshangche: cc.Node = null;
    @property(cc.Node)
    lunyijiazhuangshangche: cc.Node = null;


    @property({
        displayName :"底板人创建在这个上面",
        tooltip: "底板人创建在这个上面",
        type : cc.Node
    })
    diban: cc.Node = null;
    @property({
        displayName :"地铁让位地图",
        tooltip: "地铁让位地图",
        type : cc.Node
    })
    ditierangwei: cc.Node = null;

    //尋求幫助
    bangzhuTag = false
    data : any = {}
     onDestroy(): void {
        super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onEntertishishangditieAfter', this.onEntertishishangditieAfter,this)
        Emitter.remove('onDitie', this.onDitie,this)
        Emitter.remove('onGetPre_shizhang_3', this.onGetPre_shizhang_3,this)
        Emitter.remove('onShangDiTie', this.onShangDiTie,this)
        Emitter.remove('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.remove('onEntermangrenshangditieAfter', this.onEntermangrenshangditieAfter,this)
    }
    registerEmitter(){
        Emitter.register('onEntertishishangditieAfter', this.onEntertishishangditieAfter,this)
        Emitter.register('onDitie', this.onDitie,this)
        Emitter.register('onGetPre_shizhang_3', this.onGetPre_shizhang_3,this)
        Emitter.register('onShangDiTie', this.onShangDiTie,this)
        Emitter.register('onEnterNPCMoveAfter', this.onEnterNPCMoveAfter,this)
        Emitter.register('onEntermangrenshangditieAfter', this.onEntermangrenshangditieAfter,this)
    }
    async onLoad () {
        super.onLoad()

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
    //去洗手間
    onEntertishishangditieAfter(selfName,self,type,onEndCallBack){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)
        // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        // this.player.scaleX = 1

        ccLog.log("有没有啊小老弟",type)
        let item = JsonManager.getTalkListItem(TalkListType.列車到了)
        Emitter.fire("onOpenTalk",item,(data)=>{
            if (onEndCallBack) {
                onEndCallBack(self,data)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })
    }
    //得到第一个关卡
    onGetPre_shizhang_2Map(selfName,self,callback){
            if (callback) {
                callback(self,this.node)
            }
    }

    async setData(data,otherData ?){
        this.data = data
        Emitter.fire("onMusicSwitch",SoundType.第1_4關,0.2)
        ccLog.log("第二个页面过来的数据",data,otherData)
        Emitter.fire("onOpenGoTips")
        // Emitter.fire("onCountDownSuspend",true)
        Emitter.fire("onCountDownShow",{xuniTime : 600,shijiTime:200})
        // await this.setTimerOnce(0.1)
        // player
        let player = this.player = await UtilsNode.getNode("player",this.diban)
        // ccLog.log("有没有啊小老弟",player)
        if (otherData) {
            //扶手下楼
            if (otherData.checkOut) {
                Emitter.fire("onElevatorCloseNow",ElevatorType.港铁左面)
                player.setPosition( this.startPlayerfushouP.getPosition())
            }else{
                player.setPosition( this.startPlayerP.getPosition())
                Emitter.fire("onElevatorClose",ElevatorType.港铁左面)
            }
        }else{
            player.setPosition( this.startPlayerP.getPosition())
            Emitter.fire("onElevatorClose",ElevatorType.港铁左面)
        }

        // this.startPlayerP.setPosition()
        player.getComponent("controlPlayer").setData(this.data)
        // player.zIndex = 99

        await Utils.setTimerOnce(this,0.2)

        Emitter.fire("onActionTag", false)

        Emitter.fire("onGetControlGameStart",this,async(self,controlGameStart)=>{
            Emitter.fire("onSp", playerSpType.shizhang_move)
            await controlGameStart.move(1.5,player,()=>{
                Emitter.fire("onActionTag", true)
                Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                Emitter.fire("onEnterAuto",TalkListType.列車到了)

                // Emitter.fire("onEnterAuto",TalkListType.玩家出门)

            })
        })



        // UtilsAction.moveTo(this.player,1,this.diantiP.x,this.diantiP.y,()=>{
        //     UtilsAction.moveTo(this.player,1,this.diantiEndP.x,this.diantiEndP.y,()=>{
        //         UtilsAction.fadeOut(this.player,1,()=>{
        //             Emitter.fire("onElevatorClose",ElevatorType.商场下楼电梯)
        //             ccLog.log("过关")
        //             this.player.destroy()
        //             this.onEnterCheckPointEnd("",MapName.站台)
        //         })
        //     })
        // })

        // titiemenkouNpcs
        //盲人上车 轮椅上车
        // Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {
        //     if (controlPlayer.data.type == playerType.shizhang) {
        //             this.mangrenshangche.active = true
        //             this.lunyijiazhuangshangche.active = false
        //     } else if (controlPlayer.data.type == playerType.canzhang) {
        //         this.mangrenshangche.active = false
        //         this.lunyijiazhuangshangche.active = true
        //         for (let i = 0; i < this.titiemenkouNpcs.length; i++) {
        //             this.titiemenkouNpcs[i].active = false
        //         }
        //     }
        // })


    }

    start () {
        this.init()

    }

    onDitie(){
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {

            if (controlPlayer.data.type == playerType.shizhang) {
                let item = JsonManager.getTalkListItem(TalkListType.我們不可以這樣勉強上車的视障)
                Emitter.fire("onOpenTalk",item,async(data)=>{
                    // UtilsAction.moveTo(self.player,1,self.shangditieP.x,self.shangditieP.y,()=>{

                    Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,100)
                    await self.setTimerOnce(2)
                        UtilsAction.moveTo(self.player,1,self.shangditieEndP.x,self.shangditieEndP.y,()=>{
                            UtilsAction.fadeOut(self.player,1,async()=>{
                                Emitter.fire("onElevatorClose",ElevatorType.港铁右面)


                                ccLog.log("过关")
                                self.player.destroy()
                                // self.onEnterCheckPointEnd("",MapName.天桥)
                                //暂时停下来
                                self.onEnterCheckPointEnd("",MapName.等车)
                            })
                        })
                    // })
                })

            } else if (controlPlayer.data.type == playerType.canzhang) {
                let item = JsonManager.getTalkListItem(TalkListType.我們不可以這樣勉強上車的)
                Emitter.fire("onOpenTalk",item,(data)=>{
                    Emitter.fire("onActionTag",true)
                    Emitter.fire("onCountDownSuspend", true)
                    Emitter.fire("onSp", playerSpType.shizhang_zhengchang)

                })
            }



        })

    }
    //盲人上车
    onEntermangrenshangditieAfter(selfName,self,type,onEndCallBack){
        Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {

            if (controlPlayer.data.type == playerType.shizhang) {
                let item = JsonManager.getTalkListItem(TalkListType.我們不可以這樣勉強上車的视障)
                Emitter.fire("onOpenTalk",item,async(data)=>{
                    // UtilsAction.moveTo(self.player,1,self.shangditieP.x,self.shangditieP.y,()=>{

                    Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,100)
                    Emitter.fire("onSp", playerSpType.shizhang_move)
                    await self.setTimerOnce(2)
                    UtilsAction.moveTo(self.player,1,self.shangditieEndP.x,self.shangditieEndP.y,()=>{
                        UtilsAction.fadeOut(self.player,1,async()=>{
                            // Emitter.fire("onPlaySound",SoundType.SJ_game_15_地铁关门声)
                            Emitter.fire("onElevatorClose",ElevatorType.港铁右面)


                            ccLog.log("过关")
                            self.player.destroy()
                            self.onEnterCheckPointEnd("",MapName.等车)
                        })
                    })
                    // })
                })

            } else if (controlPlayer.data.type == playerType.canzhang) {
                // let item = JsonManager.getTalkListItem(TalkListType.我們不可以這樣勉強上車的)
                // Emitter.fire("onOpenTalk",item,(data)=>{
                //     Emitter.fire("onActionTag",true)
                //     Emitter.fire("onCountDownSuspend", true)
                //     Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                //     Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                //
                // })
            }



        })
    }



    //移动到门口动画表现
    onShangDiTie(){
        // this.bangzhuTag = true
        this.shangche.active = false
        this.chemenkou.active = false
        Emitter.fire("onCloseGoTipsActivit")
        Emitter.fire("onGetNode",0,false)
        // npcEndP
        // npc
        Emitter.fire("onNPCSp",NPCType.地铁男工作人员,spActiconType.运动,true,0)
        UtilsAction.moveTo(this.npc,1,this.npcEndP.x,this.npcEndP.y,async()=>{
            // UtilsAction.moveTo(this.player,1,this.shangditieEndP.x,this.shangditieEndP.y,()=>{
            //     UtilsAction.fadeOut(this.player,1,()=>{
            //         ccLog.log("过关")
            //         this.onEnterCheckPointEnd("",MapName.天桥)
            //     })
            // })
            Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.让路,false,500)
            // Emitter.fire("onSp", playerSpType.shizhang_move)
            // await self.setTimerOnce(2)



            Emitter.fire("onNPCSp",NPCType.地铁男工作人员,spActiconType.帮助,false,0)
            // Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.说话,true,0)
            this.npc.getComponent("myZIndex").setZindex(1)
            await this.setTimerOnce(2)
            Emitter.fire("onPlaySound",SoundType.SJ_game_15_放下板子的声音)
            // this.banzi.active = true
            Emitter.fire("onSp", playerSpType.shizhang_move)
            Emitter.fire("onShowMaskUI",false)
            UtilsAction.moveTo(this.player,1,this.shangditieP.x,this.shangditieP.y,()=>{
                UtilsAction.moveTo(this.player,1,this.shangditieEndP.x,this.shangditieEndP.y,()=>{
                    UtilsAction.fadeOut(this.player,1,async()=>{
                        Emitter.fire("onElevatorClose",ElevatorType.港铁右面)
                        Emitter.fire("onPlaySound",SoundType.SJ_game_15_地铁关门声)
                        await this.setTimerOnce(1)

                        ccLog.log("过关")


                        this.Transitionscall(1,async()=>{
                            this.diban.active = false
                            this.ditierangwei.active = true
                            Emitter.fire("onMusicSwitch",SoundType.小動畫專用,0.2)
                            Emitter.fire("onGetCamera",this,(self,camera)=>{
                                camera.node.setPosition(0,0)
                            })
                            await this.setTimerOnce(1)
                            Emitter.fire("onInitSPStartAndPaused",NPCType.地铁路人A,true)
                            Emitter.fire("onInitSPStartAndPaused",NPCType.地铁路人B,true)
                            Emitter.fire("onInitSPStartAndPaused",NPCType.地铁轮椅,true)
                            let item = JsonManager.getTalkListItem(TalkListType.地铁轮椅车里)
                            Emitter.fire("onOpenTalk",item,async(data)=>{
                                Emitter.fire("onInitSPStartAndPaused",NPCType.地铁路人A,false)
                                Emitter.fire("onInitSPStartAndPaused",NPCType.地铁路人B,false)
                                Emitter.fire("onInitSPStartAndPaused",NPCType.地铁轮椅,false)
                                Gongrong.getInstance().addData({type : gongrongType.地铁车上让开,num :gongrongType.地铁车上让开共荣度 },(num)=>{
                                    ccLog.log("地铁车上让开共荣度",num,Gongrong.getInstance().getData())
                                    Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                                    Emitter.fire('onTipsShowzhixue')
                                })

                                await this.setTimerOnce(9)
                                Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                                Emitter.fire('onTipsShowzhixue')
                                await this.setTimerOnce(1)
                                this.player.destroy()
                                // this.onEnterCheckPointEnd("",MapName.天桥)
                                this.onEnterCheckPointEnd("",MapName.等车)
                            })
                        },null)





                    })
                })
            })
        })

        // this.player.setPosition(this.zhuangcheweizhi.getPosition())
    }
    onGetPre_shizhang_3(selfName, self, callback) {
        if (callback) {
            // ccLog.log("几次",self)
            callback(self, this)
        }
    }
    async onEnterNPCMoveAfter(selfName,self,type,onEndCallBack,num){
        // UtilsAction.moveTo(this.player,1,this.shigonglajitongweizhi.getPosition().x,this.shigonglajitongweizhi.getPosition().y,null)

        // Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.挨撞,false,0)
        // ccLog.log("播放挨撞")

        Emitter.fire("onNPCSpMove",NPCType.移动的NPC,spActiconType.挨撞,false,num,this.player,async()=>{
            if (onEndCallBack) {
                // await this.setTimerOnce(2)
                // this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
                // Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.空,false,0)
                onEndCallBack(self,null)
                // this.player.setPosition(this.xiepoweizhi.getPosition())
            }
        })



        // this.player.scaleX = 1
        // let item = JsonManager.getTalkListItem(TalkListType.玩家碰到路障)
        // Emitter.fire("onOpenTalk",item,(data)=>{
        //     if (onEndCallBack) {
        //         this.player.setPosition(  this.shigonglajitongweizhi.getPosition())
        //         Emitter.fire("onNPCSp",NPCType.施工栅栏,spActiconType.空,false,0)
        //         onEndCallBack(self,data)
        //         // this.player.setPosition(this.xiepoweizhi.getPosition())
        //     }
        // })


    }

    subclassCall(): any {
        return this
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

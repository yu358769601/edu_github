// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {
    chengfaPOPType,
    clickPOPType,
    clickPOPTypeNode, Collisiontype, MapName, NPCType, playerSpType, playerType, spActiconType,
    TalkListType,
    tipsText,
    wantType, ZindexType
} from "../System/Type/enums";
import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";
import BaseComponent from "../System/Base/BaseComponent";
import ccLog from "../System/Log/ccLog";
import JsonManager from "../manage/JsonManager";
import UtilsAction from "../System/Utils/UtilsAction";
import Gongrong, {gongrongType} from "../item/gongrong";
import Utils from "../System/Utils/Utils";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ClickPOP extends BaseComponent {
    //这里增加共荣度
    @property([cc.Node])
    nodes: cc.Node[] = [];

    clickPOPTypeNode : number = 0
    
    data : any = null
    
    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onShowHideClickPop', this.onShowHideClickPop, this)
        Emitter.remove('onShowHideClickPopToFun', this.onShowHideClickPopToFun,this)
        Emitter.remove('onKeyDownSpace', this.onKeyDownSpace,this)


    }

    registerEmitter() {
        Emitter.register('onShowHideClickPop', this.onShowHideClickPop, this)
        Emitter.register('onShowHideClickPopToFun', this.onShowHideClickPopToFun,this)
        Emitter.register('onKeyDownSpace', this.onKeyDownSpace,this)

    }

    onLoad() {
        this.removeEmitter()
        this.registerEmitter()
        // {collisiontype:this.collisiontype,clickPOP:this.clickPOP
        //点了按钮 和 按了空格之后
        // this.nodes[clickPOPType.提示点我或者按空格].on(cc.Node.EventType.TOUCH_END, async() => {
        //         this.runActions()
        //
        // })
        // this.nodes[clickPOPType.人对话].on(cc.Node.EventType.TOUCH_END, async() => {
        //     this.runActions()
        //
        // })
        for (let i = 0; i <this.nodes.length ; i++) {
            this.nodes[i].on(cc.Node.EventType.TOUCH_END, async() => {
                this.runActions()
            })
        }
    }
    //按了空格
    async onKeyDownSpace(){
        return
     this.runActions()
    }
    async runActions(){

        ccLog.log("现在去做运动了",this.clickPOPTypeNode)
        ccLog.log("现在去做运动了 第一关电梯",clickPOPTypeNode.第一关电梯)
        ccLog.log("现在去做运动了 第三关工作人员",clickPOPTypeNode.第三关工作人员)
        this.onShowHideClickPop("",this.data.clickPOP, false,this.data.collisiontype)
        switch (this.data.collisiontype) {
            case clickPOPTypeNode.第一关电梯:
                Emitter.fire("onActionTag",false)
                Emitter.fire("onShowMaskUI",false)
                Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                Emitter.fire('onTipsShowzhixue')
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onCountDownSuspend",false)

                await this.setTimerOnce(2)
                ccLog.log("现在点了电梯控制器")

                //坐电梯第一关
                Emitter.fire("onTakeTheElevator")
                break
            case clickPOPTypeNode.第三关电梯:
                Emitter.fire("onActionTag",false)
                Emitter.fire("onShowMaskUI",false)

                Emitter.fire("onCloseGoTips")
                Emitter.fire("onCountDownSuspend",false)
                let newSelf = this
                Emitter.fire("onGetPre_shizhang_2", this, async (self, Pre_shizhang_2) => {
                    if (Pre_shizhang_2.xishoujianTag == true) {

                        Emitter.fire("onGetControlPlayer", newSelf, async (newnewSelf, controlPlayer) => {
                            if (controlPlayer.data.type == playerType.shizhang) {
                                // controlPlayer1 = controlPlayer
                                let item = JsonManager.getTalkListItem(TalkListType.正確使用電梯视障)
                                Emitter.fire("onOpenTalk",item,async(data)=>{


                                    await self.setTimerOnce(2)
                                    ccLog.log("现在点了电梯控制器")
                                    // Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                                    //坐电梯第一关
                                    Emitter.fire("onTakeThe2Elevator")
                                })
                            } else if (controlPlayer.data.type == playerType.canzhang) {
                                Emitter.fire("onPlaySound",SoundType.SJ_game_07_UI成功加分音效)
                                // 正確使用電梯视障
                                let item = JsonManager.getTalkListItem(TalkListType.正確使用電梯)
                                Emitter.fire("onOpenTalk",item,async(data)=>{

                                    // Emitter.fire('onTipsShowzhixue')

                                    await self.setTimerOnce(2)
                                    ccLog.log("现在点了电梯控制器")
                                    // Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                                    //坐电梯第一关
                                    Emitter.fire("onTakeThe2Elevator")
                                })
                            }
                        })


                    }else{
                        let item = JsonManager.getTalkListItem(TalkListType.要先去厕所)
                        Emitter.fire("onOpenTalk",item,async(data)=>{
                            Emitter.fire("onActionTag",true)
                            Emitter.fire("onCountDownSuspend", true)
                            Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                        })
                    }
                })

                // Emitter.fire("onActionTag",true)
                // Emitter.fire("onCountDownSuspend", true)
                // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                // Emitter.fire("onSp", playerSpType.shizhang_zhengchang)

                break
            case clickPOPTypeNode.第三关工作人员:
                Emitter.fire("onActionTag",false)
                // await this.onShowHideClickPopToFun("", clickPOPType.xunwencesuo)
                let item = JsonManager.getTalkListItem(TalkListType.請問洗手間在哪)
                ccLog.log("进来了吗","说话 ",spActiconType.说话)
                Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.说话,true,0)
                Emitter.fire("onOpenTalk",item,(data)=>{
                    Emitter.fire("onEnterScan_staff_oldTag")
                    this.startStaff_old2()
                    Gongrong.getInstance().addData({type : gongrongType.第三关导购,num :gongrongType.第三关导购共荣度 },(num)=>{
                        ccLog.log("第一次增加第三关导购共荣度",num,Gongrong.getInstance().getData())
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                        Emitter.fire('onTipsShowzhixue')
                    })

                })
            break
            case clickPOPTypeNode.第四關地鐵門:
                Emitter.fire("onActionTag",false)
                // await this.onShowHideClickPopToFun("", clickPOPType.xunwencesuo)
                // let item = JsonManager.getTalkListItem(TalkListType.我們不可以這樣勉強上車的)
                // Emitter.fire("onOpenTalk",item,(data)=>{
                //     Emitter.fire("onActionTag",true)
                //     Emitter.fire("onCountDownSuspend", true)
                //     Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                //     Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                // })
                Emitter.fire("onDitie")
            break
            case clickPOPTypeNode.第四關工作人員:
                Emitter.fire("onActionTag",false)
                // Emitter.fire("onGetPre_shizhang_3", this, async (self, Pre_shizhang_3) => {
                //     if (Pre_shizhang_3.bangzhuTag == true) {
                //         Emitter.fire('onTipsShowMidAn', {txt: tipsText.shunlidaoda})
                //         let item = JsonManager.getTalkListItem(TalkListType.玩家在電梯下去)
                //         Emitter.fire("onOpenTalk",item,async(data)=>{
                //             await self.setTimerOnce(2)
                //             ccLog.log("现在点了电梯控制器")
                //
                //             //坐电梯第一关
                //             // Emitter.fire("onTakeThe2Elevator")
                //         })
                //     }else{
                //         let item = JsonManager.getTalkListItem(TalkListType.玩家在工作人員附近按鍵)
                //         Emitter.fire("onOpenTalk",item,async(data)=>{
                //             Emitter.fire("onActionTag",true)
                //             Emitter.fire("onCountDownSuspend", true)
                //             Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                //             Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                //         })
                //     }
                // })
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)
                // Emitter.fire("onShowMaskUI",false)
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onNPCSp",NPCType.地铁男工作人员,spActiconType.说话,true,0)


                Emitter.fire("onGetControlPlayer", this, async (self, controlPlayer) => {

                    if (controlPlayer.data.type == playerType.shizhang) {
                        let item = JsonManager.getTalkListItem(TalkListType.玩家在工作人員附近按鍵视障)
                        Emitter.fire("onOpenTalk",item,async(data)=>{
                            Emitter.fire("onActionTag",true)
                            Emitter.fire("onCountDownSuspend", true)
                            Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                            // Emitter.fire("onShangDiTie", true)
                            // Emitter.fire("onActionTag",true)
                            // Emitter.fire("onCountDownSuspend", true)
                            Emitter.fire("onNPCSp",NPCType.地铁男工作人员,spActiconType.闲置,true,0)

                        })

                    } else if (controlPlayer.data.type == playerType.canzhang) {
                        let item = JsonManager.getTalkListItem(TalkListType.玩家在工作人員附近按鍵)
                        Emitter.fire("onOpenTalk",item,async(data)=>{
                            // Emitter.fire("onActionTag",true)
                            // Emitter.fire("onCountDownSuspend", true)
                            // Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                            // Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                            Emitter.fire("onShangDiTie", true)
                            // Emitter.fire("onActionTag",true)
                            // Emitter.fire("onCountDownSuspend", true)
                            Gongrong.getInstance().addData({type : gongrongType.第四关地铁男工作人员,num :gongrongType.第四关地铁男工作人员共荣度 },(num)=>{
                                ccLog.log("第一次增加第四关地铁男工作人员共荣度",num,Gongrong.getInstance().getData())
                                Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                                Emitter.fire('onTipsShowzhixue')
                            })

                        })
                    }



                })


                break
            case clickPOPTypeNode.天橋老闆:
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)
                Emitter.fire("onNPCSp",NPCType.天桥老板,spActiconType.说话,true,0)
                let item = JsonManager.getTalkListItem(TalkListType.在店面老板附近按鍵)
                Emitter.fire("onOpenTalk",item,async(data)=>{
                    Emitter.fire("onActionTag",true)
                    Emitter.fire("onCountDownSuspend", true)
                    Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                    Emitter.fire("onNPCSp",NPCType.天桥老板,spActiconType.闲置,true,0)
                    Gongrong.getInstance().addData({type : gongrongType.第五关天桥老板,num :gongrongType.第五关天桥老板共荣度 },(num)=>{
                        ccLog.log("第一次增加第五关天桥老板共荣度",num,Gongrong.getInstance().getData())
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                        Emitter.fire('onTipsShowzhixue')
                    })

                })
                break

            case clickPOPTypeNode.第一关邻居:
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)
                Emitter.fire("onNPCSp",NPCType.第一关邻居,spActiconType.说话,true,0)


                let item = JsonManager.getTalkListItem(TalkListType.第一关邻居对话)
                Emitter.fire("onOpenTalk",item,async(data)=>{
                    Emitter.fire("onActionTag",true)
                    Emitter.fire("onCountDownSuspend", true)
                    Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                    Emitter.fire("onNPCSp",NPCType.第一关邻居,spActiconType.闲置,true,0)

                    Gongrong.getInstance().addData({type : gongrongType.第一关邻居,num :gongrongType.第一关邻居共荣度 },(num)=>{
                        ccLog.log("第一次增加第一关邻居共荣度",num,Gongrong.getInstance().getData())
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                        Emitter.fire('onTipsShowzhixue')
                    })

                    Emitter.fire("onActionTag",false)
                    Emitter.fire("onShowMaskUI",false)
                    Emitter.fire('onTipsShowShunli', {txt: tipsText.shunlidaoda})
                    Emitter.fire("onCloseGoTips")
                    Emitter.fire("onCountDownSuspend",false)
                    Emitter.fire("onPlaySound",SoundType.SJ_game_04_UI电梯到叮的声音)
                    await this.setTimerOnce(2)
                    ccLog.log("现在点了电梯控制器")

                    //坐电梯第一关
                    Emitter.fire("onTakeTheElevator")
                })



                break
            case clickPOPTypeNode.等車的人:
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)
                let item = JsonManager.getTalkListItem(TalkListType.主角到了巴士站)
                Emitter.fire("onOpenTalk",item,async(data)=>{
                    Emitter.fire("onActionTag",true)
                    Emitter.fire("onCountDownSuspend", true)
                    Emitter.fire("onSp", playerSpType.shizhang_zhengchang)

                })
                break
            case clickPOPTypeNode.專用車位:
                // Emitter.fire("onActionTag",false)

                // let item = JsonManager.getTalkListItem(TalkListType.主角到了巴士站)
                // Emitter.fire("onOpenTalk",item,async(data)=>{
                //     Emitter.fire("onActionTag",true)
                //     Emitter.fire("onCountDownSuspend", true)
                //     Emitter.fire('onShowHidePlayerTips', chengfaPOPType.koushijian, false)
                //     Emitter.fire("onSp", playerSpType.shizhang_zhengchang)
                //
                // })
                Emitter.fire("onShowMaskUI",false)
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)

                Emitter.fire("onEnterBus")
                break
            case clickPOPTypeNode.主角問路邊攤檔店員1:
            case clickPOPTypeNode.主角問路邊攤檔店員2:
                // Emitter.fire("onActionTag",false)


                // Emitter.fire("onShowMaskUI",false)
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)

                Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.说话,true,0)
                let item = JsonManager.getTalkListItem(TalkListType.主角問路邊攤檔店員)
                Emitter.fire("onOpenTalk",item,async(data)=>{
                    Emitter.fire("onActionTag",true)
                    Emitter.fire("onCountDownSuspend", true)
                    Emitter.fire("onNPCSp",NPCType.商店女导购,spActiconType.闲置,true,0)
                    Gongrong.getInstance().addData({type : gongrongType.商店女导购,num :gongrongType.商店女导购共荣度 },(num)=>{
                        ccLog.log("第一次增加商店女导购共荣度",num,Gongrong.getInstance().getData())
                        Emitter.fire('onShowHidePlayerTips', chengfaPOPType.增加共融值, true)
                        Emitter.fire('onTipsShowzhixue')
                    })

                })
                // Emitter.fire("onEnterBus")
                break
            case clickPOPTypeNode.天橋升降梯:
                // Emitter.fire("onActionTag",false)
                // Emitter.fire("onShowMaskUI",false)
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)

                Emitter.fire("onEntershengjiangtishangAfter",null,null,async(data)=>{
                    Emitter.fire("onActionTag",true)
                    Emitter.fire("onCountDownSuspend", true)

                })
                // this.onShowHideClickPop("", clickPOPType.提示点我或者按空格, false,0)
                // let item = JsonManager.getTalkListItem(TalkListType.主角問路邊攤檔店員)
                // Emitter.fire("onOpenTalk",item,async(data)=>{
                //     Emitter.fire("onActionTag",true)
                //     Emitter.fire("onCountDownSuspend", true)
                //
                // })
                // Emitter.fire("onEnterBus")

                break
            case clickPOPTypeNode.天橋升降梯2:
                // Emitter.fire("onActionTag",false)
                // Emitter.fire("onShowMaskUI",false)
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onActionTag",false)
                Emitter.fire("onCountDownSuspend",false)

                Emitter.fire("onEntershengjiangtixiaAfter",null,null,async(data)=>{
                    Emitter.fire("onActionTag",true)
                    Emitter.fire("onCountDownSuspend", true)

                })
                // this.onShowHideClickPop("", clickPOPType.提示点我或者按空格, false,0)
                // let item = JsonManager.getTalkListItem(TalkListType.主角問路邊攤檔店員)
                // Emitter.fire("onOpenTalk",item,async(data)=>{
                //     Emitter.fire("onActionTag",true)
                //     Emitter.fire("onCountDownSuspend", true)
                //
                // })
                // Emitter.fire("onEnterBus")

                break
        }


    }

    async startStaff_old2(){
        // await this.setTimerOnce(2)
        Emitter.fire('onEnterstaff_old2')
    }


    //显示隐藏可以被点击的
    onShowHideClickPop(selfName, type, b,clickPOPTypeNode) {

        if (b) {
            for (let i = 0; i < this.nodes.length; i++) {
                this.nodes[i].active = false
            }
        }
        ccLog.log("什么呢  ",this.data.collisiontype,type)
        if (this.data.collisiontype == clickPOPTypeNode) {
            this.nodes[type].active = b
            this.clickPOPTypeNode = clickPOPTypeNode
            if (b == false) {
                this.clickPOPTypeNode = -1
            }
        }

    }

    async onShowHideClickPopToFun(selfName, type) {
        switch (type) {
            case clickPOPType.提示点我或者按空格:
                let itemPop =await UtilsNode.getNode("itemPop",this.node)
                itemPop.getComponent("itemPop").setData({type :wantType.duzitong })

                // await this.setTimerOnce(0.5)
                Emitter.fire('onEnterstaff_old2')
                break;
        }
    }

    setData(data){
        this.data = data
    }
    start() {

    }

    callBackTimeOut(id, data) {
    }

    // update (dt) {}
}

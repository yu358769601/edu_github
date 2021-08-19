// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import {playerType} from "../System/Type/enums";
import ccLog from "../System/Log/ccLog";
import Gongrong from "../item/gongrong";
import Utils from "../System/Utils/Utils";
import Emitter from "../System/Msg/Emitter";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tips extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Node)
    shunli: cc.Node = null;
    @property([cc.Node])
    endGameNodes: cc.Node [] = [];
    @property(sp.Skeleton)
    winsp: sp.Skeleton = null;
    @property(sp.Skeleton)
    winspcaihua: sp.Skeleton = null;

    @property([cc.SpriteFrame])
    titleNodes: cc.SpriteFrame [] = [];
    @property([cc.SpriteFrame])
    starNodes: cc.SpriteFrame [] = [];

    @property(cc.Sprite)
    title: cc.Sprite = null;
    @property(cc.Node)
    star: cc.Node = null;


    @property(sp.Skeleton)
    zhixue: sp.Skeleton = null;



    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }
    async zhixuekaishi(){
        // this.label.string = showData.txt
        this.zhixue.node.active = true
        this.zhixue.setAnimation(0,"",true)
        await Utils.setTimerOnce(this,2)
        UtilsAction.fadeOut(this.zhixue.node,1,()=>{
            this.node.destroy()
        })

    }
    flyTopAn(showData : any){
        this.label.string = showData.txt
        UtilsAction.moveBy(this.node,1,0,300,()=>{
            UtilsAction.fadeOut(this.node,1,()=>{
                this.node.destroy()
            })
        })
    }
    midAn(showData : any){
        this.label.string = showData.txt

        UtilsAction.scaleToAndfadeOut(this.node,3,2,2,2.5,2.5,async()=>{
            this.node.destroy()
        })
    }
    midShunli(showData : any){
        // this.label.string = showData.txt

        // Emitter.fire("onMusicSwitch",SoundType.SJ_game_12_成功通关)
        Emitter.fire("onPlaySound",SoundType.SJ_game_12_成功通关)
        this.shunli.active = true
        UtilsAction.scaleToAndfadeOut(this.shunli,3,1,1,1,1,async()=>{
            this.node.destroy()
        })
    }
    midEnd(showData : any){
        this.label.string = showData.txt

        UtilsAction.scaleToAndfadeIn(this.node,3,2,2,2.5,2.5,async()=>{
            // this.node.destroy()
        })
    }
    endGame(showData : any){
        Emitter.fire("onMusicSwitch",SoundType.結局用)
        let index = 0
        // typeItem :playerType.canzhang
        ccLog.log("结束过来什么数据",showData)
        if (showData.typeItem == playerType.shizhang) {
            // this.endGameNode.getComponent(sp.Skeleton).setAnimation(0,"",true)
            index = 0
        }else if (showData.typeItem == playerType.canzhang) {
            // this.endGameNode.getComponent(sp.Skeleton).setAnimation(0,"",true)
            index = 1
        }
        this.endGameNodes[index].active = true
        this.endGameNodes[index].opacity = 0


        UtilsAction.scaleToAndfadeIn(this.endGameNodes[index],3,1,1,1,1,async()=>{
            // this.node.destroy()
        })
       let data = Gongrong.getInstance().getLevel()
        ccLog.log("结束过来什么数据 结束过来的",data)
        // data.level = "s"
        // data.index = 0
        this.title.spriteFrame = this.titleNodes[data.index]
        // this.star.spriteFrame = this.starNodes[data.index]

        let nodes = this.star.children

        for (let i in nodes ) {
            nodes[i].opacity = 100
            // ccLog.log("结束过来什么数据 结束过来的",i)
        }
        // data.index =2
        // ccLog.log("结束过来什么数据 所有的",this.star.children,"第几个",data.index,"有没有",this.star.children[data.index])
        this.star.children[data.index].opacity = 255
        UtilsAction.heartbeatRepeatForever(this.star.children[data.index],0.5,1.1,1.1,null)


        // this.winsp.setAnimation(0,data.level,true)
        // this.winsp.setAnimation(0,"s",true)


        let ll = "a"
        switch (data.index) {
            case 0:
                ll = "s"
                this.winspcaihua.setAnimation(0,ll,true)
                Emitter.fire("onPlaySound",SoundType.SJ_game_22_勝利_S)
                break
            case 1:
                ll = "a"
                this.winspcaihua.setAnimation(0,ll,true)
                Emitter.fire("onPlaySound",SoundType.SJ_game_22_勝利_A)
                break
            case 2:
                ll = "b"
                this.winspcaihua.node.active = false
                // this.zhixue.setAnimation(0,"a",true)
                break
            case 3:
                ll = "c"
                this.winspcaihua.node.active = false
                break
        }


    }

    start () {

    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import StaticData from "../System/data/StaticData";
import ccLog from "../System/Log/ccLog";
import JsonManager from "../manage/JsonManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gongrongmanage extends cc.Component {


    @property([cc.SpriteFrame])
    gongrongzhis: cc.SpriteFrame [] = [];
    @property(cc.Sprite)
    gongrongzhi: cc.Sprite = null;

    @property(cc.Label)
    gongrong: cc.Label = null;

    @property(sp.Skeleton)
    sp: sp.Skeleton = null;

    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }

    removeEmitter() {
        Emitter.remove('onGongrong', this.onGongrong, this)
        Emitter.remove('onjiafen', this.onjiafen, this)
        Emitter.remove('onkoufen', this.onkoufen, this)
    }

    registerEmitter() {
        Emitter.register('onGongrong', this.onGongrong, this)
        Emitter.register('onjiafen', this.onjiafen, this)
        Emitter.register('onkoufen', this.onkoufen, this)
    }
    onLoad () {
        // this.gongrong.string =JsonManager.gameSetting.json.gongrongzhi
        this.getIndex(JsonManager.gameSetting.json.gongrongzhi)
        this.removeEmitter()
        this.registerEmitter()
    }
    onkoufen(){
        this.sp.setAnimation(0,"reduce",false)
        // ccLog.log("有没有 共融扣分 播放扣分 ")
        Emitter.fire("onGongrong")
    }
    onjiafen(){
        this.sp.setAnimation(0,"plus",false)
        Emitter.fire("onGongrong")
    }
    onGongrong(selfName,senddata,callback){
        let data = StaticData.getInstance().getDataKeyValue("共融")
        ccLog.log("共融值",data)
        if (data != null) {
            let num = 0
            for (let item in data) {
                num+=data[item]
            }
            ccLog.log("共融值 数字",num)
            //
            let koufen = num + StaticData.getInstance().getDataKeyValue("共融扣分")+JsonManager.gameSetting.json.gongrongzhi
            if (koufen > 0) {
                this.getIndex(koufen)
                // this.gongrong.string = koufen
            }else{
                // this.gongrong.string ="共融值:" +koufen
                Emitter.fire("onCloseGoTips")
                Emitter.fire("onActionTag",false)
                // Emitter.fire("ontimeOutDialog")
                Emitter.fire("onOpenDialog",{name : "timeOutDialog"},()=>{

                })
                // this.gongrong.string =koufen
                this.getIndex(koufen)
            }
            if (callback) {
                callback(senddata,koufen)
            }

        }else{
            //重置
            // this.gongrong.string =JsonManager.gameSetting.json.gongrongzhi
            this.getIndex(JsonManager.gameSetting.json.gongrongzhi)
            if (callback) {
                callback(senddata,JsonManager.gameSetting.json.gongrongzhi)
            }
        }

    }

    getIndex(index){

        let myIndex = index/5

        if (myIndex < 0) {
            myIndex = 0
        }
        if (myIndex >=this.gongrongzhis.length ) {
            myIndex = this.gongrongzhis.length-1
        }
        this.gongrongzhi.spriteFrame = this.gongrongzhis[myIndex]


        return myIndex
    }


    start () {

    }

    // update (dt) {}
}

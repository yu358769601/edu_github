// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import TalkItem from "../talk/TalkItem";
import TalKBase from "../talk/TalKBase";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MAP2_10 extends TalKBase {

    data = null




    onLoad() {
        super.onLoad()
        super.setSubclass(this)

    }

    start() {

    }

    setData(data) {
        this.data = data

        // this.data.list
        // ccLog.log("展示什麼內容啊",data)
        this.onNextPager( this.index)
    }



    callback(data) {
    }

    initListen(callback) {
        this.callback = callback
    }



    callBackTimeOut(id, data) {
    }


    // update (dt) {}
}

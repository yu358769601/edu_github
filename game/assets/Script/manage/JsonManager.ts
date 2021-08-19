// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import LoadManage from "../../Script/System/Load/LoadManage";
import ccLog from "../../Script/System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JsonManager extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    static talkList: cc.JsonAsset = null
    static gameSetting: cc.JsonAsset = null
    // static setting: cc.JsonAsset = null
    onLoad () {}

    start () {

    }
    //JsonManager.initJson()
    static async initJson() {
        // JsonManager.talkList.json
        this.talkList = await LoadManage.getJsonForName("talkList");
        // JsonManager.gameSetting.json
        this.gameSetting = await LoadManage.getJsonForName("gameSetting");
        ccLog.log("有沒有",this.talkList)
        // this.setting = await LoadManage.getJsonForName("setting");
        // ccLog.log("返回来的是什么 setting", this.setting)
    }
    //JsonManager.getTalkListItem(name)
    static getTalkListItem(name){
        ccLog.log("有嗎",JsonManager.talkList.json,"名字",name)
        for (let i = 0; i < JsonManager.talkList.json.list.length; i++) {
           let item = JsonManager.talkList.json.list[i]
            if (item.itemAddComponent_ == name) {
                return item
            }
        }

        return null
    }



    // update (dt) {}
}

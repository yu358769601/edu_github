// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsNode from "../../Script/System/Utils/UtilsNode";
import Emitter from "../../Script/System/Msg/Emitter";
import ccLog from "../../Script/System/Log/ccLog";


const {ccclass, property} = cc._decorator;

@ccclass
export default class DialogRoot extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    @property(cc.Node)
    rootDialogRoot : cc.Node = null

    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onOpenDialog', this.onOpenDialog,this)


    }
    registerEmitter(){
        Emitter.register('onOpenDialog', this.onOpenDialog,this)
    }
    onLoad () {

        this.removeEmitter()
        this.registerEmitter()

        // this.playerGameType = PlayerGameType.wudi
    }
    async onOpenDialog(self,data,callBack){
        ccLog.log(" 要打开对话框的请求 ",data);
        // this.checkAllChildren()
        let timeOutDialog = await UtilsNode.getNode(data.name, this.rootDialogRoot);
        timeOutDialog.getComponent(data.name).initCallBack(callBack)
        timeOutDialog.getComponent(data.name).setData(data)

        // cc.log(" upLvDialog ",upLvDialog);
        // upLvDialog.getComponent("timeOutDialog").setData(data)
        timeOutDialog.zIndex = 90
    }


    start () {

    }

    // update (dt) {}
}

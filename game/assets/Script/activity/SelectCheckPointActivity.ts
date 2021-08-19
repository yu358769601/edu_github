// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Activity from "../System/Ui/Activity";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";
import {MapName, playerType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectCheckPointActivity extends Activity {
    //
    @property(cc.Node)
    closeButton: cc.Node = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    data = null

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        this.closeButton.on(cc.Node.EventType.TOUCH_END,()=>{
            this.finsh()
        },this)

    }
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onToSelectRole', this.onToSelectRole,this)
    }
    registerEmitter(){
        Emitter.register('onToSelectRole', this.onToSelectRole,this)
    }

    onCreate(data) {
        this.data = data


    }
    onToSelectRole(selfName,newData){
        ccLog.log("现在的是什么111",newData,this.data)
        // Emitter.fire("onToSelectRole",this.msg)
        Emitter.fire("onSelectRole",   {type : this.data.type,mapName : newData.name})

    }



    start () {

    }

    // update (dt) {}
}

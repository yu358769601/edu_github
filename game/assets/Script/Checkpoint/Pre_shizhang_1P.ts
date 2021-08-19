// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Emitter from "../System/Msg/Emitter";
import UtilsNode from "../System/Utils/UtilsNode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Pre_shizhang_1P extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';
    // //红绿灯 位置
    // @property([cc.Node])
    // TrafficlightsPs: cc.Node[] = [];

    //车 位置 1起始点 2终点
    @property([cc.Node])
    carPs: cc.Node[] = [];

    @property(cc.Node)
    zhangaiwu_shitou_P: cc.Node = null;
    @property(cc.Node)
    zhangaiwu_shigong_P: cc.Node = null;
    @property(cc.Node)
    zhangaiwu_lajitong_P: cc.Node = null;
    @property(cc.Node)
    zhangaiwu_zhuzi_P: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        // Emitter.remove('onAddTrafficlights', this.onAddTrafficlights,this)
    }
    registerEmitter(){
        // Emitter.register('onAddTrafficlights', this.onAddTrafficlights,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

    }

    start () {

    }

    // update (dt) {}
}

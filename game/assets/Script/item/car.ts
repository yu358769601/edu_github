// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import UtilsAction from "../System/Utils/UtilsAction";
import Emitter from "../System/Msg/Emitter";
import Utils from "../System/Utils/Utils";
import ccLog from "../System/Log/ccLog";
import {SoundType} from "../System/sound/sound";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Car extends cc.Component {

    @property(cc.Sprite)
    carNode: cc.Sprite = null;

    @property([cc.SpriteFrame])
    carNodeSpriteFrame: cc.SpriteFrame []= [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    setData(data){
        // Emitter.fire('onTipsShow', {txt: "危险" + addExp + "经验"})
        // {
        //     carStart_P : self.carStart_P,
        //         carEnd_P : self.carEnd_P
        // }
        let index = Utils.random(0,3)
        let carNodeSprite = this.carNodeSpriteFrame[index]

        ccLog.log("有没有车","索引",index,"内容",carNodeSprite)

        this.carNode.spriteFrame = carNodeSprite

        Emitter.fire("onPlaySound",SoundType.SJ_game_08_汽车驶过)
        UtilsAction.moveTo(this.node,4,data.carEnd_P.x,data.carEnd_P.y,()=>{
            this.node.destroy()
        })
    }
    // update (dt) {}
}

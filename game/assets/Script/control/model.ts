// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {playerSpType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Model extends cc.Component {

    @property(sp.Skeleton)
    sp: sp.Skeleton = null;


    onLoad () {

    }

    onPlay(type) {
        let res = null
        switch (type) {
            case playerSpType.shizhang_zhengchang:
                res = "idle"
                this.sp.setAnimation(0, res, true);

                break
            case playerSpType.shizhang_happy:
                res = "happy"
                this.sp.setAnimation(0, res, true);
                break

        }
    }


    start () {

    }

    // update (dt) {}
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Follow extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (!this.target) {
            return;
        }
        var follow = cc.follow(this.target, cc.rect(0,0, 2000,2000));
        this.node.runAction(follow);
    }

    start () {

    }

    // update (dt) {}
}

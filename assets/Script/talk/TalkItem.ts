// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class TalkItem extends cc.Component {

    @property(cc.Node)
    leftchat_Node: cc.Node = null;
    @property(cc.Label)
    leftchat_Node_Label: cc.Label = null;
    @property(cc.Node)
    leftchat_Node_next: cc.Node = null;
    @property(cc.Sprite)
    leftchat_Node_head: cc.Sprite = null;


    @property(cc.Node)
    rightchat_Node: cc.Node = null;
    @property(cc.Label)
    rightchat_Node_Label: cc.Label = null;
    @property(cc.Node)
    rightchat_Node_next: cc.Node = null;
    @property(cc.Sprite)
    rightchat_Node_head: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

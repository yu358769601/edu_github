import Utils from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UtilsAction extends cc.Component {
    // UtilsAction.moveTo()
    static moveTo(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise <any>((resolve, reject) => {
            node.stopAllActions()
            let interval = cc.moveTo(duration, x, y);
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })
    }
    static moveToByEaseElasticInOut(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        return new Promise <any>((resolve, reject) => {
            node.stopAllActions()
            let interval = cc.moveTo(duration, x, y).easing(cc.easeElasticInOut(duration));;
            let callbacktemp = cc.callFunc(() => {
                if (callback) {
                    callback()
                }
                resolve()
            }, this);
            let sequence = cc.sequence(interval, callbacktemp);
            node.runAction(sequence);
        })
    }
    //永远从一个地方到另一个地方
    // UtilsAction.moveByRepeatForeverX(node,duration,x,y)
    static moveByRepeatForeverX(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y);
        let interval2 = cc.moveBy(0.01, -x, y);
        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(interval1, interval2);
        let repeatForever = cc.repeatForever(sequence);
        node.runAction(repeatForever);
    }
    static moveToRepeatForeverXY(node: cc.Node, duration: number, x1: number, y1: number, x2: number, y2: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveTo(duration, x1, y1);
        let interval2 = cc.moveTo(duration, x2, y2);
        let callbacktemp1 = cc.callFunc(()=> {
            if (callback) {
                callback(0)
            }
        }, this);
        let callbacktemp2 = cc.callFunc(()=> {
            if (callback) {
                callback(1)
            }
        }, this);
        let sequence = cc.sequence(callbacktemp1,interval1,callbacktemp2, interval2);
        let repeatForever = cc.repeatForever(sequence);
        node.runAction(repeatForever);
    }
    static moveByRepeatForeverXY(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y);
        let interval2 = cc.moveBy(0.01, -x, -y);
        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(interval1, interval2);
        let repeatForever = cc.repeatForever(sequence);
        node.runAction(repeatForever);
    }

    // UtilsAction.moveBy()
    static moveBy(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval = cc.moveBy(duration, x, y);
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.scaleTo()
    static scaleTo(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval = cc.scaleTo(duration, x, y);
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.heartbeat()
    static heartbeat(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.scaleTo(duration, x, y);
        let interval2 = cc.scaleTo(duration, 1, 1);
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, callbacktemp);
        node.runAction(sequence);
    }
    static heartbeatRepeatForever(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.scaleTo(duration, 1, 1).easing(cc.easeElasticInOut(duration));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }
    // UtilsAction.hpJump()
    static hpJump(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.jumpBy(duration, x, y, 100, 1);
        let interval2 = cc.fadeOut(1);
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    static hpTop(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.jumpBy(duration, x, y, 100, 1);
        let interval2 = cc.fadeOut(1);
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.fadeOut()
    static fadeOut(node: cc.Node, duration: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.fadeOut(duration);
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, callbacktemp);
        node.runAction(sequence);
    }
    static fadeIn(node: cc.Node, duration: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.fadeIn(duration);
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, callbacktemp);
        node.runAction(sequence);
    }
    // UtilsAction.sidePullBoxLayout_start(node,callback)
    static sidePullBoxLayout_start(node: cc.Node, callback) {
        node.stopAllActions()
        let interval1 = cc.fadeIn(0.5);
        let interval2 = cc.moveBy(0.5, 0, -300).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.sidePullBoxLayout_stop(node,callback)
    static sidePullBoxLayout_stop(node: cc.Node, callback) {
        node.stopAllActions()
        let interval1 = cc.fadeOut(0.5);
        let interval2 = cc.moveBy(0.5, 0, 300).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.swing(node)
    static swing(node: cc.Node) {
        node.stopAllActions()
        let interval1 = cc.rotateTo(0.1, 10).easing(cc.easeInOut(0.5));
        let interval2 = cc.rotateTo(0.1, -10).easing(cc.easeInOut(0.5));
        let interval3 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.5));
        let interval4 = cc.rotateTo(0.5, 0).easing(cc.easeInOut(0.5));
        let interval5 = cc.rotateTo(0.1, 20).easing(cc.easeInOut(0.5));
        let interval6 = cc.rotateTo(0.1, -20).easing(cc.easeInOut(0.5));
        let interval7 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.5));
        let interval8 = cc.rotateTo(0.25, 0).easing(cc.easeInOut(0.5));
        // let interval2 = cc.moveBy(1,-100,0).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(interval1, interval2, interval3, interval4, interval5, interval6, interval7, interval8);
        let rep = cc.repeatForever(sequence)
        node.runAction(rep);
    }

    //掉落小怪
    // UtilsAction.drop(node,endp,callback)
    static drop(node: cc.Node, endp, callback) {
        node.stopAllActions()

        let interval1 = cc.jumpTo(Utils.random(50, 100) / 100, endp, Utils.random(0, 100) * Utils.randomZF(), 1);
        let interval2 = cc.jumpBy(Utils.random(80, 150) / 100, cc.v2(Utils.random(50, 150) * Utils.randomZF(), Utils.random(50, 100) * Utils.randomZF()), Utils.random(50, 100), Utils.random(1, 3)).easing(cc.easeElasticOut(1));
        // let spawn = cc.spawn(interval1,interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, callbacktemp);
        node.runAction(sequence);
    }

    // UtilsAction.hunt(node,endp,callback)
    //跳 吃怪兽
    static hunt(node: cc.Node, endp, callback) {
        node.stopAllActions()

        let interval1 = cc.jumpTo(Utils.random(20, 50) / 100, endp, Utils.random(100, 200), 1);
        let interval2 = cc.jumpBy(Utils.random(10, 60) / 100, cc.v2(0, 0), Utils.random(5, 100), Utils.random(1, 4));
        // let spawn = cc.spawn(interval1,interval2)

        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, interval2, callbacktemp);
        node.runAction(sequence);
    }

    //蛋里出生
    // UtilsAction.born(node,x,y,callback)
    static born(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticOut(duration));
        let interval2 = cc.fadeIn(duration).easing(cc.easeElasticOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }
    // 透明从大到小最后弹一下
    // UtilsAction.scaleToAndfadeIn(node,oldx,oldy,x,y,callback)
    static scaleToAndfadeIn(node: cc.Node, duration: number,oldx : number, oldy: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        node.scaleX = oldx
        node.scaleY = oldy
        node.opacity = 0
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticOut(duration));
        let interval2 = cc.fadeIn(duration).easing(cc.easeElasticOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }
    // UtilsAction.scaleToAndfadeOut(node,duration,oldx,oldy,x,y,callback)
    static scaleToAndfadeOut(node: cc.Node, duration: number,oldx : number, oldy: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        node.scaleX = oldx
        node.scaleY = oldy
        node.opacity = 255
        let interval1 = cc.scaleTo(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.fadeOut(duration).easing(cc.easeElasticInOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }
    static scaleToAndfadeOut_sequence(node: cc.Node, scaleToduration: number, fadeOutduration: number,oldx : number, oldy: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        node.scaleX = oldx
        node.scaleY = oldy
        node.opacity = 255
        let interval1 = cc.scaleTo(scaleToduration, x, y).easing(cc.easeElasticInOut(scaleToduration/2));
        let interval2 = cc.fadeOut(fadeOutduration).easing(cc.easeElasticInOut(fadeOutduration/2));
        // let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1,interval2, callbacktemp);
        node.runAction(sequence);
    }


    //击打效果
    // UtilsAction.hit(node)
    static hit(node: cc.Node) {
        node.stopAllActions()
        let interval1 = cc.rotateTo(0.1, 10).easing(cc.easeInOut(0.1));
        let interval2 = cc.rotateTo(0.1, -10).easing(cc.easeInOut(0.1));
        let interval3 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.1));
        let interval4 = cc.scaleTo(0.2, 1.2, 1.2)
        let interval5 = cc.rotateTo(0.1, 0).easing(cc.easeInOut(0.1));
        let interval6 = cc.rotateTo(0.05, 20).easing(cc.easeInOut(0.1));
        let interval7 = cc.rotateTo(0.05, -20).easing(cc.easeInOut(0.1));
        let interval8 = cc.scaleTo(0.2, 1.3, 1.3)
        let interval9 = cc.rotateTo(0.05, 0).easing(cc.easeInOut(0.1));
        let interval10 = cc.scaleTo(0.2, 1, 1)
        let interval11 = cc.rotateTo(0.05, 0).easing(cc.easeInOut(0.1));
        // let interval2 = cc.moveBy(1,-100,0).easing(cc.easeInOut(1.0));
        let spawn = cc.spawn(interval1, interval2)

        // let callbacktemp = cc.callFunc(()=> {
        //     if (callback) {
        //         callback()
        //     }
        // }, this);
        let sequence = cc.sequence(
            interval1,
            interval2,
            interval3,
            interval4,
            interval5,
            interval6,
            interval7,
            interval8,
            interval9,
            interval10,
            interval11,
        );
        // let rep = cc.repeatForever(sequence)
        node.runAction(sequence);
    }
    //上牌 准备按住移动过去
    static moveToCard(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveTo(duration, x, y+400);

        // let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval1, callbacktemp);
        node.runAction(sequence);
    }
    // UtilsAction.moveToMaPai(node)
    static moveToMaPai(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval = cc.moveTo(duration, x, y).easing(cc.easeElasticOut(duration));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval, callbacktemp);
        node.runAction(sequence);
    }
    static scaleToEaseInOut(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        // node.scaleX = 1
        // node.scaleY = 1
        let interval = cc.scaleTo(duration, x, y).easing(cc.easeElasticOut(0.5));
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(interval, callbacktemp);
        node.runAction(sequence);
    }


    // UtilsAction.gongrongTips()
    static gongrongTips(node: cc.Node, duration: number, x: number, y: number, callback: any) {
        node.stopAllActions()
        let interval1 = cc.moveBy(duration, x, y).easing(cc.easeElasticInOut(duration));
        let interval2 = cc.fadeOut(duration).easing(cc.easeElasticInOut(duration));
        let spawn = cc.spawn(interval1, interval2)
        let callbacktemp = cc.callFunc(() => {
            if (callback) {
                callback()
            }
        }, this);
        let sequence = cc.sequence(spawn, callbacktemp);
        node.runAction(sequence);
    }

}
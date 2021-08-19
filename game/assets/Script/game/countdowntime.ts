// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseComponent from "../System/Base/BaseComponent";
import Emitter from "../System/Msg/Emitter";
import ccLog from "../System/Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Countdowntime extends BaseComponent {

    @property(cc.Label)
    time: cc.Label = null;
    @property(cc.Label)
    time2: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:




    timeTag : boolean = false

    xuniTime_Old : number = 60
    shijiTime_Old : number = 10
    shijicanshu : number = 0


    xuniTime : number = 60
    shijiTime: number = 10
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onCountDownShow', this.onCountDownShow,this)
        Emitter.remove('onCountDownSuspend', this.onCountDownSuspend,this)
        Emitter.remove('onUpTime', this.onUpTime,this)
        Emitter.remove('stopTime', this.stopTime,this)
    }
    registerEmitter(){
        Emitter.register('onCountDownShow', this.onCountDownShow,this)
        Emitter.register('onCountDownSuspend', this.onCountDownSuspend,this)
        Emitter.register('onUpTime', this.onUpTime,this)
        Emitter.register('stopTime', this.stopTime,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()
    }


    start () {
        this.xuniTime = this.xuniTime_Old
        this.shijiTime = this.shijiTime_Old
        this.shijicanshu = this.xuniTime/this.shijiTime_Old
    }
    //显示 开始
    onCountDownShow(selfName,data?){
        this.timeTag = true
        this.time.node.active = true
        // xuniTime : 60,shijiTime:10
        if (data) {
            this.xuniTime_Old = data.xuniTime
            this.shijiTime_Old = data.shijiTime
        }
        this.xuniTime = this.xuniTime_Old
        this.shijiTime = this.shijiTime_Old
        this.shijicanshu = this.xuniTime/this.shijiTime_Old
        // ccLog.log("挺好的")
    }
    //暂停
    onCountDownSuspend(selfName,b){
        this.timeTag = b
        this.time.node.active = true
        // ccLog.log("時間暫停嗎 1",this.timeTag)
    }
    timeOut(){
        ccLog.log("时间到了")
        Emitter.fire("onCloseGoTips")
        Emitter.fire("onActionTag",false)
        // Emitter.fire("ontimeOutDialog")
        Emitter.fire("onOpenDialog",{name : "timeOutDialog"},()=>{

        })
    }
    onUpTime(selfName,time){
        if (this.xuniTime+time > 0) {
            this.xuniTime+=time
            this.showTime()
        } else{
            this.xuniTime = 0
            this.showTime()
            this.timeTag = false
            Emitter.fire("onActionTag",false)
            Emitter.fire("onCloseGoTips")
            // Emitter.fire("ontimeOutDialog")
            Emitter.fire("onOpenDialog",{name : "timeOutDialog"},()=>{

            })
        }

    }
    stopTime(){
        this.timeTag = false
    }


    //显示倒计时
    countDownShow(){
    }
    callBackTimeOut(id, data) {
    }
    showTime(){
        let minute = parseInt((this.xuniTime / 60).toString());
        let second = parseInt((this.xuniTime % 60).toString());
        let hour = parseInt((minute / 60).toString());
        let hour1 = hour > 60 ? hour % 24 : hour;
        minute = minute % 60;
        let timeStr = "";
        // timeStr = hour <= 0 ? timeStr =
        //     parseInt((minute / 10).toString()) + "" + minute % 10 + "" +
        //     parseInt((second / 10).toString()) + "" + second % 10:
        //     parseInt((hour1 / 10).toString()) + "" + hour1 % 10+
        //     parseInt((minute / 10).toString()) + "" + minute % 10 + "" +
        //     parseInt((second / 10).toString()) + "" + second % 10;
        // this.time.string = timeStr;
        timeStr = parseInt((minute / 10).toString()) + "" + minute % 10
        this.time.string = timeStr;
        let timeStr2 = parseInt((second / 10).toString()) + "" + second % 10
        this.time2.string = timeStr2;


    }
    update (dt) {
        if (this.timeTag == true) {
            this.shijiTime-=dt;
            this.xuniTime-=dt*this.shijicanshu;
            // ccLog.log("時間暫停嗎 2",this.timeTag,this.xuniTime)
            this.showTime()
            if (this.xuniTime <= 0) {
                this.timeTag = false
                this.timeOut()
            }
        }
    }
}

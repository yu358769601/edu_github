import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Utils extends cc.Component {
    /**Utils.random(0,2)
     * 产生随机整数，包含下限值，但不包括上限值
     * @param {Number} lower 下限
     * @param {Number} upper 上限
     * @return {Number} 返回在下限到上限之间的一个随机整数
     */
    static random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    //正1 或者 负1
    // Utils.randomZF()
    static randomZF() {
       let num = Utils.random(0,2)
        if (num == 0) {
            return -1
        }else{
            return 1
        }

    }
    static getTime(){
        let time = new Date().getTime()
        return time
    }

    static sjsz(num) {
        let ary = [];					//创建一个空数组用来保存随机数组
        for (let i = 0; i < num; i++) {			//按照正常排序填充数组
            ary[i] = i + 1;
        }
        ary.sort(function () {
            return 0.5 - Math.random();		//返回随机正负值
        });
        return ary;					//返回数组
    }
    //要一个随机数组 可以选择要多少个数字
    static sjszgetNumberByNum(num,count) {
        let ary = [];					//创建一个空数组用来保存随机数组
        for (let i = 0; i < num; i++) {			//按照正常排序填充数组
            ary[i] = i + 0;
        }
        ary.sort(function () {
            return 0.5 - Math.random();		//返回随机正负值
        });
        let temp = []
        ccLog.log("随机数组吗",ary)
        for (let i = 0; i < ary.length; i++) {
            if (i<count) {
                temp.push(ary[i])
            }
        }

        return temp;					//返回数组
    }

    // Utils.valueparseInt(value)
    static valueparseInt(value) {
        if (value >= 1000000000000000) {
            //1000000000000 万亿
            value = ((value / 10000000000000) / 100).toFixed(2) + "MT"
        } else if (value >= 1000000000000) {
            //1000000000000 万亿
            value = ((value / 10000000000) / 100).toFixed(2) + "T"
        } else if (value >= 1000000000) {
            //1000000000  十亿
            value = ((value / 10000000) / 100).toFixed(2) + "B"
        } else if (value >= 1000000) {
            //1000000 百万
            value = ((value / 10000) / 100).toFixed(2) + "M"
        } else if (value >= 1000) {
            //1000 千
            value = ((value / 10) / 100).toFixed(2) + "K"
        }
        return value;
    }

    // Utils.time2Str(time)
    static time2Str(time) {
        let minute = parseInt(time / 60);
        let second = parseInt(time % 60);
        let hour = parseInt(minute / 60);
        let hour1 = hour > 60 ? hour % 24 : hour;
        let day = parseInt(hour / 24);
        minute = minute % 60;
        let timeStr = "";
        // timeStr = hour <= 0 ? timeStr = "倒计时：" +
        //     // "00" + "天" +
        //     "00" + "时" +
        //     parseInt(minute / 10) + "" + minute % 10 + "分" +
        //     parseInt(second / 10) + "" + second % 10 + "秒" :
        //     timeStr = "倒计时：" +
        //     // parseInt(day / 10) + "" + day % 10 + "天" +
        //     parseInt(hour1 / 10) + "" + hour1 % 10 + "时" +
        //     parseInt(minute / 10) + "" + minute % 10 + "分" +
        //     parseInt(second / 10) + "" + second % 10 + "秒";
        timeStr = minute <= 0 ? timeStr = "" +
            // "00" + "天" +
            "00" + ":" +
            parseInt(second / 10) + "" + second % 10 + "" :
            timeStr = "" +
                // parseInt(day / 10) + "" + day % 10 + "天" +
                // parseInt(hour1 / 10) + "" + hour1 % 10 + "时" +
                parseInt(minute / 10) + "" + minute % 10 + ":" +
                parseInt(second / 10) + "" + second % 10 + "";
        return timeStr;
    }
    //一个单位看另一个单位
    /**
     *
     * @param target 目标单位
     * @param mynode 我的单位
     */
    // Utils.lookAtObj(target,mynode)
    static lookAtObj(target,mynode){
        //计算出朝向
        let dx = target.x - mynode.x;
        let dy = target.y - mynode.y;
        let dir = cc.v2(dx,dy);

        //根据朝向计算出夹角弧度
        let angle = dir.signAngle(cc.v2(1,0));

        //将弧度转换为欧拉角
        let degree = angle / Math.PI * 180;

        //赋值给节点
        mynode.angle = degree;
    }




   static get2Double(double){
       return parseFloat(double.toFixed(2))
    }
    static get2DoubleString(double){
        return double.toFixed(2)
    }

    static setTimerOnce(component,d){


        return new Promise <any>((resolve, reject) => {
            component.scheduleOnce(()=>{
                resolve()
            },d)
        })
    }


}
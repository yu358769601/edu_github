// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import StaticData from "../System/data/StaticData";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import JsonManager from "../manage/JsonManager";

const {ccclass, property} = cc._decorator;
//玩家的模式
export enum gongrongType
{
    第一关邻居 = "第一关邻居",
    第一关邻居共荣度 = 5,

    第三关导购 = "第三关导购",
    第三关导购共荣度 = 5,

    第三关小孩 = "第三关小孩",
    第三关小孩共荣度 = 5,

    第三关去洗手间 = "第三关去洗手间",
    第三关去洗手间共荣度 = 5,

    第四关地铁男工作人员 = "第四关地铁男工作人员",
    第四关地铁男工作人员共荣度 = 5,

    第五关天桥老板 = "第五关天桥老板",
    第五关天桥老板共荣度 = 5,

    商店女导购 = "商店女导购",
    商店女导购共荣度 = 5,
    水泥地让路 = "水泥地让路",
    水泥地让路共荣度 = 5,

    等车的人 = "等车的人",
    等车的人共荣度 = 5,

    上车绑定 = "上车绑定",
    上车绑定荣度 = 5,

    地铁车上让开 = "地铁车上让开",
    地铁车上让开共荣度= 5,

    斜坡 = "斜坡",
    斜坡共荣度 = -5,
}
@ccclass
export default class Gongrong {

    // @property(cc.Label)
    // label: cc.Label = null;
    //
    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    private static instance: Gongrong;
    public static getInstance(): Gongrong {
        if (!this.instance) {
            this.instance = new Gongrong();
        }
        return this.instance;
    }
//     Gongrong.getInstance().addData({type : gongrongType.第一关邻居,num :gongrongType.第一关邻居共荣度 },(num)=>{
//     ccLog.log("第一次增加第一关邻居共荣度",num,Gongrong.getInstance().getData())
// })
    addData(gongrongData,callBack ?,jianshao ?){
       let  data = StaticData.getInstance().getDataKeyValue("共融")
        ccLog.log("共融数值 ",data)
        if (data == null) {
            data = {}
            StaticData.getInstance().addData("共融扣分",0)
        }else{
            if (gongrongData !=null) {
                if (data[gongrongData.type] == null) {
                    if (callBack) {
                        data[gongrongData.type] = gongrongData.num
                        StaticData.getInstance().addData("共融",data)
                        ccLog.log("共融值 查看",StaticData.getInstance().getDataKeyValue("共融"))
                        Emitter.fire("onjiafen")
                        callBack(gongrongData.num)
                        return
                    }
                }else{
                    data[gongrongData.type] = gongrongData.num
                    StaticData.getInstance().addData("共融",data)
                    return
                }
            }else{
                ccLog.log("重置了吗")
                StaticData.getInstance().addData("共融",{})
                StaticData.getInstance().addData("共融扣分",0)
                return
            }
        }
        StaticData.getInstance().addData("共融",data)
    }
    // Gongrong.getInstance().koufen(fen)
    koufen(fen,callBack ?){
        let  data = StaticData.getInstance().getDataKeyValue("共融扣分")
        // ccLog.log("有没有 共融扣分 1 ",data)
        if (data == null) {
            StaticData.getInstance().addData("共融扣分",0)
        }
        data = StaticData.getInstance().getDataKeyValue("共融扣分")
        data +=fen
        // ccLog.log("有没有 共融扣分 2 ",data)
        StaticData.getInstance().addData("共融扣分",data)

        Emitter.fire("onkoufen")

    }

    // Gongrong.getInstance().getData()
    getData(){
        let mysendData = {}
        let myfen = 0
        Emitter.fire("onGongrong",{self : this},(sendData,fen)=>{
            mysendData = sendData
            myfen = fen
        })


        return myfen
    }
    // Gongrong.getInstance().getLevel()
    getLevel(){
        let data = {}
        let gongrong = this.getData()
        ccLog.log("返回什么呢",gongrong)
        // 100分- S Grade
        // 80 - 99分 A Grade
        // 60 -79  B Grade
        // 69分或以下  C Grade
        // 0  Game Over
        if (gongrong == 100) {
            data.level = "s"
            data.index = 0
        }else if (gongrong < 100 && gongrong >= 80) {
            data.level = "a"
            data.index = 1
        }else if (gongrong < 79 && gongrong >= 60) {
            data.level = "b"
            data.index = 2
        }else if (gongrong < 69 ) {
            data.level = "c"
            data.index = 3
        }


        return data

    }


    // update (dt) {}
}

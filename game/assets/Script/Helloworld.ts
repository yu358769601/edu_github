import LoadManage from "./System/Load/LoadManage";
import UIActivity from "./System/Ui/UIActivity";
import UtilsNode from "./System/Utils/UtilsNode";
import Emitter from "./System/Msg/Emitter";
import ccLog from "./System/Log/ccLog";
import JsonManager from "./manage/JsonManager";
import {chengfaPOPType, clickPOPTypeNode} from "./System/Type/enums";
import {SoundType} from "./System/sound/sound";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.ProgressBar)
    loadbar: cc.ProgressBar = null;
    @property(cc.Node)
    ActivityRoot: cc.Node = null;
    @property(cc.Node)
    LoadNode: cc.Node = null;
    @property(cc.Camera)
     mainCamera: cc.Camera = null;

    @property(cc.Node)
    edu: cc.Node = null;
    @property
    text: string = 'hello';

    @property(cc.Node)
    DialogRoot: cc.Node = null;
    @property(cc.Node)
    clickButtonLayout: cc.Node = null;

    loadResNamePath : {[path: string]: string} = null
    loadResNamePoolPath : {[path: string]: string} = null

    static photoframe : {[path: string]: string} = null
    physicsManager = null
    FrameRate : number = 0
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onGetCamera', this.onGetCamera,this)
    }
    registerEmitter(){
        Emitter.register('onGetCamera', this.onGetCamera,this)
    }
    onGetCamera(selfName,self,callback){
        if (callback) {
            callback(self,this.mainCamera)
        }
    }
    async start () {


         // Emitter.fire("onPlay")

         // let eduTip = await UtilsNode.getNode("eduTip",this.edu);

         // NLog.level = 0
         // NLog.print(1,"111","测试")

         // ccLog.log("怎么说",{id : 11})
         // cc.log("确定是走到我这了是吧 0",eduTip)
         // eduTip.getComponent("EduTip").initView()
    }

    //初始化相框的关联
    //Helloworld.initPhotoframe

    //Helloworld.getPhotoframe(name)
    // static getPhotoframe(name){
    //
    //     return this.loadResNamePath["Photoframe"+name]
    // }

    initloadRes(){
        this.loadResNamePath = {}


        this.loadResNamePath["Pre_shizhang_1"] = "Checkpoint/Pre_shizhang_1"
        this.loadResNamePath["Pre_shizhang_2"] = "Checkpoint/Pre_shizhang_2"
        this.loadResNamePath["Pre_shizhang_3"] = "Checkpoint/Pre_shizhang_3"
        this.loadResNamePath["Pre_shizhang_4"] = "Checkpoint/Pre_shizhang_4"
        this.loadResNamePath["Pre_shizhang_5"] = "Checkpoint/Pre_shizhang_5"
        this.loadResNamePath["Pre_shizhang_6"] = "Checkpoint/Pre_shizhang_6"
        this.loadResNamePath["Pre_shizhang_7"] = "Checkpoint/Pre_shizhang_7"


    }
    initJson(){
        let load = {}
        load["talkList"] = "json/talkList"
        load["gameSetting"] = "json/gameSetting"

        return load
    }
    initPre(){
        let load = {}
        load["Pre_shizhang_0"] = "Checkpoint/Pre_shizhang_0"
        load["Pre_shizhang_1"] = "Checkpoint/Pre_shizhang_1"
        load["Pre_shizhang_2"] = "Checkpoint/Pre_shizhang_2"
        load["Pre_shizhang_3"] = "Checkpoint/Pre_shizhang_3"
        load["Pre_shizhang_4"] = "Checkpoint/Pre_shizhang_4"
        load["Pre_shizhang_5"] = "Checkpoint/Pre_shizhang_5"
        load["Pre_shizhang_6"] = "Checkpoint/Pre_shizhang_6"
        load["Pre_shizhang_7"] = "Checkpoint/Pre_shizhang_7"

        load["player"] = "pre/player"
        load["Trafficlights"] = "pre/Trafficlights"

        load["car"] = "pre/car"
        load["tips"] = "pre/tips"
        load["itemPop"] = "pre/itemPop"
        load["timeOutDialog"] = "pre/timeOutDialog"
        load["TalkItem"] = "pre/TalkItem"
        load["playerClickPOP"] = "pre/playerClickPOP"



        load["blind_normal"] = "player/blind_normal"
        load["blind_warning"] = "player/blind_warning"
        load["blind_trap"] = "player/blind_trap"


        load["wheel_normal"] = "player/wheel_normal"
        load["wheel_trap"] = "player/wheel_trap"
        load["wheel_happe"] = "player/wheel_happe"
        load["wheel"] = "sp/wheel/wheel"
        load["blind"] = "sp/blind/blind"


        //加载声音
        load["GreenlightAudio"] = "audio/GreenlightAudio"
        load["RedlightAudio"] = "audio/RedlightAudio"

        load["chat_head_bus_driver"] = "dialogbox/chat_head_bus_driver"
        load["chat_head_child"] = "dialogbox/chat_head_child"
        load["chat_head_NPC01"] = "dialogbox/chat_head_NPC01"
        load["chat_head_shop_A"] = "dialogbox/chat_head_shop_A"
        load["chat_head_shop_B"] = "dialogbox/chat_head_shop_B"
        load["chat_head_train_girl"] = "dialogbox/chat_head_train_girl"
        load["chat_head_train_man"] = "dialogbox/chat_head_train_man"
        load["chat_head_wheel"] = "dialogbox/chat_head_wheel"
        load["chat_head_NPC06"] = "dialogbox/chat_head_NPC06"
        load["chat_head_wheel_TALKING_v2"] = "dialogbox/chat_head_wheel_TALKING_v2"
        load["chat_head_blind_TALKING_v2"] = "dialogbox/chat_head_blind_TALKING_v2"

        load["chat_head_bus_driver_TALKING"] = "dialogbox/chat_head_bus_driver_TALKING"
        load["chat_head_NPC01_TALKING"] = "dialogbox/chat_head_NPC01_TALKING"
        load["chat_head_shop_A_TALKING"] = "dialogbox/chat_head_shop_A_TALKING"
        load["chat_head_train_girl_TALKING"] = "dialogbox/chat_head_train_girl_TALKING"
        load["chat_head_train_man_TALKING"] = "dialogbox/chat_head_train_man_TALKING"
        load["chat_head_wheel_TALKING"] = "dialogbox/chat_head_wheel_TALKING"
        load["chat_head_NPC02"] = "dialogbox/chat_head_NPC02"
        load["chat_head_NPC04"] = "dialogbox/chat_head_NPC04"
        load["chat_head_clean"] = "dialogbox/chat_head_clean"
        load["NPC-char01_A"] = "dialogbox/NPC-char01_A"
        load["NPC-char01_B"] = "dialogbox/NPC-char01_B"
        load["NPC-char01_C"] = "dialogbox/NPC-char01_C"
        load["NPC-char01_D"] = "dialogbox/NPC-char01_D"
        load["NPC-char01_E"] = "dialogbox/NPC-char01_E"
        load["NPC-char01_F"] = "dialogbox/NPC-char01_F"



        return load
    }
    initActivity(){
        let load = {}
        load["GameMenuActivity"] = "activity/GameMenuActivity"
        load["GameActivity"] = "activity/GameActivity"
        load["SelectCheckPointActivity"] = "activity/SelectCheckPointActivity"
        load["transitionsDialog"] = "dialog/transitionsDialog"
        return load
    }
    //第一次加载
    initFirstLoad(){
        let load = {}
        let jsonLoad = this.initJson()
        this.addList(load,jsonLoad)
        let pre = this.initPre()
        this.addList(load,pre)

        let activity = this.initActivity()
        this.addList(load,activity)

        // let firstSP = this.initFirstSP()
        // this.addList(load,firstSP)

        return load
    }

    playerSound(){
        let load = {}
        let sound = this.initSound()
        this.addList(load,sound)
        return load
    }

    addList(arr1,arr2){
        for (let item in arr2) {
            arr1[item] = arr2[item]
        }

        return arr1
    }
    initSound(){
        let load = {}
        // 按钮 = "按钮",
        //     擦除失败 = "擦除失败",
        //     成功音效 = "成功音效",
        //     成人擦除1 = "成人擦除1",
        //     初始擦除音效 = "初始擦除音效",
        //     恶搞擦除音效1 = "恶搞擦除音效1",
        //     恶搞擦除音效2 = "恶搞擦除音效2",
        //     获得奖励 = "获得奖励",
        //     可爱擦除1 = "可爱擦除1",
        //     可爱擦除2 = "可爱擦除2",.
        // 每5关解锁新橡皮 = "每5关解锁新橡皮",
        //     胜利弹出胜利界面时播放 = "胜利弹出胜利界面时播放",
        //     在商店购买到新皮肤时 = "在商店购买到新皮肤时",
        // load["sound_"+SoundType.標題到教程結束] = "mp3/"+SoundType.標題到教程結束
        // load["sound_"+SoundType.第1_4關] = "mp3/"+SoundType.第1_4關
        // load["sound_"+SoundType.第5_8關] = "mp3/"+SoundType.第5_8關
        // load["sound_"+SoundType.小動畫專用] = "mp3/"+SoundType.小動畫專用
        // load["sound_"+SoundType.結局用] = "mp3/"+SoundType.結局用
        // load["sound_"+SoundType.SJ_game_01_UI点击START] = "mp3/"+SoundType.SJ_game_01_UI点击START
        // load["sound_"+SoundType.SJ_game_01_UI扫光] = "mp3/"+SoundType.SJ_game_01_UI扫光
        // load["sound_"+SoundType.SJ_game_02_UI各種框出来声音] = "mp3/"+SoundType.SJ_game_02_UI各種框出来声音
        // load["sound_"+SoundType.SJ_game_02_UI确认] = "mp3/"+SoundType.SJ_game_02_UI确认
        // load["sound_"+SoundType.SJ_game_04_UI点击声音] = "mp3/"+SoundType.SJ_game_04_UI点击声音
        // load["sound_"+SoundType.SJ_game_04_UI电动轮椅行走] = "mp3/"+SoundType.SJ_game_04_UI电动轮椅行走
        // load["sound_"+SoundType.SJ_game_04_UI电梯到叮的声音] = "mp3/"+SoundType.SJ_game_04_UI电梯到叮的声音
        // load["sound_"+SoundType.SJ_game_04_UI电梯门关闭] = "mp3/"+SoundType.SJ_game_04_UI电梯门关闭
        // load["sound_"+SoundType.SJ_game_04_UI电梯门开启] = "mp3/"+SoundType.SJ_game_04_UI电梯门开启
        // load["sound_"+SoundType.SJ_game_05_UI扣分音效] = "mp3/"+SoundType.SJ_game_05_UI扣分音效
        // load["sound_"+SoundType.SJ_game_05_UI撞到东西] = "mp3/"+SoundType.SJ_game_05_UI撞到东西
        // load["sound_"+SoundType.SJ_game_06_UIGO出现音效] = "mp3/"+SoundType.SJ_game_06_UIGO出现音效
        // load["sound_"+SoundType.SJ_game_07_UI成功加分音效] = "mp3/"+SoundType.SJ_game_07_UI成功加分音效
        // load["sound_"+SoundType.SJ_game_08_红灯音效] = "mp3/"+SoundType.SJ_game_08_红灯音效
        // load["sound_"+SoundType.SJ_game_08_绿灯音效] = "mp3/"+SoundType.SJ_game_08_绿灯音效
        // load["sound_"+SoundType.SJ_game_08_汽车驶过] = "mp3/"+SoundType.SJ_game_08_汽车驶过
        // load["sound_"+SoundType.SJ_game_09_撞到路障声音] = "mp3/"+SoundType.SJ_game_09_撞到路障声音
        // load["sound_"+SoundType.SJ_game_10_撞到男人] = "mp3/"+SoundType.SJ_game_10_撞到男人
        // load["sound_"+SoundType.SJ_game_10_撞到女人] = "mp3/"+SoundType.SJ_game_10_撞到女人
        // load["sound_"+SoundType.SJ_game_11_撞到垃圾桶] = "mp3/"+SoundType.SJ_game_11_撞到垃圾桶
        // load["sound_"+SoundType.SJ_game_12_成功通关] = "mp3/"+SoundType.SJ_game_12_成功通关
        // load["sound_"+SoundType.SJ_game_13_拖地声] = "mp3/"+SoundType.SJ_game_13_拖地声
        // load["sound_"+SoundType.SJ_game_14_开关门声] = "mp3/"+SoundType.SJ_game_14_开关门声
        // load["sound_"+SoundType.SJ_game_14_商场电梯声音] = "mp3/"+SoundType.SJ_game_14_商场电梯声音
        // load["sound_"+SoundType.SJ_game_15_地铁关门声] = "mp3/"+SoundType.SJ_game_15_地铁关门声
        // load["sound_"+SoundType.SJ_game_15_放下板子的声音] = "mp3/"+SoundType.SJ_game_15_放下板子的声音
        // load["sound_"+SoundType.SJ_game_17_公交车行走停车声音] = "mp3/"+SoundType.SJ_game_17_公交车行走停车声音
        // load["sound_"+SoundType.SJ_game_17_机械板子伸出音效] = "mp3/"+SoundType.SJ_game_17_机械板子伸出音效
        // load["sound_"+SoundType.SJ_game_17_机械板子伸出音效] = "mp3/"+SoundType.SJ_game_17_机械板子伸出音效
        // load["sound_"+SoundType.SJ_game_19_行李箱拉动声] = "mp3/"+SoundType.SJ_game_19_行李箱拉动声
        // load["sound_"+SoundType.SJ_game_19_卡扣声] = "mp3/"+SoundType.SJ_game_19_卡扣声
        // load["sound_"+SoundType.SJ_game_21_喷水池声音] = "mp3/"+SoundType.SJ_game_21_喷水池声音
        // load["sound_"+SoundType.SJ_game_22_闪闪发光] = "mp3/"+SoundType.SJ_game_22_闪闪发光
        // load["sound_"+SoundType.SJ_game_22_胜利音效] = "mp3/"+SoundType.SJ_game_22_胜利音效



        for (let item in SoundType){
            // cc.log("具体什么呢 ",item)

            load["sound_"+SoundType[item]] = "mp3/"+SoundType[item]

        }

        cc.log("具体什么呢 ",load)
        return load
    }
     async onLoad() {
        // ccLog.log("判断呢 减少共融值",chengfaPOPType)

         //css加入
         //html, body {margin:0; padding:0; width:100%; height:100%}

         // <meta name="viewport" content="user-scalable=no, width=device-width" />

         cc.director.getCollisionManager().enabled=true;
         // cc.director.getCollisionManager().enabledDebugDraw = true;

         cc.director.getPhysicsManager().enabled = true; // 开启了物理引擎
         let Bits = cc.PhysicsManager.DrawBits; // 这个是我们要显示的类型
         // cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
         cc.director.getPhysicsManager().gravity = new cc.Vec2(0, -320)
         // this.physicsManager = cc.director.getPhysicsManager()
         // this.physicsManager.enabledAccumulator = true

            // cc.game.setFrameRate(60)
         // cc.director.getScheduler().setTimeScale(2);
         // this.physicsManager.FIXED_TIME_STEP = 1 / 20;
         this.removeEmitter()
         this.registerEmitter()

         ccLog.logTag = true
         // ccLog.logTag = false
         // init logic
         this.label.string = this.text;
         // 恐龙
         // this.initloadRes()



         //编辑器
         // this.ByEdit()


         // LoadManage.initPool(this.loadResNamePoolPath);
         //
         UIActivity.initView(this.ActivityRoot)
         await LoadManage.starLoad(this.initFirstLoad(),{
             schedule : (currentCount,count)=>{
                 // cc.log("回调进度",currentCount,"/",count);
                 this.loadbar.progress = currentCount/count

             },
             itemCallback : async (item)=>{
                 // cc.log("图片加载完成",item);
             },
             scheduleEnd : (currentCount,count)=>{

             },
             });
         await LoadManage.starLoad(this.playerSound(),{
             schedule : (currentCount,count)=>{
                 // cc.log("回调进度",currentCount,"/",count);
                 this.loadbar.progress = currentCount/count

             },
             itemCallback : async (item)=>{

                 // this.tempSprite.spriteFrame = await LoadManage.getSpriteForName(item)
                 Emitter.fire("onLoadPlaySound",item)
             },
             scheduleEnd :async (currentCount,count)=>{
                 await JsonManager.initJson()
                 UIActivity.startToActivity("GameMenuActivity",{id:999})
             },
         });




    }

     update(dt: number): void {
        // let FrameRate = cc.game.getFrameRate()
        //  if (this.FrameRate != FrameRate) {
        //
        //      console.log("获取当前帧率",FrameRate)
        //      // cc.PhysicsManager.FIXED_TIME_STEP=1/FrameRate
        //      this.FrameRate = FrameRate
        //  }
        //  this.physicsManager.enabled = true;
        //  this.physicsManager.update(0.5*dt);
        //  this.physicsManager.enabled = false;
    }

    initListening(){

    }

}

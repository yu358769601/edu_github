// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import Emitter from "../Msg/Emitter";
import UtilsDB from "../Utils/UtilsDB";
import LoadManage from "../Load/LoadManage";
import ccLog from "../Log/ccLog";

const {ccclass, property} = cc._decorator;
// Opening: 標題到教程結束
// EDU_L1_L4: 1-4關
// EDU_L5_L8: 5關用到最後一關
// Edu_Ani: 小動畫專用
// EDU_Ending: 結局用
export enum SoundType {
    標題到教程結束 = "Opening",
    第1_4關 = "EDU_L1_L4",
    第5_8關 = "EDU_L5_L8",
    小動畫專用 = "Edu_Ani",
    結局用 = "EDU_Ending",
    SJ_game_01_UI点击START = "SJ_game_01_UI 点击START",
    SJ_game_01_UI扫光 = "SJ_game_01_UI 扫光",
    SJ_game_02_UI各種框出来声音 = "SJ_game_02_UI 各種框出来声音",
    SJ_game_02_UI确认 = "SJ_game_02_UI 确认",
    SJ_game_04_UI点击声音 = "SJ_game_04_UI 点击声音",
    SJ_game_04_UI电动轮椅行走 = "SJ_game_04_UI 电动轮椅行走",
    SJ_game_04_UI电梯到叮的声音 = "SJ_game_04_UI 电梯到 叮的声音",
    SJ_game_04_UI电梯门关闭 = "SJ_game_04_UI 电梯门关闭",
    SJ_game_04_UI电梯门开启 = "SJ_game_04_UI 电梯门开启",
    SJ_game_05_UI扣分音效 = "SJ_game_05_UI 扣分音效",
    SJ_game_05_UI撞到东西 = "SJ_game_05_UI 撞到东西",
    SJ_game_06_UIGO出现音效 = "SJ_game_06_UI GO出现音效",
    SJ_game_07_UI成功加分音效 = "SJ_game_07_UI 成功加分音效",
    SJ_game_08_红灯音效 = "SJ_game_08_红灯音效", //
    SJ_game_08_绿灯音效 = "SJ_game_08_绿灯音效", //
    SJ_game_08_汽车驶过 = "SJ_game_08_汽车驶过",
    SJ_game_09_撞到路障声音 = "SJ_game_09_撞到路障声音",
    SJ_game_10_撞到男人 = "SJ_game_10_撞到男人",
    SJ_game_10_撞到女人 = "SJ_game_10_撞到女人",
    SJ_game_11_撞到垃圾桶 = "SJ_game_11_撞到垃圾桶",
    SJ_game_12_成功通关 = "SJ_game_12_成功通关",
    SJ_game_13_拖地声 = "SJ_game_13_拖地声", //
    SJ_game_14_开关门声 = "SJ_game_14_开关门声",
    SJ_game_14_商场电梯声音 = "SJ_game_14_商场电梯声音",
    SJ_game_15_地铁关门声 = "SJ_game_15_地铁关门声",
    SJ_game_15_放下板子的声音 = "SJ_game_15_放下板子的声音",
    SJ_game_17_公交车行走停车声音 = "SJ_game_17_公交车行走停车声音",
    SJ_game_17_机械板子伸出音效 = "SJ_game_17_机械板子伸出音效",
    SJ_game_19_行李箱拉动声 = "SJ_game_19_行李箱拉动声",
    SJ_game_19_卡扣声 = "SJ_game_19_卡扣声",
    SJ_game_21_喷水池声音 = "SJ_game_21_喷水池声音", //
    SJ_game_22_闪闪发光 = "SJ_game_22_闪闪发光",
    SJ_game_22_胜利音效 = "SJ_game_22_胜利音效",
    SJ_game_23_馬桶音效 = "SJ_game_23_馬桶音效",
    SJ_game_22_勝利_A = "SJ_game_22_勝利 A",
    SJ_game_22_勝利_S = "SJ_game_22_勝利 S",
    // Emitter.fire("onPlaySound",SoundType.SJ_game_23_馬桶音效)
}

export enum SoundTypeIndex {
    標題到教程結束 = 0,
    第1_4關 = 1,
    第5_8關 = 2,
    小動畫專用 = 3,
    結局用 = 4,
    SJ_game_01_UI点击START = 5,
    SJ_game_01_UI扫光 = 6,
    SJ_game_02_UI各種框出来声音 = 7,
    SJ_game_02_UI确认 = 8,
    SJ_game_04_UI点击声音 = 9,
    SJ_game_04_UI电动轮椅行走 = 10,
    SJ_game_04_UI电梯到叮的声音 = 11,
    SJ_game_04_UI电梯门关闭 = 12,
    SJ_game_04_UI电梯门开启 = 13,
    SJ_game_05_UI扣分音效 = 14,
    SJ_game_05_UI撞到东西 = 15,
    SJ_game_06_UIGO出现音效 = 16,
    SJ_game_07_UI成功加分音效 = 17,
    SJ_game_08_红灯音效 = 18,
    SJ_game_08_绿灯音效 = 19,
    SJ_game_08_汽车驶过 = 20,
    SJ_game_09_撞到路障声音 = 21,
    SJ_game_10_撞到男人 = 22,
    SJ_game_10_撞到女人 = 23,
    SJ_game_11_撞到垃圾桶 = 24,
    SJ_game_12_成功通关 = 25,
    SJ_game_13_拖地声 = 26,
    SJ_game_14_开关门声 = 27,
    SJ_game_14_商场电梯声音 = 28,
    SJ_game_15_地铁关门声 = 29,
    SJ_game_15_放下板子的声音 = 30,
    SJ_game_17_公交车行走停车声音 = 31,
    SJ_game_17_机械板子伸出音效 = 32,
    SJ_game_19_行李箱拉动声 = 33,
    SJ_game_19_卡扣声 = 34,
    SJ_game_21_喷水池声音 = 35,
    SJ_game_22_闪闪发光 = 36,
    SJ_game_22_胜利音效 = 37,

}

@ccclass
export default class Sound extends cc.Component {

    // @property(cc.Label)
    as: cc.AudioSource = null;


    @property([cc.AudioClip])
    acs: cc.AudioClip [] = [];

    // @property
    // text: string = 'hello';
    soundTag : boolean = true
    musicTag : boolean = true
    // LIFE-CYCLE CALLBACKS:
    removeEmitter() {
        Emitter.remove('onPlay', this.onPlay, this)
        Emitter.remove('onStop', this.onStop, this)
        Emitter.remove('onPause', this.onPause, this)
        Emitter.remove('onResume', this.onResume, this)
        Emitter.remove('onRewind', this.onRewind, this)
        Emitter.remove('onPlaySwitch', this.onPlaySwitch, this)
        Emitter.remove('onMusicSwitch', this.onMusicSwitch, this)

        Emitter.remove('onInitMusicSwitch', this.onInitMusicSwitch, this)
        Emitter.remove('onPlaySound', this.onPlaySound, this)
        Emitter.remove('onLoadPlaySound', this.onLoadPlaySound, this)

    }
    registerEmitter() {
        Emitter.register('onPlay', this.onPlay, this)
        Emitter.register('onStop', this.onStop, this)
        Emitter.register('onPause', this.onPause, this)
        Emitter.register('onResume', this.onResume, this)
        Emitter.register('onRewind', this.onRewind, this)
        Emitter.register('onPlaySwitch', this.onPlaySwitch, this)
        Emitter.register('onMusicSwitch', this.onMusicSwitch, this)
        Emitter.register('onInitMusicSwitch', this.onInitMusicSwitch, this)
        Emitter.register('onPlaySound', this.onPlaySound, this)
        Emitter.register('onLoadPlaySound', this.onLoadPlaySound, this)

    }
    music : string = ""


    protected onDestroy(): void {
        // cc.log(" 现在删不掉吗 ","PK");
        this.removeEmitter()
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        // this.as = this.getComponent(cc.AudioSource)

        // this.initMusicSwitch()
        // this.soundTag = UtilsDB.getSettingSound()
    }
    onPlay(){
        // this.as.play()
    }
    onPlaySwitch(){
        if (UtilsDB.getSettingSound()) {
            // this.soundTag = false
            UtilsDB.setSettingSound(false)
        }else{
            // this.soundTag = true
            UtilsDB.setSettingSound(true)
        }
    }

    setMusic(music){
        if (music != null) {
            this.music = music
        }else{
            this.music = SoundType.小動畫專用
        }
    }

    async onInitMusicSwitch(selfName,music ?,volume ?){
        if (UtilsDB.getSettingMusic()) {
            let myVolume = 1
            if (volume != null) {
                myVolume = volume
            }
            // this.as.stop()
            this.setMusic(music)

            // if (cc.audioEngine.isMusicPlaying() == false) {
            //
            // }

            cc.audioEngine.resumeMusic()
            // let audioClip =  await LoadManage.getAudioClipForName("sound"+"_"+this.music)
            cc.audioEngine.setMusicVolume(myVolume)
            // cc.audioEngine.playMusic(audioClip,true)

            // this.as.loop = true
            // this.as.play()
            // this.musicTag = false
            // }
        }
        else{
            cc.audioEngine.setMusicVolume(0)
            cc.audioEngine.pauseMusic()
            // this.as.stop()
        }
    }

    // Emitter.fire("onMusicSwitch",SoundType.結局用)
    async onMusicSwitch(selfName,music ?,volume ?){
        ccLog.log("开始响",music,UtilsDB.getSettingMusic())
        if (UtilsDB.getSettingMusic()) {
            let myVolume = 1
            if (volume != null) {
                myVolume = volume
            }
            // if (this.as.isPlaying) {
            // this.as.stop()
            // this.as.loop = true
            // this.as.play()
            this.setMusic(music)

            cc.audioEngine.setMusicVolume(0)
            cc.audioEngine.stopMusic()
            let audioClip =  await LoadManage.getAudioClipForName("sound"+"_"+this.music)

            cc.audioEngine.setMusicVolume(myVolume)
            cc.audioEngine.playMusic(audioClip,true)

            // this.musicTag = true
            UtilsDB.setSettingMusic(true)
            // }
        }
        else{
            // this.as.stop()
            cc.audioEngine.setMusicVolume(0)
            cc.audioEngine.pauseMusic()
            // this.musicTag = false
            UtilsDB.setSettingMusic(false)
        }
    }
    onStop(){
        this.as.stop()
    }
    onPause(){
        this.as.pause()
    }
    onResume(){
        this.as.resume()
    }
    onRewind(){
        this.as.rewind()
    }
    start () {
    }
    async soundAudioClip(name,volume ?){
        ccLog.log("要播放这个音效了 ",name,volume)
        if (UtilsDB.getSettingSound()){
            let audioClip =  await LoadManage.getAudioClipForName("sound"+"_"+name)
            // goumaijineng
            ccLog.log("好用了吗",audioClip)
            if (volume) {
                // cc.audioEngine.stopEffect(id);
                cc.audioEngine.setEffectsVolume(volume)
                let audioID = cc.audioEngine.playEffect(audioClip, false);
                ccLog.log("好用了吗 有声音",audioClip)
                // ccLog.log("判断","名字",name,"对应id",audioID)
                cc.audioEngine.setFinishCallback(audioID, function () {
                    // console.log("判断","名字播完",name,"对应id",audioID)
                    cc.audioEngine.stopEffect(audioID);
                });

            }else{
                cc.audioEngine.setEffectsVolume(1)
                let audioID =  cc.audioEngine.playEffect(audioClip, false);
                ccLog.log("好用了吗 没声音",audioClip)
                // ccLog.log("判断","名字",name,"对应id",audioID)
                cc.audioEngine.setFinishCallback(audioID, function () {
                    // console.log("判断","名字播完",name,"对应id",audioID)
                    cc.audioEngine.stopEffect(audioID);
                });
            }

        }
    }


    // Emitter.fire("onPlaySound",SoundType.初始擦除音效)
    async onPlaySound(selfName,sound){
        // ccLog.log("点了购买小怪")
        this.soundAudioClip(sound)
    }

    // Emitter.fire("onLoadPlaySound",SoundType.初始擦除音效)
    async onLoadPlaySound(selfName,sound){
        // ccLog.log("点了购买小怪")
        let audioClip =  await LoadManage.getAudioClipForName(sound)
            cc.audioEngine.setEffectsVolume(0)
            let audioID = cc.audioEngine.playEffect(audioClip, false);
        cc.audioEngine.stopEffect(audioID);
        ccLog.log("预加载播放声音",sound);
    }

    // update (dt) {}
}

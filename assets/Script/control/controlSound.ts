// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {SoundType, SoundTypeIndex} from "../System/sound/sound";
import Emitter from "../System/Msg/Emitter";
import Tools from "../System/Utils/Tools";
import Vec2 = cc.Vec2;
import {ZindexType} from "../System/Type/enums";

const {ccclass, property} = cc._decorator;




export enum ControlSoundAutoType {
    开始自己响 = 0,
    开始自己不响 = 1,
}
export enum ControlSoundTypeDistance {
    不受距离影响 = 0,
    受到距离影响 = 1,
}

export enum ControlSoundModeType {
    只响一次 = 0,
    持续的响有间隔 = 1,
    不响 = 2,
}

@ccclass
export default class ControlSound extends cc.Component {

    @property(
        {
            type: cc.Enum(SoundTypeIndex),
            displayName: "音乐名字",
            tooltip: "音乐名字"
        }
    )    // call cc.Enum
    public index: number = SoundTypeIndex.SJ_game_01_UI扫光


    @property(
        {
            type: cc.Enum(ControlSoundAutoType),
            displayName: "音乐模式",
            tooltip: "音乐模式"
        }
    )    // call cc.Enum
    public autoType: number = ControlSoundAutoType.开始自己响
    @property(
        {
            type: cc.Enum(ControlSoundModeType),
            displayName: "音乐播放模式",
            tooltip: "音乐播放模式"
        }
    )    // call cc.Enum
    public soundMode: number = ControlSoundModeType.只响一次


    @property(
        {
            type: cc.Enum(ControlSoundTypeDistance),
            displayName: "距离影响类型",
            tooltip: "距离影响类型"
        }
    )    // call cc.Enum
    public distanceType: number = ControlSoundTypeDistance.不受距离影响

    @property(
        {
            type: cc.Integer,
            displayName: "最大声音距离",
            tooltip: "最大声音距离"
        }
    )    // call cc.Enum
    public soundMax: number = 300
    @property(
        {
            type: cc.Integer,
            displayName: "最小声音距离",
            tooltip: "最小声音距离"
        }
    )    // call cc.Enum
    public soundMin: number = 0


    @property(
        {
            type: cc.Integer,
            displayName: "声音间隔",
            tooltip: "声音间隔"
        }
    )    // call cc.Enum
    public upTimeMax: number = 10
    public upTime: number = 0
    // LIFE-CYCLE CALLBACKS:

    //声音列表
    soundList : string[] = []

    //声音大小
    soundVolume : number = 0


    distance : number = 0

    @property(
        {
            displayName: "其他参数"
        }
    )    // call cc.Enum
    public otherData: String = "";

    @property(
        {
            type: cc.Node,
            displayName: "测试node",
            tooltip: "测试node"
        }
    )    // call cc.Enum
    player : cc.Node = null

    onLoad () {
        this.removeEmitter()
        this.registerEmitter()


        for (let item in SoundType){
            cc.log("目前就",SoundType[item])
            this.soundList.push(SoundType[item])
        }


        cc.log("现在什么音乐",this.soundList[this.index])
        // Math.abs()
        this.initSound()


        // this.getSoundVolumeByDistance()
    }

    initSound(){
        if (this.soundMode == ControlSoundModeType.不响 ){
            return
        }
        if (this.distanceType == ControlSoundTypeDistance.不受距离影响) {
            if (this.autoType == ControlSoundAutoType.开始自己响) {
                this.soundVolume = 1
                Emitter.fire("onPlaySound",this.soundList[this.index],this.soundVolume)
            }
        }

        // else if (this.distanceType == ControlSoundTypeDistance.受到距离影响) {
        //     if (this.autoType == ControlSoundAutoType.开始自己响) {
        //         this.soundVolume = 1
        //         Emitter.fire("onPlaySound",this.soundList[this.index])
        //     }
        //
        // }
    }
    onDestroy(): void {
        this.removeEmitter()
        // super.onDestroy()
    }
    removeEmitter(){
        Emitter.remove('onGetControlSound', this.onGetControlSound,this)
        Emitter.remove('onControlSoundPlay', this.onControlSoundPlay,this)
    }
    registerEmitter(){
        Emitter.register('onGetControlSound', this.onGetControlSound,this)
        Emitter.register('onControlSoundPlay', this.onControlSoundPlay,this)

    }

    start () {

    }

    // let data = {
    //     self : this,
    //     otherData : ""
    // }
    //
    // Emitter.fire("onGetControlSound",data,(selfData,self)=>{
    //
    // })
    onGetControlSound(selfName,data,callBack) {
        //
        if (data.otherData == this.otherData) {
            if (callBack) {
                callBack(data,this)
            }
        }
    }

    //直接播放
    // let data = {
    //     self : this,
    //     otherData : "",
    //     sound: SoundTypeIndex.SJ_game_01_UI扫光,
    //     volume : 1,
    //     upTimeMax : 3
    // }
    // Emitter.fire("onControlSoundPlay",data)
    onControlSoundPlay(selfName,data){
        cc.log("现在播放 0",this.soundList[this.index])
        if (data.otherData == this.otherData) {
            this.index = data.sound
            if (data.upTimeMax) {
                this.upTimeMax = data.upTimeMax
            }
            cc.log("现在播放",this.soundList[this.index])
            Emitter.fire("onPlaySound",this.soundList[this.index],data.volume)
        }
    }

    update (dt) {
        if (this.soundMode == ControlSoundModeType.不响 ){
            return
        }
        if (this.soundMode == ControlSoundModeType.持续的响有间隔 ) {
            if (this.upTime <= this.upTimeMax) {
                this.upTime+=dt
            }else{
                this.upTime = 0
                if (this.distanceType == ControlSoundTypeDistance.不受距离影响) {
                        this.soundVolume = 1
                    Emitter.fire("onPlaySound",this.soundList[this.index],this.soundVolume)
                }else if (this.distanceType == ControlSoundTypeDistance.受到距离影响) {
                    let cistance = this.getSoundVolumeByDistance()
                    if (cistance > 0 ) {
                        Emitter.fire("onPlaySound",this.soundList[this.index],cistance)
                    }

                }

            }
        }
    }


    //播放自己的音乐
    playSound(){
        if (this.soundMode == ControlSoundModeType.不响 ){
            return
        }
        if (this.distanceType == ControlSoundTypeDistance.不受距离影响) {
            this.soundVolume = 1
            Emitter.fire("onPlaySound",this.soundList[this.index],this.soundVolume)
        }else if (this.distanceType == ControlSoundTypeDistance.受到距离影响) {
            let cistance = this.getSoundVolumeByDistance()
            if (cistance > 0 ) {
                Emitter.fire("onPlaySound",this.soundList[this.index],cistance)
            }

        }
    }
    stopSound(){
        this.soundMode = ControlSoundModeType.不响
    }


    //获取声音大小根据 距离
    getSoundVolumeByDistance(){
        this.player = null
        Emitter.fire("onGetPlayer", this, async (self, player) => {
            // player1 = player
            this.player = player.node
        })
        if (this.player) {
            let temp
            if (this.soundMin > this.soundMax) {
                temp = this.soundMin
                this.soundMin = this.soundMax
                this.soundMax = temp
            }
            let myParentPlayerPosition = Tools.convetOtherNodeSpace(this.player,this.node.parent)

            let playerPos = myParentPlayerPosition;

            let dist = this.node.position.sub(playerPos).mag();

            cc.log("距离呢 ",dist , dist >= this.soundMin , dist <= this.soundMax )
            // cc.log("距离呢 对比","dist >= this.soundMin" , dist,"",this.soundMin , dist <= this.soundMax )

            if (dist >= this.soundMin && dist <= this.soundMax) {
                cc.log("现在声音应该播放 ",dist/this.soundMax)

                return dist/this.soundMax
            }
        }


        return 0
    }


}

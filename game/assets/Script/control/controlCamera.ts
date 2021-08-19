// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Tools from "../System/Utils/Tools";
import ccLog from "../System/Log/ccLog";
import Emitter from "../System/Msg/Emitter";
import Vec2 = cc.Vec2;

const {ccclass, property} = cc._decorator;

@ccclass
export default class ControlCamera extends cc.Component {

    camera: cc.Camera = null
    Pre_shizhang_1Map: cc.Node = null

    @property({
        displayName :"边界 左",
        tooltip: "边界 左",
        type : cc.Integer
    })
    left : number = 0
    @property({
        displayName :"边界 上",
        tooltip: "边界 上",
        type : cc.Integer
    })
    top : number = 0
    @property({
        displayName :"边界 右",
        tooltip: "边界 右",
        type : cc.Integer
    })
    right : number = 0
    @property({
        displayName :"边界 下",
        tooltip: "边界 下",
        type : cc.Integer
    })
    down : number = 0
    // LIFE-CYCLE CALLBACKS:
    protected onDestroy(): void {
        this.removeEmitter()
    }
    removeEmitter(){
        Emitter.remove('onPlayerMove', this.onPlayerMove,this)
    }
    registerEmitter(){
        Emitter.register('onPlayerMove', this.onPlayerMove,this)
    }
    onLoad () {
        this.removeEmitter()
        this.registerEmitter()

        Emitter.fire("onGetCamera",this,(self,camera)=>{
            self.camera = camera
        })
        // Emitter.fire("onGetPre_shizhang_1Map",this,(self,map)=>{
        //     self.Pre_shizhang_1Map = map
        // })

        // var mainWidth = cc.find("UI_ROOT").width;
        // var mapWidth = this.tieldMap.node.width
        // this.max_x = mapWidth - mainWidth;
    }

    onPlayerMove(selfName,node){

        if (this.camera == null) {
            return
        }

        // ccLog.log("位置边界", " x ",node.getPosition().x," y ",node.getPosition().y)
            this.updateCameraPosition(node.getPosition())


    }

    updateCameraPosition(target: cc.Vec2) {




        let newX = 0
        newX = target.x
        if (this.left != 0) {
            if (target.x < this.left) {
                newX = this.left
            }
        }
        if (this.right != 0) {
            if (target.x > this.right) {
                newX = this.right
            }
        }


        let newY = 0
        newY = target.y

        if (this.top != 0) {
            if (target.y > this.top) {
                newY = this.top
            }
        }
        if (this.down != 0) {
            if (target.y < this.down) {
                newY = this.down
            }
        }


        let newp = new Vec2(newX,newY)

        // if (target.x < -this._cameraMaxX) {
        //     target.x = -this._cameraMaxX;
        // }
        // if (target.y > this._cameraMaxY) {
        //     target.y = this._cameraMaxY;
        // }
        // if (target.y < -this._cameraMaxY) {
        //     target.y = -this._cameraMaxY;
        // }
        // ccLog.log("位置边界", " x ",newp.x," y ",newp.y)
        if (this.camera) {




            let p = this.camera.node.getPosition()
            let nodeP = newp
            if (p.x!=nodeP.x ||p.y!=nodeP.y ) {

                this.camera.node.setPosition(newp)
            }else{
                // ccLog.log("在镜头外")
                // Emitter.fire("onGetPlayer", this,  (self, player) => {
                //     // player1 = player
                //     // player.node.zIndex = ZindexType.zhencghang
                //     // ccLog.log("出去了吗")
                //     // ccLog.log(self, player)
                //     // player.lunyiSpeedNum = Math.round(pro*100)/100
                //     // self.speedSlider.progress = player.lunyiSpeedNum
                //     // ccLog.log("变动的",self.speedSlider.progress)
                //     // self.speedNum.string = self.speedSlider.progress
                //
                //     let p = Tools.convetOtherNodeSpace(player.node ,self.node)
                //     // let p  =self.node.convertToNodeSpaceAR(player.node.getPosition())
                //     // let p  =player.node.getPosition()
                //     self.mask.setPosition(p)
                // })
            }


            // this.camera.node.setPosition(target)
            // let distance = Tools.p2pDistance(this.camera.node.getPosition(),target)
            // ccLog.log("距离 ",distance)
            // if (distance>700) {

            // ccLog.log("能收到的移动",target.x,target.y , this.camera)
            // }
            // ccLog.log("在设置 "," x ",target.x," y ",target.y)
            // ccLog.log("在设置 name",this.camera.name)
        }

    }
    start () {

    }

    // update (dt) {}
}

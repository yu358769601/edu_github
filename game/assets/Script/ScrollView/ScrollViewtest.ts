import { ItemPanelController } from "./ItemPanelController";
import ScrollViewManager from "./ScrollViewManager";
import {labelpanelcontroller} from "./labelpanelcontroller";
import {MapName} from "../System/Type/enums";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollViewtest extends cc.Component {

    @property(cc.Node)
    ResetBtn: cc.Node = null;

    @property(cc.Node)
    AddPanel: cc.Node = null;

    @property(cc.Node)
    CutPanel: cc.Node = null;

    _SctrollView: cc.Node;
    panels = [
        {
          txt : "門口",
          name : MapName.门口
        },
        {
          txt : "街道",
          name :  MapName.街道
        },
        {
          txt : "商場",
          name :  MapName.商場
        },
        {
          txt : "站台",
          name :  MapName.站台
        },
        {
          txt : "天橋",
          name :  MapName.天桥
        },
        {
          txt : "等車",
          name :  MapName.等车
        },
        {
          txt : "飯店",
          name :  MapName.饭店
        },
        {
          txt : "活動現場",
          name :  MapName.活动现场
        },


        // {
        //   txt : "测试关",
        //   name : "Pre_shizhang_3"
        // },
        // {
        //   txt : "第1关",
        //   name : "Pre_shizhang_1"
        // },
        // {
        //   txt : "第2关",
        //   name : "Pre_shizhang_2"
        // },
        // {
        //   txt : "测试关",
        //   name : "Pre_shizhang_3"
        // },
    ];

    onLoad() {
        this._SctrollView = cc.find('scrollview', this.node);
        this.ResetBtn.on('touchend', this.OnResetBtn, this)
        this.AddPanel.on('touchend', this.OnAddPanel, this)
        this.CutPanel.on('touchend', this.OnCutPanel, this)
    }

    start() {
        let crollter = this._SctrollView.getComponent(ScrollViewManager);
        crollter.SetScroll(this.panels, labelpanelcontroller);
        crollter.OnStartPanel();
    }

    OnResetBtn() {
        let crollter = this._SctrollView.getComponent(ScrollViewManager);
        crollter.ResetScrollview();
    }

    OnCutPanel() {
        this.panels.splice(1, 1);
        let crollter = this._SctrollView.getComponent(ScrollViewManager);
        crollter.SetScroll(this.panels, labelpanelcontroller);
        crollter.OnlyRefrushPanel();
    }

    OnAddPanel() {
        let item = this.panels[this.panels.length - 1];
        item++;
        this.panels.push(item);
        let crollter = this._SctrollView.getComponent(ScrollViewManager);
        crollter.SetScroll(this.panels, labelpanelcontroller);
        crollter.OnlyRefrushPanel();
    }

}

// @ccclass

//制作：
//b站ID：快乐的狼王
//

import { ItemPanelController } from "./ItemPanelController";
import ccLog from "../System/Log/ccLog";

const { ccclass, property } = cc._decorator;



@ccclass
export default class ScrollViewManager extends cc.Component {

    private __Scrollview: cc.ScrollView;

    @property({
        tooltip: '每行或每列的个数'
    })
    Division = 1;

    @property({
        type: cc.Node,
        tooltip: '需要填充进组件的面板'
    })
    private Panel_Index: cc.Node = null;

    @property({
        tooltip: '上方留空的大小'
    })
    private CutTop = 10;

    @property({
        tooltip: '下方留空的大小'
    })
    private CutBottom = 10;

    @property({
        tooltip: '左方留空的大小'
    })
    private CutLeft = 10;

    @property({
        tooltip: '右方留空的大小'
    })
    private CutRight = 10;

    /** x轴间隔 */
    @property({
        tooltip: '面板之间，x轴方向的间隙'
    })
    private Interval_X = 10;

    /** y轴间隔 */
    @property({
        tooltip: '面板之间，y轴方向的间隙'
    })
    private Interval_Y = 10;

    /** 面板数量 */
    @property({
        tooltip: '展示的面板最大数量，可以手动设置，可以自动设置'
    })
    private MaxPanel = 10;


    /** 1横屏，2竖屏，3未定义 */
    @property({
        tooltip: '1为横屏   2为竖屏'
    })
    private ViewType = 1;

    /** 1左到右，上到下，2右到左，下到上，3未定义 */
    @property({
        tooltip: '1左到右，上到下，2右到左，下到上，3未定义'
    })
    private CountentType = 1;

    private MaskPanel: cc.Node;
    private CountentPanel: cc.Node;

    PanelCount = 0;

    private Panel_IndexSize = [];
    private PanelController;




    onLoad() {
        this.__Scrollview = this.node.getComponent(cc.ScrollView);
        this.MaskPanel = cc.find('view', this.node);
        this.CountentPanel = cc.find('view/content', this.node);
        this.MaskPanel.width = this.node.width;
        this.MaskPanel.height = this.node.height;

        this.__Scrollview.vertical = this.ViewType == 1 ? false : true;
        this.__Scrollview.horizontal = this.ViewType == 2 ? false : true;
        this.Panel_IndexSize = [this.Panel_Index.width, this.Panel_Index.height];
        //this.node.on(cc.Node.EventType.TOUCH_START, this.OnTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.OnTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.OnTouchEnd, this);
    }

    private ItemMsgList = [];

    SetScroll(item: any[], controller) {
        this.ItemMsgList = item;
        this.PanelCount = this.ItemMsgList.length;
        this.PanelController = controller;
    }

    /** 
     * 开始加载面板数据
     * 注意：会将面板中心跳至第一个面板
     */
    OnStartPanel() {
        this.ResetPanelSize();
        this.JustCountentPanelPositionReset();
        this.AddPanel();
    }

    /**
     * 仅仅刷新面板数据
     * 注意：不会将面板重新跳转至第一个面板
     * 如果中途插入的面板在所展示的面板下方或者中间，可以尝试使用ItemAssignment方法手动对当前展示的面板进行数据刷新
     */
    OnlyRefrushPanel() {
        this.OnTouchStart();
        this.ResetPanelSize();
        this.ResetPanel();
        this.SetData();
        cc.tween(this.node)
            .delay(0.017)
            .call(() => {
                this.OnScrollEvent();
            })
            .start();
    }

    /** 重置当前面板数量 */
    ResetPanel() {
        let PanelArr = this.CountentPanel.children;
        for (let index = 0; index < PanelArr.length; index++) {
            if (index >= this.ItemMsgList.length) {
                PanelArr[index].active = false;
            }
            else {
                PanelArr[index].active = true;
            }
        }
    }

    SetData() {
        let PanelArr = this.CountentPanel.children;
        for (let index = 0; index < PanelArr.length; index++) {
            if (PanelArr[index].active == false) {
                continue;
            }
            let con = PanelArr[index].getComponent(ItemPanelController);
            let _index = con._INDEX;
            this.ItemAssignment(PanelArr[index], this.ItemMsgList[_index], _index);
        }
    }

    /** 目标面板定位列表 */
    private PanelIndexPositionList: [number[]] = [[]];
    private PanelList: cc.Node[] = [];


    /** 面板属性设定 */
    private ResetPanelSize() {


        let line = (this.PanelCount % this.Division == 0 ? parseInt((this.PanelCount / this.Division).toString()) : parseInt((this.PanelCount / this.Division + 1).toString()));

        /** 设置背景大小 */
        this.CountentPanel.width = this.ViewType == 1 ? (this.CutLeft + this.CutRight + ((line - 1) * this.Interval_X) + (line * this.Panel_Index.width)) : (this.CutLeft + this.CutRight + (this.Division) * this.Panel_Index.width + (this.Division - 1) * this.Interval_X);
        this.CountentPanel.height = this.ViewType == 2 ? (this.CutTop + this.CutBottom + ((line - 1) * this.Interval_Y) + (line * this.Panel_Index.height)) : (this.CutTop + this.CutBottom + (this.Division) * this.Panel_Index.height + (this.Division - 1) * this.Interval_Y);



        /** 定位面板位置定位 */
        if (this.Division == 1) {
            for (let index = 0; index < this.PanelCount; index++) {
                if (index == 0) {
                    this.PanelIndexPositionList[0] = [
                        this.ViewType == 1 ? ((this.CountentType == 1 ? this.CutLeft : this.CutRight) + this.Panel_Index.width / 2) : this.ViewType == 2 ? 0 : 0,
                        this.ViewType == 1 ? 0 : this.ViewType == 2 ? ((this.CountentType == 1 ? this.CutTop : this.CutBottom) + this.Panel_Index.height / 2) : 0,
                    ]
                }
                else {
                    this.PanelIndexPositionList[index] = [
                        this.ViewType == 1 ? ((this.CountentType == 1 ? this.CutLeft : this.CutRight) + (index) * (this.Panel_Index.width + this.Interval_X) + this.Panel_Index.width / 2) : 0,
                        this.ViewType == 1 ? 0 : ((this.CountentType == 1 ? this.CutTop : this.CutBottom) + (index) * (this.Panel_Index.height + this.Interval_Y) + this.Panel_Index.height / 2)
                    ]
                }
            }
        }
        else {
            for (let i = 1; i <= line; i++) {
                for (let j = 1; j <= this.Division; j++) {
                    let _x = this.ViewType == 1 ? ((this.CountentType == 1 ? this.CutLeft : this.CutRight) + this.Panel_Index.width / 2 + (i - 1) * (this.Interval_X + this.Panel_Index.width)) : (-(this.CountentPanel.width / 2) + (this.CountentType == 1 ? this.CutLeft : this.CutRight) + (this.Panel_Index.width / 2) + (j - 1) * (this.Panel_Index.width + this.Interval_X))
                    let _y = this.ViewType == 1 ? (this.CountentPanel.height / 2 - (this.CountentType == 1 ? this.CutTop : this.CutBottom) - (this.Panel_Index.height / 2) - (j - 1) * (this.Interval_Y + this.Panel_Index.height)) : ((this.CountentType == 1 ? this.CutTop : this.CutBottom) + (this.Panel_Index.height / 2) + (i - 1) * (this.Interval_Y + this.Panel_Index.height))
                    if (i == 1 && j == 1) {
                        this.PanelIndexPositionList[0] = [_x, _y];
                    }
                    else {
                        this.PanelIndexPositionList.push([_x, _y]);
                    }
                }
            }
        }


        /** 是否选择自动获取最佳面板数量 */

        if (this.Division == 1) {
            this.MaxPanel = this.ViewType == 1 ? ((this.__Scrollview.node.width - this.CutLeft - this.CutRight) / (this.Panel_Index.width + this.Interval_X) + 2) : ((this.__Scrollview.node.height - this.CutTop - this.CutBottom) / (this.Panel_Index.height + this.Interval_Y) + 2);
            this.MaxPanel = parseInt(this.MaxPanel.toString()) + 1;
        }
        else {
            this.MaxPanel = this.ViewType == 1 ? ((this.__Scrollview.node.width - this.CutLeft - this.CutRight) / (this.Panel_Index.width + this.Interval_X) + 2) : ((this.__Scrollview.node.height - this.CutTop - this.CutBottom) / (this.Panel_Index.height + this.Interval_Y) + 2);
            this.MaxPanel = parseInt(this.MaxPanel.toString()) + 1;
            this.MaxPanel = this.Division * this.MaxPanel;
        }
    }

    /** 仅仅countent面板回到位置 */
    JustCountentPanelPositionReset() {
        /** countent面板归零 */
        this.CountentPanel.anchorX = (this.ViewType == 1 && this.CountentType == 1) ? 0 : (this.ViewType == 1 && this.CountentType == 2) ? 1 : 0.5;
        this.CountentPanel.anchorY = (this.ViewType == 2 && this.CountentType == 1) ? 1 : (this.ViewType == 2 && this.CountentType == 2) ? 0 : 0.5;
        this.CountentPanel.x = 0;
        this.CountentPanel.y = 0;

        if (this.ViewType == 1) {
            if (this.CountentType == 1) {
                this.CountentPanel.x = - this.MaskPanel.width / 2;
            }
            else {
                this.CountentPanel.x = this.MaskPanel.width / 2;
            }
        }
        else {
            if (this.CountentType == 1) {
                this.CountentPanel.y = this.MaskPanel.height / 2;
            }
            else {
                this.CountentPanel.y = - this.MaskPanel.height / 2;
            }
        }

        /** 如果右widget定位在这里可以出触发一下widget的update() */
        /** 有问题，暂时不开 */
        //this.CountentPanel.getComponent(cc.Widget).updateAlignment();

    }

    /** 初次进入，创建面板 */
    private AddPanel() {
        /** 设置基本面板 */
        for (let index = 0; index < this.MaxPanel; index++) {
            if (index < this.PanelIndexPositionList.length) {
                let _panel = cc.instantiate(this.Panel_Index);
                _panel.addComponent(this.PanelController);
                _panel.parent = this.CountentPanel;
                _panel.active = true;
                ccLog.log("什么呢",this.PanelIndexPositionList,index)
                _panel.x = (this.ViewType == 1 && this.CountentType == 1) ? this.PanelIndexPositionList[index][0] : (this.ViewType == 1 && this.CountentType == 2) ? -this.PanelIndexPositionList[index][0] : this.PanelIndexPositionList[index][0];
                _panel.y = (this.ViewType == 2 && this.CountentType == 1) ? -this.PanelIndexPositionList[index][1] : (this.ViewType == 2 && this.CountentType == 2) ? this.PanelIndexPositionList[index][1] : this.PanelIndexPositionList[index][1];
                this.ItemAssignment(_panel, this.ItemMsgList[index], index);
            }

        }
    }

    /** 重置面板 */
    ResetScrollview() {
        this.ToIndex(1);
    }

    private _CountentPanelIndex = {
        x: 0,
        y: 0
    };
    /** 滚动类型 0:第一次 1向下滚动 2向上 3左 4右 5开始 */
    private _ScrollType = 0;
    /** 滚动事件 */
    private OnScrollEvent(...param) {
        this.PanelList = this.CountentPanel.children;
        if (this._ScrollType == 0) {
            this._CountentPanelIndex = {
                x: this.CountentPanel.x,
                y: this.CountentPanel.y
            }
            this._ScrollType = 5;
            return
        }

        let _x = this.CountentPanel.x;
        let _y = this.CountentPanel.y;

        if (this.ViewType == 1) {
            if (_x - this._CountentPanelIndex.x < 0) {
                this._ScrollType = 3;
            }
            else {
                this._ScrollType = 4;
            }
        }
        else {
            if (_y - this._CountentPanelIndex.y < 0) {
                this._ScrollType = 1;
            }
            else {
                this._ScrollType = 2;
            }
        }

        //console.log(this._ScrollType == 1 ? '向下' : this._ScrollType == 2 ? '向上' : this._ScrollType == 3 ? '向左' : '向右');

        for (let count = 0; count < this.Division; count++) {


            let _panel1: cc.Node = this.PanelList[0];
            let _panel2: cc.Node = this.PanelList[this.PanelList.length - 1];
            let _panel3: cc.Node = (this._ScrollType == 1 ? ((this.TurnPosition(_panel1).y - this.TurnPosition(_panel2).y > 0 ? _panel2 : _panel1)) : this._ScrollType == 2 ? ((this.TurnPosition(_panel1).y - this.TurnPosition(_panel2).y > 0 ? _panel1 : _panel2)) : this._ScrollType == 3 ? ((this.TurnPosition(_panel1).x - this.TurnPosition(_panel2).x > 0 ? _panel2 : _panel1)) : ((this.TurnPosition(_panel1).x - this.TurnPosition(_panel2).x > 0 ? _panel1 : _panel2)))

            let cut_updown = (this.MaskPanel.height / 2 + this.Panel_Index.height / 2 + (20))
            let cut_leftright = (this.MaskPanel.width / 2 + this.Panel_Index.width / 2 + (20))


            if (this._ScrollType == 1) {
                if (this.TurnPosition(_panel3).y < -cut_updown) {
                    if (this.CountentType == 1) {
                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [_panel.x, Math.abs(_panel.y)];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList)
                        let _index = index - this.MaxPanel
                        if (index == -1 || _index < 0) {
                            return;
                        }
                        else {
                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }
                            _panel.x = position.x;
                            _panel.y = -position.y;


                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }

                        _panel.setSiblingIndex(0);

                    }
                    else {
                        console.log(_panel3.name)
                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [_panel.x, _panel.y];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList);
                        let _index = index + this.MaxPanel
                        if (index == -1 || this.PanelCount - 1 < _index) {
                            console.log('return')
                            return;
                        }
                        else {

                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }

                            _panel.x = position.x;
                            _panel.y = position.y;


                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }

                        _panel.setSiblingIndex(this.MaxPanel + 1);
                    }
                }
            }
            else if (this._ScrollType == 2) {
                if (this.TurnPosition(_panel3).y > cut_updown) {
                    if (this.CountentType == 1) {

                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [_panel.x, Math.abs(_panel.y)];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList)
                        let _index = index + this.MaxPanel
                        if (index == -1 || this.PanelCount - 1 < _index) {
                            // console.log('return')
                            return;
                        }
                        else {
                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }
                            _panel.x = position.x;
                            _panel.y = -position.y;

                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }

                        _panel.setSiblingIndex(this.MaxPanel + 1);

                    }
                    else {
                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [(_panel.x), _panel.y];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList);
                        let _index = index - this.MaxPanel
                        if (index == -1 || _index < 0) {
                            return;
                        }
                        else {

                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }
                            _panel.x = position.x;
                            _panel.y = position.y;


                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }


                        _panel.setSiblingIndex(0);

                    }
                };
            }
            else if (this._ScrollType == 3) {
                if (this.TurnPosition(_panel3).x < -cut_leftright) {
                    if (this.CountentType == 1) {
                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [_panel.x, _panel.y];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList)
                        let _index = index + this.MaxPanel
                        if (index == -1 || _index > this.PanelCount - 1) {
                            return;
                        }
                        else {
                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }
                            _panel.x = position.x;
                            _panel.y = position.y;

                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }

                        _panel.setSiblingIndex(this.MaxPanel);

                    }
                    else {

                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [Math.abs(_panel.x), _panel.y];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList);
                        let _index = index - this.MaxPanel
                        if (index == -1 || _index < 0) {
                            console.log('return')
                            return;
                        }
                        else {

                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }
                            _panel.x = -position.x;
                            _panel.y = position.y;

                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }

                        _panel.setSiblingIndex(0);


                    }
                }
            }
            else if (this._ScrollType == 4) {

                if (this.TurnPosition(_panel3).x > cut_leftright) {
                    if (this.CountentType == 1) {

                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [_panel.x, _panel.y];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList)
                        let _index = index - this.MaxPanel
                        if (index == -1 || _index < 0) {
                            console.log('return')
                            return;
                        }
                        else {
                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }
                            _panel.x = position.x;
                            _panel.y = position.y;

                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }

                        _panel.setSiblingIndex(0);

                    }

                    else {
                        let _panel = _panel3;
                        let position = [Math.abs(_panel.x), Math.abs(_panel.y)];
                        if (this.Division > 1) {
                            position = [Math.abs(_panel.x), _panel.y];
                        }
                        let index = this.GetIndexOfArray(position, this.PanelIndexPositionList);
                        let _index = index + this.MaxPanel
                        if (index == -1 || _index > this.PanelCount - 1) {
                            return;
                        }
                        else {

                            let position = {
                                x: this.PanelIndexPositionList[_index][0],
                                y: this.PanelIndexPositionList[_index][1]
                            }
                            _panel.x = -position.x;
                            _panel.y = position.y;

                            this.ItemAssignment(_panel, this.ItemMsgList[_index], _index);
                        }


                        _panel.setSiblingIndex(this.MaxPanel - 1);

                    }

                };

            }

        }


        this._CountentPanelIndex = {
            x: _x,
            y: _y
        };
    }

    /** 面板重新分配 */
    private ItemAssignment(Panel: cc.Node, ItemMsg: any, _INDEX: number) {
        let con = Panel.getComponent(ItemPanelController)
        ccLog.log("进来的参数",ItemMsg,"找到了什么",con)
        con.ResetPanel(ItemMsg);
        con._INDEX = _INDEX;


    }

    private GetIndexOfArray(arr1: number[], arr2: [number[]]) {

        let _index = -1;

        for (let index = 0; index < arr2.length; index++) {
            if (arr1.toString() == arr2[index].toString()) {
                return index;
            }
        }

        return _index;
    }

    private TurnPosition(node1: cc.Node) {
        let obj = {
            x: node1.x + node1.parent.x,
            y: node1.y + node1.parent.y
        }
        return obj;
    }

    private OnTouchStart() {
        this._CountentPanelIndex = {
            x: this.CountentPanel.x,
            y: this.CountentPanel.y
        }
    }

    private OnTouchEnd() {
        this._CountentPanelIndex = {
            x: 0,
            y: 0
        }
        this._ScrollType = 0;
    }


    //----------------------------------------------------------------
    //代码贡献者： 422925515 吃过多少面包
    //https://forum.cocos.org/t/scrollview/94132/8
    //经检测后发现代码无效，已修改，可使用

    // 目标item的index
    GetTargetIndexOffset(targetIndex) {

        if (this.ViewType == 2) {
            if (this.CountentType == 1) {
                let position = this.PanelIndexPositionList[targetIndex - 1];
                let offset = [];
                offset[0] = position[0];
                offset[1] = position[1] - this.Panel_Index.height / 2;
                return offset;
            }
            else {
                let position = this.PanelIndexPositionList[this.ItemMsgList.length - (targetIndex)];
                let offset = [];
                offset[0] = position[0];
                offset[1] = position[1] - this.Panel_Index.height / 2;
                return offset;
            }
        }
        else if (this.ViewType == 1) {
            if (this.CountentType == 1) {
                let position = this.PanelIndexPositionList[targetIndex - 1];
                let offset = [];
                offset[0] = position[0] - this.Panel_Index.width / 2;
                offset[1] = position[1];
                return offset;
            }
            else {
                let position = this.PanelIndexPositionList[this.ItemMsgList.length - (targetIndex)];
                let offset = [];
                offset[0] = position[0] - this.Panel_Index.width / 2;
                offset[1] = position[1];
                return offset;
            }
        }

    }

    /** 跳转至目标面板 */
    ToIndex(targetIndex) {
        let offset = this.GetTargetIndexOffset(targetIndex)
        this.__Scrollview.scrollToOffset(new cc.Vec2(offset[0], offset[1]), 1);
    }

    //----------------------------------------------------------------


}
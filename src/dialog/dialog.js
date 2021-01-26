import React, {Component} from 'react';
import ReactDOM from "react-dom";

import Style from "./dialog.module.css";

export default class dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 400,
            height: 300,
            title: "系统提示",
            content: "",
            confirmText: "确定",
            cancelText: "取消",
            type: "alert",
            display: true
        }
        this._setMaxValue.bind(this);
        this._handleKeyPress.bind(this);
        this._handleConfirm.bind(this);
        this._handleCancel.bind(this);
        this._close.bind(this);
    }
    render() {
        return ReactDOM.createPortal(
            <>
                <div className={Style.layer}></div>
                <div className={Style.mainWrapper} style={{ width: this.props.width || this.state.width, height: this.props.height || this.state.height, top: `calc(50% - ${this.state.max_height}px / 2)`, left: `calc(50% - ${this.state.max_width}px / 2)` }}>
                    <table cellSpacing="0" cellPadding="0" className={Style.main}>
                        <caption>
                            <span>{this.props.title || this.state.title}</span>
                            <span onClick={this._close}></span>
                        </caption>
                        <tbody>
                            <tr>
                                <td dangerouslySetInnerHTML={{__html: this.props.content}}></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    {(this.props.type || this.state.type) !== "dialog" && <input type="button" value={this.props.confirmText || this.state.confirmText} onClick={this._handleConfirm} />}
                                    {(this.props.type || this.state.type) === "confirm" && <input type="button" value="取消" onClick={this._handleCancel} />}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </>,
            document.body
        );
    }
    componentDidMount() {
        window.addEventListener("resize", this._setMaxValue);
        window.addEventListener("keypress", this._handleKeyPress);
        var event = document.createEvent('Event');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this._setMaxValue);
        window.removeEventListener("keypress", this._handleKeyPress);
    }
    _setMaxValue = (e) => {
        var width = this.props.width || this.state.width;
        var height = this.props.height || this.state.height;
        var window_width = 0.8 * e.target.innerWidth;
        var window_height = 0.8 * e.target.innerHeight;
        this.setState({
            max_width: window_width > width ? width : window_width,
            max_height: window_height > height ? height : window_height,
        });
    }
    _handleKeyPress = (e) => {
        if(this.state.display && e.keyCode === 13) {
            e.preventDefault();
            this._handleConfirm();
        }
    }
    _close = () => {
        this.props.onClose && this.props.onClose();
    }
    _handleConfirm = () => {
        this.props.onConfirm && this.props.onConfirm();
    }
    _handleCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }
}

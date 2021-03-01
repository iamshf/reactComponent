import React from "react";
import Style from "./index.module.css";

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentTime: 0, duration: 0 };
        this.ref_player = this.props.ref_player || React.createRef();
    }
    render() {
        let mediaProps = {
            preload: this.props.preload || "meta",
            src: this.props.src,
            ref: this.props.ref_player || this.ref_player,
            onTimeUpdate: this._handleTimeUpdate,
            onEnded: this._handleEnded,
            onDurationChange: this._handleDurationChange
        };
        this.props.onPlay && typeof(this.props.onPlay) === "function" && (mediaProps.onPlay = this._handlePlay);
        this.props.onPause && typeof(this.props.onPause) === "function" && (mediaProps.onPause = this._handlePause);
        return (
            <div className={`${Style.container}${this.props.className ? " " + this.props.className : ""}`}>
                <audio {...mediaProps} />
                <button className={Style.controller} onClick={this._handleToogleStatus} type="button"><span className={this.ref_player.current == null || this.ref_player.current.paused ? Style.controller_paused : Style.controller_playing}></span></button>
                <input className={Style.progress} type="range" min="0" max={this.state.duration} value={this.state.currentTime} step="0.001" onChange={this._handleChangeCurrentTime} style={{"background": `linear-gradient(to right, rgb(172, 196, 36), rgb(197,197,197) ${100 * this.state.currentTime / this.state.duration}%, rgb(197,197,197) 100%)`}} />
                <span className={Style.time_container}>{parseInt(this.state.currentTime / 60).toString().padStart(2, 0)}:{parseInt(this.state.currentTime % 60).toString().padStart(2, 0)} / {parseInt(this.state.duration / 60).toString().padStart(2, 0)}:{parseInt(this.state.duration % 60).toString().padStart(2, 0)}</span>
                <input className={Style.volumn} type="button" />
            </div>
        );
    }
    componentDidUpdate(prevProps) {
        if(this.props.paused !== prevProps.paused && this.props.paused !== this.ref_player.current.paused) {
            this._handleToogleStatus();
        }
        if(prevProps.currentTime !== this.props.currentTime) {
            this.ref_player.current.currentTime = this.props.currentTime;
        }
    }
    //播放器播放暂停按钮控制
    _handleToogleStatus = () => {
        if(this.state.duration > 0) {
            this.ref_player.current.paused ? this.ref_player.current.play() : this.ref_player.current.pause();
            this.props.onTooglePause && typeof(this.props.onTooglePause) === "function" && this.props.onTooglePause(this.ref_player.current.paused);
        }
    }
    /******************播放器事件定义****************************/
    _handleDurationChange = e => {
        this.setState({duration: e.target.duration});
        typeof(this.props.onDurationChange) === "function" && this.props.onDurationChange(e);
    }
    //播放器进度改变
    _handleTimeUpdate = (e) => {
        this.setState({currentTime: e.target.currentTime});
        typeof(this.props.onTimeUpdate) === "function" && this.props.onTimeUpdate(e);
    }
    //通过进度条改变播放器进度
    _handleChangeCurrentTime = (e) => {
        this.ref_player.current.currentTime = e.target.value;
        typeof(this.props.onChangeProgress) === "function" && this.props.onChangeProgress(e);
    }
    //播放结束事件
    _handleEnded = (e) => {
        this.ref_player.current.currentTime = 0;
        typeof(this.props.onEnded) === "function" && this.props.onEnded(e);
    }
    _handlePlay = (e) => this.props.onPlay(e.target.paused);
    _handlePause = (e) => this.props.onPause(e.target.paused);
    /******************播放器事件定义****************************/
}

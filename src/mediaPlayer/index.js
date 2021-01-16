import React from "react";
import Style from "./index.module.css";

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
        };
        this.ref_player = this.props.ref_player || React.createRef();
    }
    render() {
        return (
            <div className={`${Style.container}${this.props.className ? " " + this.props.className : ""}`}>
                <audio preload={this.props.preload || "meta"} src={this.props.src} ref={this.props.ref_player || this.ref_player} onTimeUpdate={this._handleTimeUpdate} onCanPlay={this._handleCanPlay} onEnded={this._handleEnded} />
                <button className={Style.controller} onClick={this._handleToolgeStatus} type="button"><span className={this.ref_player.current == null || this.ref_player.current.paused ? Style.controller_paused : Style.controller_playing}></span></button>
                <input className={Style.progress} type="range" min="0" max={this.state.duration} value={this.state.currentTime} step="0.01" onChange={this._handleChangeCurrentTime} style={{"background": `linear-gradient(to right, rgb(172, 196, 36), rgb(197,197,197) ${this.state.currentTime}%, rgb(197,197,197) 100%)`}} />
                <span className={Style.time_container}>{parseInt(this.state.currentTime / 60).toString().padStart(2, 0)}:{parseInt(this.state.currentTime % 60).toString().padStart(2, 0)} / {parseInt(this.state.duration / 60).toString().padStart(2, 0)}:{parseInt(this.state.duration % 60).toString().padStart(2, 0)}</span>
                <input className={Style.volumn} type="button" />
            </div>
        );
    }
    _handleToolgeStatus = () => {
        if(this.state.duration > 0) {
            this.ref_player.current.paused ? this.ref_player.current.play() : this.ref_player.current.pause();
        }
    }
    _handleTimeUpdate = (e) => {
        this.setState({currentTime: e.target.currentTime});
        if(typeof(this.props.onTimeUpdate) === "function") {
            this.props.onTimeUpdate(this.state);
        }
    }
    _handleCanPlay = (e) => {
        this.setState({duration: e.target.duration});
    }
    _handleChangeCurrentTime = (e) => {
        this.ref_player.current.currentTime = e.target.value;
    }
    _handleEnded = (e) => {
        this.setState({currentTime: 0});
        if(typeof(this.props.onEnded) === "function") {
            this.props.onEnded(e);
        }
    }
}

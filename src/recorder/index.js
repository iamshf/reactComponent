import React from "react";
import Style from "./index.module.css";
export default class index extends React.Component {
    mr = null;
    audioCtx = null;
    mediaStreamAudioSourceNode = null;
    audioBufferSource = null;
    analyserNode = null;
    canvasCtx = null;
    canvasWidth = 0;
    canvasHeight = 0;
    animationId = null;
    audioBuffer = null;

    constructor(props) {
        super(props);
        this.state = {mediaRecorder: null, buffer_size: 4096, numberOfChannels: 2, sampleRate: 44100, wave_sufer: null, state: "inactive"};
        this.ref_wave_container = React.createRef();
    }
    render() {
        return (
            <div className={`${Style.container}${this.props.className ? " " + this.props.className : ""}`}>
                <button type="button" value="录音" className={`${Style.btn}`} onClick={this._handleRecordClick}>
                    <span className={`${this.state.state === "recording" ? Style.recording : Style.microphone}`}></span>
                </button>
                <button className={Style.btn} type="button" value="播放" onClick={this._handlePlayClick}>
                    <span className={`${this.state.state === "playing" ? Style.playing : Style.paused}`}></span>
                </button>
                {this.props.img_type && <canvas className={Style.wave_container} ref={this.ref_wave_container} width={this.props.img_width} height={this.props.height} />}
            </div>
        );
    }
    componentDidMount() {
        this._init();
    }
    componentWillUnmount() {
        this.state.state === "recording" && this._stopRecord();
        this.state.state === "playing" && this._stopPlay();
    }
    _init = () => {
        if(navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }
        if(navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = (constraints) => {
                let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if(!getUserMedia) {
                    return Promise.reject(new Error("您的浏览器不支持录音功能，请更换标准浏览器使用此功能"));
                }
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }
        if((window.AudioContext || window.webkitAudioContext)) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        else {
            this._onFailed("您的浏览器不支持录音功能，请更换标准浏览器比如Mozilla Firefox或者Google Chrome");
        }
        if(!MediaRecorder) {
            this._onFailed("您的浏览器可能为开启录音功能，请在设置中找到相关功能并开启");
        }
    }
    _dataavailable = (e) => {
        this.blobData = e.data;
        e.data.arrayBuffer().then(buffer => {
            this.audioCtx.decodeAudioData(buffer).then(buffer => {
                this.arrayBuffer = buffer;
                this.state.state === "playing" && this._play();
            })
        })
    }
    _stop = (ms, e) => {
        ms.getTracks().forEach(track => track.stop());
        this.state.state !== "playing" && this.setState({state: this.mr.state});
    }
    _handleRecordClick = () => {
        if(this.state.state === "playing") {
            this._stopPlay();
            this._startRecord();
        }
        else {
            this.state.state === "recording" ? this._stopRecord() : this._startRecord();
        }
    }
    _startRecord = () => {
            navigator.mediaDevices.getUserMedia({audio: true}).then(ms => {
                this.mr = new MediaRecorder(ms);
                this.mr.addEventListener("dataavailable", this._dataavailable);
                this.mr.addEventListener("stop", this._stop.bind(this, ms));
                this.mediaStreamAudioSourceNode = this.audioCtx.createMediaStreamSource(ms);
                this.analyserNode = this.audioCtx.createAnalyser();
                console.log(this.analyserNode);

                this.mediaStreamAudioSourceNode.connect(this.analyserNode);
                this.analyserNode.connect(this.audioCtx.destination);
                this.mr.start();

                this._draw();
                this.setState({state: this.mr.state});
            }, err => {
                this._onFailed();
            });
    }
    _stopRecord = () => {
        this.mr.stop();
        this.analyserNode.disconnect();
        this.mediaStreamAudioSourceNode.disconnect();
        cancelAnimationFrame(this.animationId);
    }
    _handlePlayClick = () => {
        if(this.state.state === "recording") {
            this.setState({state: "playing"});
            this._stopRecord();
        }
        else {
            if(this.state.state === "playing") {
                this._stopPlay();
            }
            else if(this.arrayBuffer) {
                this.setState({state: "playing"});
                this._play();
            }
            else {
                alert("录音数据为空");
            }
        }
    }
    _play = () => {
        this.audioBufferSource = this.audioCtx.createBufferSource();
        this.audioBufferSource.addEventListener("ended", e => {
            this.state.state === "playing" && this.setState({state: "paused"});
        });
        this.audioBufferSource.buffer = this.arrayBuffer;
        this.audioBufferSource.connect(this.analyserNode);
        this.analyserNode.connect(this.audioCtx.destination);
        this.audioBufferSource.start();
        this._draw();
    }
    _stopPlay = () => {
        this.audioBufferSource.stop();
    }

    _onFailed = () => {
        if(typeof(this.props.onFailed) === "function") {
            this.props.onFailed("请检查您的麦克风设备是否正常，并允许系统调用您的麦克风");
        }
        else {
            alert("请检查您的麦克风设备是否正常，并允许系统调用您的麦克风");
        }
    }


    /***********************绘图相关*******************************/
    _draw = () => {
        if(this.props.img_type) {
            this.canvasCtx = this.ref_wave_container.current.getContext("2d");
            this.canvasWidth = this.ref_wave_container.current.clientWidth;
            this.canvasHeight = this.ref_wave_container.current.clientHeight;
            this.ref_wave_container.current.width = this.canvasWidth;
            this.ref_wave_container.current.height = this.canvasHeight;
            let dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
            switch(this.props.img_type) {
                case "histogram":
                    this._drawHistogram(dataArray);
                    break;
                case "wave":
                    this._drawWave(dataArray);
                    break;
                default:
                    this._drawWave(dataArray);
                    break;
            }
        }
    }
    _clearCanvas = () => {
        this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.canvasCtx.fillStyle = this.props.img_bgColor || "rgb(255, 255, 255)";
        this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    _drawHistogram = (dataArray) => {
        this._clearCanvas();
        //this.analyserNode.getFloatFrequencyData(dataArray);
        this.analyserNode.getByteTimeDomainData(dataArray);

        let barWidth = (this.canvasWidth / this.analyserNode.frequencyBinCount) * 2.5;
        let posX = 0;
        for(let i = 0; i < this.analyserNode.frequencyBinCount; i++) {
            let barHeight = (dataArray[i] + 140) * 2;
            this.canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
            this.canvasCtx.fillRect(posX, this.canvasHeight - barHeight / 2, barWidth, barHeight / 2);
            posX += barWidth + 1;
        }
        this.animationId = requestAnimationFrame(this._drawHistogram.bind(this, dataArray));
    }
    _drawWave = (dataArray) => {
        this._clearCanvas();
        this.analyserNode.getByteTimeDomainData(dataArray);
        this.canvasCtx.lineWidth = 1;
        this.canvasCtx.strokeStyle = this.props.waveColor || "rgb(255, 0, 0)";

        this.canvasCtx.beginPath();
        let sliceWidth = this.canvasWidth * 1.0 / this.analyserNode.frequencyBinCount;
        let posX = 0, posY = this.canvasHeight / 2;
        this.canvasCtx.moveTo(posX, posY);
        this.canvasCtx.lineTo(this.canvasWidth, posY);
        for(let i = 0; i < this.analyserNode.frequencyBinCount; i++) {
            let y = (2 - dataArray[i] / 128.0) * posY;
            i === 0 ? this.canvasCtx.moveTo(posX, y) : this.canvasCtx.lineTo(posX, y);
            posX += sliceWidth;
        }
        this.canvasCtx.stroke();
        this.animationId = requestAnimationFrame(this._drawWave.bind(this, dataArray));
    }
    /***********************绘图相关*******************************/
}

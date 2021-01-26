import React, {Component} from 'react';
import ReactDOM from "react-dom";
export default class dialog extends Component {
    render() {
        return ReactDOM.createPortal(
            <div style={{position:"absolute", left: 0, top: 0, width: "100%", height: "100%", background: "rgba(204,204,204,0.8)"}}>
                <div style={{position: "absolute", top: "50%", width: "100%"}}>
                    <img style={{verticalAlign: "middle", marginRight: "10px"}} src={require("./Loading.gif")} alt="加载中……" />
                {this.props.msg || "加载中，请稍候……"}
                </div>
            </div>,
            document.body
        )
    }
}

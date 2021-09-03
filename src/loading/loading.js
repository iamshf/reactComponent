import React, {Component} from 'react';
import ReactDOM from "react-dom";

import ImgLoading from "./Loading.gif";
export default class dialog extends Component {
    render() {
        let container_style = Object.assign({position:"absolute", left: 0, top: 0, width: "100%", height: "100%", background: "rgba(204,204,204,0.8)"}, (this.props.container_style || {}))
        return ReactDOM.createPortal(
            <div style={ container_style }>
                <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <img style={{verticalAlign: "middle", marginRight: "10px"}} src={ImgLoading} alt="加载中……" />
                    {this.props.msg || "加载中，请稍候……"}
                </div>
            </div>,
            this.props.el || document.body
        )
    }
}

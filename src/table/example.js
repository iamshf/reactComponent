import React from 'react';
import Table from "./index.js";

import Style from "./example.module.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowSort: true,
            fixedHead: true
        }
    }
    render() {
        let rows = [
            {"id": 26, "name": "a沙发斯蒂芬", "type": "99打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 25, "name": "b沙发斯蒂芬", "type": "98打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 24, "name": "c沙发斯蒂芬", "type": "97打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 23, "name": "do沙发斯蒂芬", "type": "96打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 22, "name": "e沙发斯蒂芬", "type": "95打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 21, "name": "f沙发斯蒂芬", "type": "94打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 20, "name": "g沙发斯蒂芬", "type": "93打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 19, "name": "h沙发斯蒂芬", "type": "92打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 18, "name": "i沙发斯蒂芬", "type": "91打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 17, "name": "j沙发斯蒂芬", "type": "90打发斯蒂阿斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 16, "name": "k沙发斯蒂芬", "type": "89打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 15, "name": "l沙发斯蒂芬", "type": "88打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 14, "name": "m沙发斯蒂芬", "type": "87送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 13, "name": "n沙发斯蒂芬", "type": "86打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 12, "name": "o沙发斯蒂芬", "type": "85打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 11, "name": "p沙发斯蒂芬", "type": "84打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 10, "name": "q沙发斯蒂芬", "type": "83打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 9, "name": "r沙发斯蒂芬", "type": "82打发斯蒂阿斯顿    发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 8, "name": "s沙发斯蒂芬", "type": "81打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 7, "name": "t沙发斯蒂芬", "type": "80打发斯蒂阿斯顿蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 6, "name": "u沙发斯蒂芬", "type": "79打发斯蒂阿斯顿发送到发送到发斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 5, "name": "v沙发斯蒂芬", "type": "78打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 4, "name": "w沙发斯蒂芬", "type": "77打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 3, "name": "x沙发斯蒂芬", "type": "76打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 2, "name": "y沙发斯蒂芬", "type": "75打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"},
            {"id": 1, "name": "z沙发斯蒂芬", "type": "74打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬", "tee": "ss阿斯顿发送到打发斯蒂阿斯顿发送到发送到发斯蒂芬阿斯顿发斯蒂芬芬"}
        ];
        let columns = [
            {title: "序号", name: "id", type: "autoIncrement", className: Style.first_column}, 
            {title: "姓名", name: "name", type: "string", className: Style.second_column, allowSort: this.state.allowSort}, 
            {title: "地址", name: "type", type: "string", allowSort: this.state.allowSort}, 
            {title: "留言", name: "tee", type: "string"}, 
            {title: "编辑", render: (text, record, idx) => <a href="https://www.baidu.com" onClick={this._handleClick.bind(this, text, record, idx)}>{record.name}</a>},
        ];
        return (
            <div>
                <Table rows={rows} columns={columns} {...this.state} className={Style.main} />
                <button type="button" onClick={() => this.setState({allowSort: !this.state.allowSort})}>切换是否允许排序</button>
                <button type="button" onClick={() => this.setState({fixedHead: !this.state.fixedHead})}>切换是否固定表头</button>
            </div>
        );
    }
    _handleClick = (text, record, idx, e) => {
        e.preventDefault();
        console.log(text, record, idx, e);
    }
}

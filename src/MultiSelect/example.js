import React, {lazy} from "react";
import Style from "./example.module.css";

const Select = lazy(() => import("./index"));

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {id: 1, name: "北京市"},
                {id: 2, name: "河北省"},
                {id: 3, name: "内蒙古自治区"},
                {id: 4, name: "新疆维吾尔自治区"},
                {id: 5, name: "河南省"},
                {id: 6, name: "宁夏回族自治区"},
                {id: 7, name: "山东省"},
                {id: 8, name: "陕西省"},
            ]
        }
    }
    render() {
        return (
            <>
                <label>单选框：</label>
                <Select className={Style.main} data={this.state.list} optionValue="id" optionText="name" onChange={this._handleChange}></Select>
                <label>多选框：</label>
                <Select className={Style.main} multiple={true} data={this.state.list} optionValue="id" optionText="name" onChange={this._handleChange}></Select>
            </>
        )
    }
    _handleChange = (idx,item,items,e) => {
        console.log(idx,item,items,e);
    }
}

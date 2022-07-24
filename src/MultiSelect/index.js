import React from 'react';
import Style from "./index.module.css";

export default class MultiIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiple: false,
            is_focus: false,
            show_option: false,
            selected_data: [],
            value: ""
        };
    }
    render() {
        return (
            <div className={`${Style.main} ${this.props.className}`} onMouseOver={this._toogleFocus.bind(this, true)} onMouseOut={this._toogleFocus.bind(this, false)}>
                <input type="text" className={this.state.show_option ? Style.show_opt : ''} onClick={this._toogleShowOptions.bind(this, true)} placeholder={this.props.placeholder || "请选择"} value={this.state.value} required={this.props.required || false} onChange={this._handleInputChange} title={this.props.title || ""} />
                <ul className={this.state.show_option ? "" : Style.hide}>
                    {
                        this.props.data.map((item, idx) => {
                            if (this.props.multiple === true) {
                                return (
                                    <li key={item.id}>
                                        <input type="checkbox" id={`MultiSelect_ckb_${item[this.props.optionValue]}`} onChange={this._handleChange.bind(this, idx, item)} />
                                        <label htmlFor={`MultiSelect_ckb_${item[this.props.optionValue]}`}>
                                            {item[this.props.optionText]}
                                        </label>
                                    </li>
                                );
                            }
                            else {
                                return (
                                    <li key={idx} onClick={this._handleChange.bind(this, idx, item)}>
                                        {item[this.props.optionText]}
                                    </li>
                                );
                            }
                        })
                    }
                </ul>
            </div>
        );
    }
    componentDidMount() {
        // document.body.addEventListener("click", this._handleClick);
        window.addEventListener("click", this._handleClick);
    }
    componentWillUnmount() {
        // document.body.removeEventListener("click", this._handleClick);
        window.removeEventListener("click", this._handleClick);
    }
    _toogleFocus = (is_focus, e) => this.setState({ is_focus: is_focus });
    _toogleShowOptions = (show_option, e) => this.setState({ show_option: show_option })

    _handleClick = e => {
        if (!this.state.is_focus) {
            this.setState({ show_option: false });
        }
    }
    _handleChange = (idx, item, e) => {
        if (this.props.multiple === true) {
            let id = item.id;
            let selected_data = e.target.checked ? [...this.state.selected_data, item] : this.state.selected_data.filter(item => item.id !== id);
            let length = selected_data.length;
            this.setState({ selected_data: selected_data });
            if (typeof (this.props.onChange) === "function") {
                this.props.onChange(idx, item.id, item, selected_data, e);
            }
            if (e.target.checked && typeof (this.props.onSelect) === "function") {
                this.props.onSelect(item.id, idx, item, e);
            }
            if (!e.target.checked && typeof (this.props.onUnSelect) === "function") {
                this.props.onUnSelect(item.id, idx, item, e);
            }
            this.setState({ value: length > 0 ? "已选择" + length + "个" : "" });
        }
        else {
            this.setState({ value: item[this.props.optionText], show_option: false });
            if (typeof (this.props.onChange) === "function") {
                this.props.onChange(idx, item.id, item, e);
            }
        }
    }
    _handleInputChange = e => {
        e.target.setCustomValidity("");
    }
}

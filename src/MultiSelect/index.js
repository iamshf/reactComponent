import React from 'react';

import Style from "./index.module.css";

export default class MultiIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show_option: false, is_focus: false};
    }
    render() {
        return (
            <div className={Style.main} onMouseOver={this._toogleFocus.bind(this, true)} onMouseOut={this._toogleFocus.bind(this, false)}>
                <input type="text" onClick={this._showOptions} />
                <ul className={this.state.show_option ? "" : Style.hide}>
                    {
                        this.props.data.map(item => {
                            return (
                                <li key={item.id}>
                                    <input type="checkbox" id={`MultiSelect_ckb_${item.id}`} />
                                    <label htmlFor={`MultiSelect_ckb_${item.id}`}>{item.name}</label>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
    componentDidMount() {
        document.body.addEventListener("click", this._handleClick);
    }
    componentWillUnmount() {
        document.body.removeEventListener("click", this._handleClick);
    }
    _toogleFocus = (is_focus, e) => this.setState({is_focus: is_focus});
    _showOptions = e => this.setState({show_option: true});

    _hideOptions = e => {
        console.log(e);
        if(!e.currentTarget.contains(e.relatedTarget)) {
            this.setState({show_option: false});
        }
    }
    _handleClick = e => {
        if(!this.state.is_focus) {
            this.setState({show_option: false});
        }
    }
}

import React, { lazy, Component } from 'react';

const Dialog = lazy(() => import("./dialog.js"));
export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { show_dialog: true };
    }
    render() {
        return (
            <>
                {this.state.show_dialog && <Dialog type="confirm" onClose={this._handleClose}><iframe title="ifrm" width="100%" height="100%" href="https://www.baidu.com" /></Dialog>}
            </>
        );
    }
    _handleClose = () => {
        this.setState({show_dialog: false});
    }
}

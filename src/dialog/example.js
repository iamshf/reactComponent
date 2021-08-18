import React, {lazy, Component} from 'react';

const Dialog = lazy(() => import("./dialog.js"));
export default class Example extends Component {
    render() {
        return <Dialog type="confirm"><iframe width="100%" height="100%" href="https://www.baidu.com" /></Dialog>
    }
}

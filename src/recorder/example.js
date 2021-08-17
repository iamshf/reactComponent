import React, {lazy} from "react";
const Recorder = lazy(() => import("./index.js"));
export default class example extends React.Component {
    render() {
        return <Recorder img_type="wave" sync_output={false} />
    }
}

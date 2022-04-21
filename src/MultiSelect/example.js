import React, {lazy} from "react";
const MultiSelect = lazy(() => import("./index.js"));
export default class example extends React.Component {
    render() {
        let data = {optionValue: "id", optionText: "text", data: [{id: 1, text: "第一行"},{id: 2, text: "第二二二二行"},{id: 3, text: "第三散散行"},{id: 4, text: "第四四行"}]}
        return <MultiSelect {...data} />
    }
}

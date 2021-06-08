import React from 'react';
import Style from "./index.module.css";

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.ref_tb = React.createRef();

        this.state = {
            fixedHeadStyle: null,
            fixedHead: typeof(props.fixedHead) === "boolean" ? props.fixedHead : true,
            theadHeight: 0,
            sortIdx: -1,
            sortDirection: 1
        };
    }
    render() {
        return (
            <div className={Style.main} {...(this.state.fixedHead && {onScroll: this._handleScroll})}>
                <table cellPadding="0" cellSpacing="0" ref={this.ref_tb}>
                    <thead ref={this.ref_thead} style={this.state.fixedHeadStyle}>
                        <tr>
                            {
                                this.props.thead.map((item, idx) => {
                                    return (
                                        <th key={`th_${idx}`} {...(this.props.allowSort && {onClick: this._handleSort.bind(this, idx), style: {cursor: "pointer"}})}>
                                            {item}{this.props.allowSort && idx === this.state.sortIdx && (this.state.sortDirection === 1 ? "\u25B2" : "\u25BC")}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody ref={this.ref_tbody}>
                        {
                            this.props.rows.map((row,row_idx) => {
                                return (
                                    <tr key={`tb_row_${row_idx}`}>
                                        {this.props.columns.map((column, column_idx) => <td key={`tb_row_${row_idx}_${column_idx}`}>{row[column.columnName]}</td>)}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
    componentDidMount() {
        this._init();
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.fixedHead !== this.props.fixedHead) {
            this.setState({fixedHead: this.props.fixedHead}, () => this._init());
        }
    }
    _init = () => {
        let tbody_nodes = this.ref_tb.current.childNodes;
        let thead_node, tbody_node;
        for(let node of tbody_nodes) {
            switch(node.nodeName) {
                case "THEAD":
                    thead_node = node;
                    break;
                case "TBODY":
                    tbody_node = node;
                    break;
                default:
                    break;
            }
        }
        if(thead_node && tbody_node) {
            let th_nodes = thead_node.firstChild.childNodes;
            let td_nodes = tbody_node.firstChild.childNodes;
            for(let i = 0, l = td_nodes.length; i < l; i++) {
                th_nodes[i].style.width = this.state.fixedHead ? td_nodes[i].offsetWidth + "px" : "";
            }
            this.setState({theadHeight: thead_node.offsetHeight});
        }
    }

    _handleSort = (idx, e) => {
        this.props.rows.sort((a, b) => {
            let result;
            let dataType = this.props.columns[idx].dataType || "string";
            switch(dataType) {
                case "number":
                    result = a[this.props.columns[idx].columnName] - b[this.props.columns[idx].columnName];
                    break;
                default:
                    result = a[this.props.columns[idx].columnName].toString().localeCompare(b[this.props.columns[idx].columnName].toString());
                    break;
            }
            return this.state.sortDirection === 0 ? result : -result;
        });
        this.setState({sortIdx: idx, sortDirection: this.state.sortDirection === 1 ? 0 : 1});
    }
    _handleScroll = e => {
        if(e.target.scrollTop > 0) {
            this.setState({fixedHeadStyle: {position: "absolute", top: e.target.scrollTop + "px", left: this.ref_tb.current.offsetLeft  + "px"}});
            this.ref_tb.current.parentNode.style.paddingTop = this.state.theadHeight + "px";
        }
        else {
            this.setState({fixedHeadStyle: null});
            this.ref_tb.current.parentNode.style.paddingTop = "";
        }
    }
}

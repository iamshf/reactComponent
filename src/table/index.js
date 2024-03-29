import React from 'react';
import Style from "./index.module.css";

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.ref_tb = React.createRef();

        this.state = {
            fixedHeadStyle: null,
            theadHeight: 0,
            sortIdx: -1,
            sortDirection: 1
        };
    }
    render() {
        return (
            <div className={`${Style.main}${this.props.fixedHead ? ` ${Style.main_fixhead}` : ``}${this.props.className ? ` ${this.props.className}` : ``}`} {...(this.props.fixedHead && {onScroll: this._handleScroll})}>
                <table cellPadding="0" cellSpacing="0" ref={this.ref_tb}>
                    <thead ref={this.ref_thead} style={this.state.fixedHeadStyle}>
                        <tr>
                            {
                                this.props.columns.map((item, idx) => {
                                    let {title, name, type, allowSort, render, ...props} = item;
                                    if(item.allowSort === true) {
                                        props.onClick = this._handleSort.bind(this, idx);
                                        props.style = {cursor: "pointer"};
                                    }
                                    return (
                                        <th key={`th_${idx}`} {...props}>
                                            {item.title}{item.allowSort && idx === this.state.sortIdx && (this.state.sortDirection === 1 ? "\u25B2" : "\u25BC")}
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
                                        {
                                            this.props.columns.map((column, column_idx) => {
                                                let {title, name, type, allowSort, render, ...props} = column;
                                                return (
                                                    <td key={`tb_row_${row_idx}_${column_idx}`} {...props}>
                                                        {
                                                            column.type === "autoIncrement" ? (row_idx + 1) : (
                                                                typeof(column.render) === "function" ? column.render("", row, row_idx) : row[column.name]
                                                            )
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
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
                th_nodes[i].style.width = this.props.fixedHead ? td_nodes[i].offsetWidth + "px" : "";
            }
            this.setState({theadHeight: thead_node.offsetHeight});
        }
    }

    _handleSort = (idx, e) => {
        this.props.rows.sort((a, b) => {
            let result;
            let type = this.props.columns[idx].type || "string";
            switch(type) {
                case "number":
                    result = a[this.props.columns[idx].name] - b[this.props.columns[idx].name];
                    break;
                default:
                    result = a[this.props.columns[idx].name].toString().localeCompare(b[this.props.columns[idx].name].toString());
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

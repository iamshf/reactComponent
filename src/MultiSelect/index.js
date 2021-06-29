import React from 'react';

import Style from "./index.module.css";

export default class MultiIndex extends React.Component {
    render() {
        return (
            <div>
                <input type="text" />
                <ul>
                    {
                        this.props.data.map(item => {
                            return (
                                <li key={item.id}>
                                    <input type="checkbox" />
                                    <label htmlFor=""></label>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

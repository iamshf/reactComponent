import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route} from "react-router-dom";
import Style from './App.module.css';

const Table = lazy(() => import("./table/example.js"));

export default class App extends React.Component {
    render() {
        return (
            <Suspense fallback="loading">
                <Router>
                    <div className={Style.App}>
                        <nav>
                            <NavLink to="/table">table</NavLink>
                        </nav>
                        <div>
                            <Switch>
                                <Route path="/table" component={Table} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

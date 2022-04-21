import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route} from "react-router-dom";
import Style from './App.module.css';

const Table = lazy(() => import("./table/example.js"));
const Recorder = lazy(() => import("./recorder/example.js"));
const Dialog = lazy(() => import("./dialog/example.js"));
const MultiSelect = lazy(() => import("./MultiSelect/example"));

export default class App extends React.Component {
    render() {
        return (
            <Suspense fallback="loading">
                <Router>
                    <div className={Style.App}>
                        <nav>
                            <NavLink to="/table">table</NavLink>
                            <NavLink to="/recorder">recorder</NavLink>
                            <NavLink to="/dialog">dialog</NavLink>
                            <NavLink to="/multiselect">multiselect</NavLink>
                        </nav>
                        <div>
                            <Switch>
                                <Route path="/table" component={Table} />
                                <Route path="/recorder" component={Recorder} />
                                <Route path="/dialog" component={Dialog} />
                                <Route path="/multiselect" component={MultiSelect} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Suspense>
        );
    }
}

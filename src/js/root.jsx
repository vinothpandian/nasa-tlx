import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Nav from "./Home/Nav";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard"
import SubScale from "./Questions/SubScale";
import Pairwise from "./Questions/Pairwise";
import PageNotFound from "./PageNotFound";
import RawData from "./Dashboard/RawData";
import EntryForm from "./EntryForm";


class Root extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/rawdata/:expID/:partID" component={RawData}/>
                        <Route exact path="/details" component={EntryForm}/>
                        <Route exact path="/part1" component={SubScale}/>
                        <Route exact path="/part2" component={Pairwise}/>
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Root;

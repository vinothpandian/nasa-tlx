import React, {Component} from 'react';
import DashboardTable from "./DashboardTable";

const axios = require("axios");

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            experiments: [],
            expID: ""
        };

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        event.preventDefault();

        this.setState({
            expID: event.target.id
        })
    }

    componentDidMount() {
        axios.get("http://localhost:3000/experimentList")
            .then((res)=>{
                this.setState({
                    experiments: res.data,
                    expID: res.data[0]
                })
            })
    }

    render() {

        let experiments = this.state.experiments.map((val, i)=>{
            return <button key={i} id={val} className="dropdown-item" onClick={this.handleClick}>{val}</button>
        });

        return (
            <div className="container-fluid">
                <div className="row p-5">
                    <div className="col">
                        <h1 className="display-4">Dashboard</h1>
                        <hr/>

                        <div className="row p-5 align-items-center">
                            <div className="col-auto">
                                <h4>Choose the Experiment Data to display</h4>
                            </div>
                            <div className="col-auto">
                                <div className="btn-group">
                                    <button type="button" id={"dashboardDropdown"}
                                            className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                        {this.state.expID}
                                    </button>
                                    <div className="dropdown-menu">
                                        {experiments}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-5">
                                <DashboardTable expID={this.state.expID}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {};
Dashboard.defaultProps = {};

export default Dashboard;

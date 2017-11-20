import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const axios = require("axios")
const definitionsAPI = require("../../assets/datastore/definitions.json")
const moment = require("moment")

class DashboardTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tableData: []
        };

        this.chartData = []

    }


    updateData() {

        function computeTaskLoadScore(participantData) {

            let taskLoad = Object.keys(participantData.scale).reduce((taskload, data) => {
                return taskload + (parseFloat(participantData.scale[data]) * parseFloat((parseFloat(participantData.workload[data]) / 15).toFixed(2)))
            }, 0);

            return taskLoad.toFixed(2)
        }

        axios.get("http://localhost:3000/experiment/" + this.props.expID)
            .then((res) => {
                this.chartData = [];
                let tableData = [];
                res.data.forEach((row, i) => {

                    let taskLoadScore = "";

                    if("scale" in row && "workload" in row) {
                        taskLoadScore = computeTaskLoadScore(row);
                    } else {
                        taskLoadScore = <span className="text-danger font-weight-bold">Data Incomplete</span>
                    }

                    tableData.push(
                        <tr key={"infoRow" + i}>
                            <th id={row.participantID} scope="row">{row.participantID}</th>
                            <td id={"taskLoad-" + row.participantID}>{taskLoadScore}</td>
                            <td>{moment(row.id).format("MMMM Do YYYY, h:mm:ss a")}</td>
                            <td>
                                <NavLink to={`/rawdata/${this.props.expID}/${row.participantID}`}
                                         className="btn btn-sm btn-info">View Raw Data</NavLink>
                            </td>
                        </tr>
                    );

                    this.chartData.push({
                        name: row.participantID,
                        Taskload: parseFloat(taskLoadScore)
                    })

                });

                this.setState({
                    tableData: tableData
                });

            }).catch((e) => {
            console.log(e.message)
        })
    }

    componentDidUpdate(prevProps, prevState, prevContext) {

        if (prevProps.expID !== this.props.expID) {
            this.updateData();
        }

    }

    componentDidMount() {
        this.setState({
            expID: this.props.expID
        })
        this.updateData()

    }


    render() {
        if (this.props.expID === "Select one") {
            return <div></div>
        } else {
            return (
                <div className="row">
                    <div className="col-12">
                        <h3>{`Experiment : ${this.props.expID}`}</h3>
                    </div>
                    <div className="col-12 mt-4">
                        <div id="dashboardTable">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Participant ID</th>
                                    <th scope="col">Weighted Rating</th>
                                    <th scope="col">Date and Time</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.tableData}
                                </tbody>
                            </table>
                        </div>
                        <hr/>
                    </div>

                    <h1 className="mt-3">Taskload chart of participants</h1>
                    <div className="row justify-content-center align-items-center w-100 mt-5">

                        <div className="col-auto">
                            <BarChart width={730} height={250} data={this.chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis label={{ value: 'Participants', position: 'bottom' }} dataKey="name" />
                                <YAxis label={{ value: 'Taskload', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
                                <Tooltip />
                                <Legend align="right" verticalAlign="bottom" height={36} />
                                <Bar dataKey="Taskload" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

DashboardTable.propTypes = {};
DashboardTable.defaultProps = {};

export default DashboardTable;

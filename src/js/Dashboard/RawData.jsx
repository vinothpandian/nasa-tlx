import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis} from "recharts";

const axios = require("axios");
const moment = require("moment");

class RawData extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rawdata: {}
        }

    }

    componentDidMount() {
        axios.get(`http://localhost:3000/participant/${this.props.match.params.expID}/${this.props.match.params.partID}`)
            .then((res) => {
                this.setState({
                    rawdata: res.data
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }


    render() {

        let scaleTableHead = [];
        let scaleTableRow = [];
        let workloadTableHead = [];
        let workloadTableRow = [];
        let weightedWorkloadTableHead = [];
        let weightedWorkloadTableRow = [];
        let taskLoad = 0;
        let data = [];
        let alertMessage = "";

        if ("scale" in this.state.rawdata && "workload" in this.state.rawdata) {
            Object.keys(this.state.rawdata.scale).map((key, i) => {

                let scale = this.state.rawdata.scale[key];
                let workload = this.state.rawdata.workload[key];
                let weightedWorkload = parseFloat(scale * workload);
                taskLoad += weightedWorkload/15;

                scaleTableHead.push(<th key={"scaleTableHead" + i} scope="col">{key}</th>);
                scaleTableRow.push(<td key={"scaleTableRow" + i}>{scale}</td>);
                workloadTableHead.push(<th key={"workloadTableHead" + i} scope="col">{key}</th>);
                workloadTableRow.push(<td key={"workloadTableRow" + i}>{workload}</td>);
                weightedWorkloadTableHead.push(<th key={"weightedWorkloadTableHead" + i} scope="col">{key}</th>);
                weightedWorkloadTableRow.push(<td key={"weightedWorkloadTableRow" + i}>{weightedWorkload}</td>);

                data.push({
                    name: key,
                    score: parseFloat((weightedWorkload/15).toFixed(2))
                })
            });
        } else {
            alertMessage = <div className="alert alert-warning"><span className="font-weight-bold">DATA INCOMPLETE.</span> <span>PLEASE CHECK THE JSON FILE FOR INFORMATION</span></div>
        }

        return (
            <div id="rawDataPage" className="container-fluid">
                <div className="row p-5">
                    <div className="col-12">
                        <h1>{`Raw data of Participant "${this.props.match.params.partID}" in Experiment "${this.props.match.params.expID}"`}</h1>
                    </div>
                    <div className="col-12 mt-4">
                        <h4 id="expTime">
                            Experiment performed at {moment(this.state.rawdata.id).format("MMMM Do YYYY, h:mm:ss a")}
                        </h4>
                        <hr/>
                    </div>
                    <div className="col-12 mt-4">
                        {alertMessage}
                        <h2 className="font-weight-bold alert alert-success">{`Weighted rating : ${taskLoad.toFixed(2)}`}</h2>
                    </div>
                    <div className="col-12 mt-4 p-2 card">
                        <div className="px-5 py-3 card-body">
                            <table className="table table-responsive">
                                <thead>
                                <th scope="row">Details</th>
                                <th></th>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="col" className="pr-5" >Age</th>
                                    <td>{this.state.rawdata.age}</td>
                                </tr>
                                <tr>
                                    <th scope="col" className="pr-5">Gender</th>
                                    <td>{this.state.rawdata.gender}</td>
                                </tr>
                                <tr>
                                    <th scope="col" className="pr-5">Experience</th>
                                    <td>{this.state.rawdata.experience}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 mt-4 p-5 card">
                        <h3 className="card-title">Raw ratings</h3>
                        <div className="px-5 py-3 card-body">
                            <table className="table table-bordered  mt-2" id="scaleTable">
                                <thead>
                                <tr>
                                    {scaleTableHead}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {scaleTableRow}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr/>
                    </div>

                    <div className="col-12 mt-4 p-5 card">
                        <h3 className="card-title">Sources of Workload tally (number of times selected)</h3>
                        <div className="px-5 py-3 card-body">
                            <table className="table table-bordered mt-2" id="workloadTable">
                                <thead>
                                <tr>
                                    {workloadTableHead}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {workloadTableRow}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-12 mt-4 p-5 card">
                        <h3 className="card-title">Adjusted Rating (Weight x Raw)</h3>
                        <div className="px-5 py-3 card-body">
                            <table className="table table-bordered  mt-2" id="workloadTable">
                                <thead>
                                <tr>
                                    {weightedWorkloadTableHead}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {weightedWorkloadTableRow}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-12 mt-4 p-5 card">
                        <h3 className="card-title">Weighted Workload score composition chart</h3>
                        <div className="row card-body justify-content-center align-items-center w-100 mt-5">

                            <div className="col-auto">
                                <BarChart width={900} height={450} data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" >
                                        <Label value="Importance Weight" offset={5} position="bottom" />
                                    </XAxis>
                                    <YAxis label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} domain={[0, 'dataMax + 10']} />
                                    <Tooltip />
                                    <Legend align="right" verticalAlign="bottom" height={36}/>
                                    <Bar dataKey="score" fill="#82ca9d" >
                                    </Bar>
                                </BarChart>
                            </div>
                            <div className="col-auto">
                                <BarChart width={200} height={400} data={[{tag: "Weighted Rating", "Overall Workload": parseFloat(taskLoad.toFixed(2))}]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="tag" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Overall Workload" fill="#8884d8" >
                                    </Bar>
                                </BarChart>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

RawData.propTypes = {};
RawData.defaultProps = {};

export default RawData;

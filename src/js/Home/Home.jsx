import React, {Component} from 'react';
var shortid = require('shortid');
const nasaLogo = require("../../assets/NasaLogo.png");
const axios = require("axios");

class Home extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();

        let partID = $("#participantID").val();
        let expID = $("#experimentID").val();

        if (!partID || partID == "", !expID || expID == "") {
            $("#alertBox").addClass("alert-danger").html("Please fill Experiment ID and Participant ID to start")
        } else {
            axios.post(`http://localhost:3000/participant/add/${expID}/${partID}`)
                .then(() => {
                    sessionStorage.clear();
                    sessionStorage.setItem("expID", expID);
                    sessionStorage.setItem("partID", partID);
                    this.props.history.push("/part1");
                }).catch((err) => {
                $("#alertBox").addClass("alert-danger").html(`Participant data of ${partID} already exist`)
            })
        }

    }

    generateRandom(event){
        event.preventDefault();

        let id = event.target.id.split("random-")

        $(`#${id[1]}`).val(shortid.generate())
    }


    render() {
        return (
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-auto text-center">
                    <div className="row">
                        <div className="col-auto pr-5">
                            <img src={nasaLogo} alt="NasaLogo" width="256"/>
                        </div>
                        <div id="expForm" className="col-auto justify-content-start text-left pl-5">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="experimentID">Experiment ID</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="experimentID"
                                           aria-describedby="textHelp"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="participantID">Participant ID</label>
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="participantID"/>
                                        <span className="input-group-btn">
                                            <button className="btn btn-info" id="random-participantID" onClick={this.generateRandom} type="button">Random</button>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-left mt-4">
                                    <button className="btn btn-lg btn-success" onClick={this.handleClick}>Start</button>
                                </div>
                                <div id="alertBox" className="alert mt-4" role="alert">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;

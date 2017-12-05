import React, {Component} from 'react';
import OptionDefinition from "./OptionDefinition";
import definitionAPI from "../../assets/datastore/definitions.json"

const axios = require("axios")

class Pairwise extends Component {

    constructor(props) {
        super(props);

        let result = _.range(6).reduce((acc, v, i) =>
                acc.concat(_.range(6).slice(i + 1).map(w => [v, w])),
            []);

        this.state = {
            questionCombo: _.shuffle(result),
            choice : [],
            completed: false
        };

        this.expID = sessionStorage.getItem("expID");
        this.partID = sessionStorage.getItem("partID");

        this.defintionTitles = Object.keys(definitionAPI);

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        event.preventDefault();

        let selection = $("#"+event.target.id).val();

        $("#questionCard").fadeOut(250, ()=>{
            this.setState((prevState, props) => {

                if(prevState.questionCombo.length === 1) {
                    return {
                        choice : [...prevState.choice, selection],
                        completed: true
                    }
                }

                return {
                    questionCombo : [...prevState.questionCombo.splice(1)],
                    choice : [...prevState.choice, selection]
                };

            })
        });

    }

    componentDidMount() {

        if(!this.expID ||this.expID =="", !this.partID || this.partID ==""){
            alert("Please start experiment from Home screen. No such experiment or participant.");
            this.props.history.push("/");
            sessionStorage.clear();
        }

        $("#cardHeader").html(`Question ${this.state.choice.length +1} of 15`)

        $("#questionCard").fadeIn("slow");
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        $("#cardHeader").html(`Question ${this.state.choice.length +1} of 15`)

        $("#questionCard").fadeIn(1);

        if(this.state.completed){

            let data = this.defintionTitles.reduce((obj, key)=>{
                obj[key] = 0;
                return obj;
            }, {});

            this.state.choice.forEach((val)=>{
                let key = this.defintionTitles[val]
                data[key] += 1
            });

            axios.put(`http://localhost:3000/participant/workload/${this.expID}/${this.partID}`, data)
                .then(()=>{
                    $("#alertBox").addClass("alert-success").html("Please inform that you have completed the NASA-TLX questionnaire successfully")
                    sessionStorage.clear();
                })
                .catch((e)=>{
                    alert("Please start experiment from Home screen. No such experiment or participant.");
                    this.props.history.push("/");
                    sessionStorage.clear();
                });
        }
    }


    render() {

        let option1 = this.state.questionCombo[0][0];
        let option2 = this.state.questionCombo[0][1];

        let title1 = this.defintionTitles[option1];
        let title2 = this.defintionTitles[option2];

        if(!this.state.completed){
            return (
                <div className="container">
                    <div  className="row questionCardContainer justify-content-center align-items-center">

                        <div id="questionCard"  className="card questionCard text-center rounded">
                            <div id="cardHeader" className="card-header">
                            </div>
                            <div className="p-5">
                                <h4 className="card-title">Of the two workload measures below, which one contributed the most to
                                    the task you just completed?</h4>
                                <div className="card-body text-center justify-content-center">
                                    <div className="row">
                                        <div className="col-12">
                                            <button className="btn btn-lg w-75 btn-primary" id={`button${option1}`} value={option1} onClick={this.handleClick}>{title1}</button>
                                        </div>
                                        <div className="col-12">
                                            <p className="lead">or</p>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-lg w-75 btn-primary" id={`button${option2}`} value={option2} onClick={this.handleClick}>{title2}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row justify-content-around align-items-stretch">

                        <OptionDefinition optionTitle={title1}
                                          optionDefinition={definitionAPI[title1]}/>
                        <OptionDefinition optionTitle={title2}
                                          optionDefinition={definitionAPI[title2]}/>
                    </div>
                </div>

            );
        } else {
            return (
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-auto">
                        <h1 className="display-3">
                            Thank you for your submission
                        </h1>
                        <div id="alertBox" className="alert text-center mt-4" role="alert">

                        </div>
                    </div>
                </div>
            );
        }
    }
}

Pairwise
    .propTypes = {};
Pairwise
    .defaultProps = {};

export default Pairwise;

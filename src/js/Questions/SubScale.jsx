import React, {Component} from 'react';
import SubScaleQuestion from "./SubScaleQuestion";

const axios = require("axios");

class SubScale extends Component {

    constructor(props) {
        super(props);

        this.modified = false;

        this.expID = sessionStorage.getItem("expID");
        this.partID = sessionStorage.getItem("partID");

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        event.preventDefault();

        if(this.modified){

            let data = _.range(1,7).reduce(
                (map, i)=>{
                    let key = $("#slider"+i).attr("data-name");
                    let value = $("#slider"+i).slider("value");
                    map[key] = value;
                    return map
                }, {}
            );

            axios.put(`http://localhost:3000/participant/scale/${this.expID}/${this.partID}`, data)
                .then(()=>{

                    $("#subScaleContainer").fadeOut(1000, ()=>{
                        this.props.history.push("/part2");
                    })
                })
                .catch((e)=>{
                    alert("Please start experiment from Home screen. No such experiment or participant. "+e);
                    this.props.history.push("/");
                    sessionStorage.clear();
                });
        } else{
          $("#alertBox").addClass("alert-danger").html("Please answer before continuing to the next part of the question")
        }
    }

    componentDidMount() {
        if(!this.expID ||this.expID =="", !this.partID || this.partID ==""){
            alert("Please start experiment from Home screen. No such experiment or participant.");
            this.props.history.push("/");
            sessionStorage.clear();
        }

        $('[id^=slider]').slider({
            change: ()=>{
                this.modified = true;
            }
        })
    }


    render() {
        return (
            <div id={"subScaleContainer"} className="container p-5">
                <div className="card my-5">
                    <h3 className="card-header">Workload</h3>
                    <div className="card-body">
                        <p className="text-info">Please note that the following scale is a measure of how well you think you did on the task.</p>
                        <hr/>
                        <SubScaleQuestion id="slider1" title="Mental Demand"  description="How mentally demanding was the task?" leftValue={"Low"} rightValue={"High"}/>
                        <hr/>
                        <SubScaleQuestion id="slider2" title="Physical Demand"  description="How physically demanding was the task?" leftValue={"Low"} rightValue={"High"}/>
                        <hr/>
                        <SubScaleQuestion id="slider3" title="Temporal Demand"  description="How hurried or rushed was the pace of the task?" leftValue={"Low"} rightValue={"High"}/>
                        <hr/>
                        <SubScaleQuestion id="slider4" title="Performance"  description="How successful were you in accomplishing the task?" leftValue={"Poor"} rightValue={"Good"} />
                        <hr/>
                        <SubScaleQuestion id="slider5" title="Effort"  description="How hard did you have to work to accomplish your level of performance?" leftValue={"Low"} rightValue={"High"}/>
                        <hr/>
                        <SubScaleQuestion id="slider6" title="Frustration Level"  description="How insecure, discouraged, irritated, stressed, or annoyed were you?" leftValue={"Low"} rightValue={"High"}/>
                    </div>
                </div>

                <div className="container mt-5 text-right">
                    <button className="btn btn-lg btn-success" onClick={this.handleClick}>Continue <i
                        className="material-icons">navigate_next</i></button>
                </div>

                <div id="alertBox" className="alert mt-4" role="alert">

                </div>
            </div>
        );
    }
}

SubScale.propTypes = {};
SubScale.defaultProps = {};

export default SubScale;

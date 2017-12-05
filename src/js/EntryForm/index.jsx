import React, {Component} from 'react';
import RadioButton from "./RadioButton";
import RadioButtonGroup from "./RadioButtonGroup";
const axios = require("axios");

class EntryForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ageGroup: "",
            genderGroup: "",
            experienceGroup: ""
        };

        this.expID = sessionStorage.getItem("expID");
        this.partID = sessionStorage.getItem("partID");

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        if(!this.expID ||this.expID ==="", !this.partID || this.partID ===""){
            alert("Please start experiment from Home screen. No such experiment or participant.");
            this.props.history.push("/");
            sessionStorage.clear();
        }
    }


    handleSubmit(event){
        event.preventDefault();

        if(this.state.ageGroup == "" || this.state.genderGroup == "" || this.state.experienceGroup == ""){
            $("#alertBox").addClass("alert-danger").html("Please enter all the details")
        } else {
            axios.put(`http://localhost:3000/participant/details/${this.expID}/${this.partID}`, this.state)
                .then(()=>{
                        this.props.history.push("/part1");
                })
                .catch((e)=>{
                    alert("Please start experiment from Home screen. No such experiment or participant. "+e);
                    this.props.history.push("/");
                    sessionStorage.clear();
                });
        }
    }

    onSelect(name, value) {
        this.setState({
            [name] : value
        })
    }

    render() {
        return (
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-auto">
                    <form onSubmit={this.handleSubmit}>
                        <div className="card">
                            <div className="card-header">
                                <h4>Please enter your details</h4>
                            </div>
                            <div className="card-body">
                                <RadioButtonGroup id="ageGroup" title="Choose your age group" onSelect={this.onSelect} values={["20-23", "23-25", "25-27", "27-30"]}/>
                                <hr/>
                                <RadioButtonGroup id="genderGroup" title="Choose your gender" onSelect={this.onSelect} values={["Male", "Female", "Other"]}/>
                                <hr/>
                                <RadioButtonGroup id="experienceGroup" title="Choose your experience" onSelect={this.onSelect} values={["0-2 years", "2-4 years", "More than 5 years"]}/>
                                <div id="alertBox" className="alert mt-2" role="alert"></div>
                            </div>
                            <div className="card-footer text-right">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EntryForm;

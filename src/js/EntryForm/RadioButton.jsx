import React, {Component} from 'react';

class RadioButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            other: false,
            value: ""
        };

        this.handleClick = this.handleClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.otherSelected = this.otherSelected.bind(this);
        this.onInputFocus = this.onInputFocus.bind(this);
    }


    handleClick(event) {


        this.setState({
            other: false
        });

        this.props.onSelect(this.props.name, event.target.value);
    }

    onInputChange(event) {

        this.setState({
            value: event.target.value
        });

        if(this.state.other) {
            this.props.onSelect(this.props.name, event.target.value);
        }
    }

    otherSelected(event){

        this.setState({
            other: true
        });

        this.props.onSelect(this.props.name, event.target.value);
    }

    onInputFocus(event){
        $("#"+this.props.id+"Other").prop("checked","true");

        this.setState({
            other: true
        });

        this.props.onSelect(this.props.name, event.target.value);
    }


    render() {

        if (this.props.value.toLowerCase() === "other") {
            return (
                <div className="form-check form-check-inline  mr-5">
                    <label className="form-check-label">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <input onChange={this.otherSelected} type="radio" name={this.props.name} id={this.props.id+this.props.value} value={this.state.value}/>
                            </span>
                            <input type="text" className="form-control" name="other_values" onFocus={this.onInputFocus} onChange={this.onInputChange} placeholder={this.props.value} value={this.state.value}/>
                        </div>

                    </label>
                </div>
            )
        }

        return (
            <div className="form-check form-check-inline mr-5">
                <label className="form-check-label">
                    <input className="form-check-input" onChange={this.handleClick} type="radio" name={this.props.name}
                           id={this.props.id} value={this.props.value}/> {this.props.value}
                </label>
            </div>
        );
    }
}

export default RadioButton;

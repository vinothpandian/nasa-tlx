import React, {Component} from 'react';
import RadioButton from "./RadioButton";

class RadioButtonGroup extends Component {
    render() {
        return (
            <div className="form-group">
                <label className="col-form-label" htmlFor={this.props.id}>{this.props.title}</label>
                <div id={this.props.id}>
                    {
                        this.props.values.map((value, index)=>{
                            return <RadioButton key={"radio"+index} name={this.props.id} onSelect={this.props.onSelect} id={this.props.id+index} value={value}  />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default RadioButtonGroup;

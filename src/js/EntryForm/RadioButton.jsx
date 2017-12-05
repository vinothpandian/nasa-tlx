import React, {Component} from 'react';

class RadioButton extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.props.onSelect(this.props.name, event.target.value);
    }


    render() {
        return (
            <div className="form-check form-check-inline mr-5">
                <label className="form-check-label">
                    <input className="form-check-input" onClick={this.handleClick} type="radio" name={this.props.name} id={this.props.id} value={this.props.value}/> {this.props.value}
                </label>
            </div>
        );
    }
}

export default RadioButton;

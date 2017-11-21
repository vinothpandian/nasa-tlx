import React, {Component} from 'react';

class OptionDefinition extends Component {
    render() {

        const borderStyle = {
            border: "rgba(0, 0, 0, 0.125) 1px solid"
        };

        return (
            <div className="col-5 border rounded" style={borderStyle}>
                <div className="card border-0 p-3">
                    <h4 className="card-title">{this.props.optionTitle} <i
                        className="float-right text-info material-icons">info_outline</i></h4>
                    <div className="card-body">
                        <p>
                            {this.props.optionDefinition}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

OptionDefinition.propTypes = {};
OptionDefinition.defaultProps = {};

export default OptionDefinition;

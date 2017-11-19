import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OptionDefinition extends Component {
    render() {
        return (
            <div className="col-6 border-light p-1">
                <div className="card p-3">
                    <h4 className="card-title">{this.props.optionTitle}</h4>
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

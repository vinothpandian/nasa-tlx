import React, {Component} from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends Component {
    render() {
        return (
            <div className="col-auto card questionCard text-center p-5 rounded">
                <h4 className="card-title">Of the two workload measures below, which one contributed the most to
                    the task you just completed?</h4>
                <div className="card-body text-center justify-content-center">
                    <div className="row">
                        <div className="col-12">
                            <button className="btn btn-lg w-75 btn-primary">{this.props.option1}</button>
                        </div>
                        <div className="col-12">
                            <p className="lead">or</p>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-lg w-75 btn-primary">{this.props.option2}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

QuestionCard.propTypes = {};
QuestionCard.defaultProps = {};

export default QuestionCard;

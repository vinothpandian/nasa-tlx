import React, {Component} from 'react';
import PropTypes from 'prop-types';

var _ = require('lodash');
require('jquery-ui');
require('jquery-ui/themes/base/theme.css');
require('jquery-ui/themes/base/core.css');
require('jquery-ui/themes/base/slider.css');
require('jquery-ui/ui/widgets/slider');

class SubScaleQuestion extends Component {

    componentDidMount() {
        $(`#${this.props.id}`).slider({
            value: 50,
            min: 0,
            max: 100,
            step: 5
        });
    }


    render() {

        let boxes = _.range(0, 21).map((num) => {
            let boxStyle = {
                left: num * 5 + "%"
            }

            return <span key={"box" + num} className="tick text-muted" style={boxStyle}>|</span>
        })

        return (
            <div className="row mt-4 align-items-center justify-content-center">
                <div className="col-4 align-middle">
                    <h4>{this.props.title}</h4>
                    <p className="lead">{this.props.description}</p>
                </div>
                <div className="col-8 align-items-center justify-content-center">
                    <div className="sliderContainer pl-5">
                        <div className="steps">
                            {boxes}
                        </div>
                        <div id={this.props.id} data-name={this.props.title} ></div>
                        <div className="row mt-2">
                            <div className="col-4 text-left">Low</div>
                            <div className="col-4 text-center">Neutral</div>
                            <div className="col-4 text-right">High</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SubScaleQuestion.propTypes = {};
SubScaleQuestion.defaultProps = {};

export default SubScaleQuestion;

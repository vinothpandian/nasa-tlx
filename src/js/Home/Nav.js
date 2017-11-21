import React, {Component} from 'react';
import definitionAPI from "../../assets/datastore/definitions.json"

const nasaLogo = require("../../assets/NasaLogo.png");

class Nav extends Component {

    handleInsClick(event) {
        event.preventDefault();

        $('#instructionsModal').modal('show');
    }

    handleDefClick(event) {
        event.preventDefault();

        $('#definitionsModal').modal('show');
    }

    render() {

        let definitions = []

        Object.entries(definitionAPI).forEach(
            ([key, value], index) => {
                definitions.push(<dt key={"dt"+index} className="col-3 mt-4">{key}</dt>);
                definitions.push(<dd  key={"dd"+index} className="col-9 mt-4">{value}</dd>);
            }
        );

        return (
            <div>
                <nav className="navbar justify-content-between navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="#">
                        <img className="mr-3" src={nasaLogo} alt="Logo" height="30"/>
                        Nasa TLX
                    </a>
                    <form className="form-inline">
                        <button className="btn btn-info mt-3 mr-3" onClick={this.handleDefClick}>Definitions <i
                            className="navbar-material-icon material-icons">help_outline</i></button>
                        <button className="btn btn-success mt-3" onClick={this.handleInsClick}>Instructions <i
                            className="navbar-material-icon material-icons">info_outline</i></button>
                    </form>
                </nav>

                <div id="definitionsModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog"
                     aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Definitions</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <dl className="row">
                                    {definitions}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="instructionsModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog"
                     aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Subscale Ratings</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>The following assessment is used to measure your personal opinion on how much
                                    workload was required of you during the task you just completed.</p>
                                <p>Please rate all six workload measures by clicking a point on the scale that best
                                    represents your experience with the task you just completed.</p>
                                <p>Consider each scale individually and select your responses carefully.</p>
                                <p>Please note that the last scale (Performance) is a measure of how well you think you
                                    did on the task with Very Low performance on the left, and Very High performance on
                                    the right.</p>
                                <p>Your ratings will play an important role in the evaluation being conducted. Your
                                    active participation is essential to the success of this experiment, and is greatly
                                    appreciated.</p>
                            </div>
                            <div className="modal-footer justify-content-start">
                                <p> Click the Submit button when you have complete all six ratings</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Nav;

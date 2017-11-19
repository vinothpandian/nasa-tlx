import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavLink from "react-router-dom/es/NavLink";

class PageNotFound extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-auto text-center">
                        <h1 className="display-1">404</h1>
                        <p className="lead">We couldn't find the page..</p>
                        <p className="text-danger">
                            Sorry, but the page you are looking for was either not found or does not exist.
                            Try refreshing the page or click the button below to go back to the Homepage.
                        </p>
                        <NavLink exact className="btn btn-lg btn-primary" to="/">Home</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

PageNotFound.propTypes = {};
PageNotFound.defaultProps = {};

export default PageNotFound;

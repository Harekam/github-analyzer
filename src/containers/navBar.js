import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { logout } from '../actions';
import { toastr } from 'react-redux-toastr';
import { withRouter } from "react-router-dom";
class NavBar extends Component {
    componentDidMount() {
        $(".button-collapse").sideNav();
    }
    onUserLoggedOut() {
        return (
            <header>
                <nav className="top-nav">
                    <div className="container">
                        <div className="nav-wrapper"><a className="page-title">Github Analyzer</a></div>
                    </div>
                </nav>
                <div className="container">
                    <a href="#" data-activates="slide-out" className="button-collapse top-nav full hide-on-large-only">
                        <i className="material-icons">menu</i>
                    </a>
                </div>
                <ul id="slide-out" className="side-nav fixed">
                    <li><div className="user-view">
                        <div className="background avatar-bg">
                        </div>
                        <a href="#!user"><img className="circle" src="../../images/github_logo.png" /></a>
                        <a href="#!name"><span className="white-text name">Not Logged In</span></a>
                    </div></li>
                    <li><a href="#!">About</a></li>
                </ul>
            </header>
        );
    }
    onLogout() {
        this.props.logout(() => {
            console.log(this.props);
            $('.button-collapse').sideNav('hide');
            this.props.history.push('/login');
            toastr.success('Success', 'Logged out!');
        });
    }
    onUserAuthenticated(userDetails) {
        return (
            <header>
                <nav className="top-nav">
                    <div className="container">
                        <div className="nav-wrapper"><a className="page-title">Github Analyzer</a></div>
                    </div>
                </nav>
                <div className="container"><a href="#" data-activates="nav-mobile" className="button-collapse top-nav full hide-on-large-only">
                    <i className="material-icons">menu</i>
                </a>
                </div>
                <ul id="slide-out" className="side-nav">
                    <li><div className="user-view">
                        <div className="background avatar-bg">
                        </div>
                        <a href="#!user"><img className="circle" src={userDetails.avatar_url} /></a>
                        <a href="#!name"><span className="white-text name">{userDetails.name}</span></a>
                    </div></li>
                    <li><a href="javascript:void(0);">About</a></li>
                    <li><a href="javascript:void(0);" onClick={this.onLogout.bind(this)}>Logout</a></li>
                </ul>
            </header>);
    }
    render() {
        const { userAuth } = this.props;
        const { authenticated, userDetails } = userAuth;
        return (
            <div> {authenticated ? this.onUserAuthenticated(userDetails) : this.onUserLoggedOut()}</div>
        );

    }
}
function mapStateToProps({ userAuth }) {
    return { userAuth };
}
export default withRouter(connect(mapStateToProps, { logout })(NavBar));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { logout, titleUpdate } from '../actions';
import { toastr } from 'react-redux-toastr';
import { DEFAULT_TITLE } from '../configs';
import { closeSideNavIfOpen } from '../utils/util';
class NavBar extends Component {
    componentDidMount() {
        $(".button-collapse").sideNav();
    }
    onUserLoggedOut() {
        return (
            <header>
                <nav className="top-nav">
                    <div className="container">
                        <div className="nav-wrapper"><a className="page-title">{this.props.navDetails.title}</a></div>
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
                        <img className="circle" src="../../images/github_logo.png" />
                        <span className="white-text name">Not Logged In</span>
                    </div></li>
                    <li><Link to="/login" onClick={this.onTitleUpdate.bind(this, DEFAULT_TITLE)}>Login</Link></li>
                    <li><Link to="/about" onClick={this.onTitleUpdate.bind(this, 'About')}>About</Link></li>
                </ul>
            </header>
        );
    }
    onTitleUpdate(title) {
        closeSideNavIfOpen();
        this.props.titleUpdate({ title });
    }
    onLogout() {
        this.props.logout(() => {
            closeSideNavIfOpen();
            this.props.history.push('/login');
            toastr.success('Success', 'Logged out!');
        });
    }
    onUserAuthenticated(userDetails) {
        return (
            <header>
                <nav className="top-nav">
                    <div className="container">
                        <div className="nav-wrapper"><a className="page-title">{this.props.navDetails.title}</a></div>
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
                        <a href={userDetails.html_url} target="_blank"><img className="circle" src={userDetails.avatar_url} /></a>
                        <a href={userDetails.html_url} target="_blank"><span className="white-text name">{userDetails.name}</span></a>
                    </div></li>
                    <li><Link to="/" onClick={this.onTitleUpdate.bind(this, 'Dashboard')}>Dashboard</Link></li>
                    <li><a href="javascript:void(0);" onClick={this.onLogout.bind(this)}>Logout</a></li>
                    <li><Link to="/about" onClick={this.onTitleUpdate.bind(this, 'About')}>About</Link></li>
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
function mapStateToProps({ userAuth, navDetails }) {
    return { userAuth, navDetails };
}
export default withRouter(connect(mapStateToProps, { logout, titleUpdate })(NavBar));
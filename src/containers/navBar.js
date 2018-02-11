import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { logout } from '../actions';
import { toastr } from 'react-redux-toastr';
class NavBar extends Component {
    componentDidMount() {
        $(".button-collapse").sideNav();
    }
    onUserLoggedOut() {
        return (
            <div>
                <ul id="slide-out" className="side-nav">
                    <li><div className="user-view">
                        <div className="background avatar-bg">
                        </div>
                        <a href="#!user"><img className="circle" src="../../images/github_logo.png" /></a>
                        <a href="#!name"><span className="white-text name">Not Logged In</span></a>
                    </div></li>
                    <li><a href="#!">About</a></li>
                </ul>
                <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
        );
    }
    onLogout() {
        this.props.logout(() => {
            console.log(this.props);
            this.props.history.push('/login');
            toastr.success('Success', 'Logged out!');
        });
    }
    onUserAuthenticated(userDetails) {
        return (
            <div>
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
                <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>);
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
export default connect(mapStateToProps, { logout })(NavBar)
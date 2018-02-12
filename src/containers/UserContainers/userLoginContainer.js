import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, titleUpdate } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

class UserLogin extends Component {
    // componentWillReceiveProps(nextProps) {
    //     if (!this.props.userAuth.isLoginError && nextProps.userAuth.isLoginError) {
    //         toastr.error('Login Error', 'Cannot Login! Please verify your username or password!');
    //     }
    // }
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `input-field col s6 ${touched && error ? 'has-danger' : ''}`
        return (
            <div className="row">
                <div className={className}>
                    <label>{field.label}</label>
                    <input
                        className="validate"
                        type={field.type}
                        {...field.input}
                        required
                    />
                    <div className="error-input">
                        {touched ? error : ''}
                    </div>
                </div>
            </div>
        );
    }
    onSubmit(values) {
        console.log(this.props);
        this.props.login(values, (err) => {
            if (err) {
                toastr.error('Login Error', 'Cannot Login! Please verify your username or password!');
                return;
            }
            this.props.history.push('/');
            this.props.titleUpdate({ title: 'Dashboard' });
            toastr.success('Success', 'Logged in!');
        });
    }
    render() {
        const { handleSubmit, userAuth } = this.props;
        const { isLoggingIn } = userAuth;
        const btnClasses = `btn btn-theme-color waves-effect waves-light ${isLoggingIn ? 'disabled' : ''}`;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Github Username"
                    name="username"
                    type="text"
                    component={this.renderField}
                />
                <Field
                    label="Github Password"
                    name="password"
                    type="password"
                    component={this.renderField}
                />
                <div className="row">
                    <button type="submit" className={btnClasses}>
                        {isLoggingIn ? 'Logging in...' : 'Submit'}
                    </button>
                </div>
            </form>
        );
    }
}
function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = "Enter username";
    }
    if (!values.password) {
        errors.password = "Enter password";
    }
    return errors;
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}
export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    connect(mapStateToProps, { login, titleUpdate })(UserLogin)
);
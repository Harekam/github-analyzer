import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions';
import { toastr } from 'react-redux-toastr';

export default class Home extends Component {

    render() {
        return (
            <div>
                <h3>Logged in!!</h3>
            </div>
        );
    }
}
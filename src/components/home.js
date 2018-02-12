import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions';
import { toastr } from 'react-redux-toastr';
import { Doughnut } from 'react-chartjs-2';
import Emoji from 'react-emoji-render';

const data = {
    labels: [
        'Followers',
        'Following',
        'Public Gists',
        'Public Repos',
        'Private Gists',
        'Private Repos'
    ],
    datasets: [{
        data: [],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4bc0c0',
            '#d500f9',
            '#ff6e40'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4bc0c0',
            '#d500f9',
            '#ff6e40'
        ]
    }]
};
class Home extends Component {

    render() {
        const { userAuth } = this.props;
        const { userDetails } = userAuth;
        data.datasets[0].data = [
            userDetails.followers,
            userDetails.following,
            userDetails.public_gists,
            userDetails.public_repos,
            userDetails.private_gists,
            userDetails.total_private_repos
        ];
        return (
            <div>
                <Doughnut data={data} />
                <h4>Bio</h4>
                <br />
                <Emoji text={userDetails.bio} />
            </div>
        );
    }
}
function mapStateToProps({ userAuth }) {
    return { userAuth };
}
export default connect(mapStateToProps)(Home)
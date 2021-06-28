import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebase } from '../../firebase';

const Logout = () => {

    const logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            <Redirect to="/" />
        })
    }

    return (
        <div>
            {logoutHandler()}
        </div>
    );
};

export default Logout;
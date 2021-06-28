import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Layout from '../../hoc/Layout'

const PrivateRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Layout nav={rest.restricted} user={user} >
            <Route {...rest} component={(props) => (
                user.uid ?
                    <Comp {...props} user={user} />
                    :
                    <Redirect to="/userauth" />
            )} />
        </Layout>
    );
};

export default PrivateRoutes;
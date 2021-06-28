import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from '../../hoc/Layout'

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
    return (
        <Layout nav={rest.restricted} user={user} >
            <Route {...rest} component={(props) => (
                rest.restricted ?
                    (user.uid ?
                        <Redirect to="/admin/dashboard" />
                        :
                        <Comp {...props} user={user} />
                    )
                    :
                    <Comp {...props} user={user} />
            )} />
        </Layout>
    );
};

export default PublicRoutes;
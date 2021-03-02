import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticate } from '../../utils/index';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            authenticate() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;
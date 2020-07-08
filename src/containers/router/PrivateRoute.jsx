/* eslint-disable react/display-name */
 
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';

const PrivateRoute = ({ component: RouteComponent, user, location, ...rest }) => {
    const hasToken = !!localStorage.getItem('token');
    let Component;
    if (user) {
        Component = props => (<RouteComponent {...props} />);
    } else if(hasToken) {
        Component = () => <Spin />
    } else {
        Component = () => (
            <Redirect to={{
                pathname: '/login',
                state: { from: location }
            }} />);
    }
    return (
        <Route {...rest} render={props => Component(props)} />
    )
};
PrivateRoute.propTypes = {
    component: PropTypes.any,
    user: PropTypes.object,
    location: PropTypes.object,
    rest: PropTypes.object,
};

export default PrivateRoute;
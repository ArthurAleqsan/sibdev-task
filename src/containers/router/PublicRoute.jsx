import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({ user, children, ...rest }) => {
    if (user) return <Redirect to='/' />
    return (<Route {...rest}>{children}</Route>)
};
PublicRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.objectOf(PropTypes.any).isRequired,
    rest: PropTypes.object,
};

export default PublicRoute;
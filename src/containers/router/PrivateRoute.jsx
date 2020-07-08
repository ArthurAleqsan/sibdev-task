 
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { setUser } from '../../store/user/user.actions';

const PrivateRoute = ({ component: RouteComponent, user, location, ...rest }) => {
    const expireDate = localStorage.getItem('accessTokenExpiresAt');
    const now = new Date().getTime();
    let isTokenExpired;
    if (expireDate) {
        const activeExpiredDate = new Date(expireDate).getTime();
        if (activeExpiredDate > now) {
            isTokenExpired = true;
        }
    }
    const hasToken = !!localStorage.getItem('token');
    let Component;
    if (user && isTokenExpired) {
        Component = props => (<RouteComponent {...props} />);
    } else {
        localStorage.clear();
        localStorage.token && window.location.reload();
        hasToken && window.location.reload();
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
const mapStateToProps = state => {
    const { user } = state.user;
    return {
        user,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
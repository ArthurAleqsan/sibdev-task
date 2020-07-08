import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PublicRoute from './PublicRoute';
import Auth from '../Auth/Auth';
import PrivateRoute from './PrivateRoute';
import App from './App';


import { getUser } from '../../store/user/user.actions';

const MainRouter = ({ user, getUser }) => {
    const hasToken = !!localStorage.getItem('token');
    if (hasToken && !user) {
        getUser();
    }
    const PUBLIC_PATH = '/login';
    return (
        <div className='main-container'>
            <Switch>
                <PublicRoute user={user} path={PUBLIC_PATH} >
                    <Auth />
                </PublicRoute>
                <PrivateRoute user={user} path='/' component={App} />
            </Switch>
        </div>
    );
};
MainRouter.propTypes = {
    user: PropTypes.object,
    getUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
    return {
        user: state.user.user,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (user) => dispatch(getUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainRouter));

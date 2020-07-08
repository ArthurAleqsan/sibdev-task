import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import Auth from '../Auth/Auth';
import PrivateRoute from './PrivateRoute';
import App from './App';

const MainRouter = () => {

    const PUBLIC_PATH = '/auth';

    return (
        <div className='main-container'>
            <Switch>
                <PublicRoute path={PUBLIC_PATH} >
                    <Switch>
                        <Route path={`${PUBLIC_PATH}`} component={() => (<Auth />)} />
                    </Switch>
                </PublicRoute>
                <PrivateRoute path='/' component={App} />
            </Switch>
        </div>
    );
};

export default withRouter(MainRouter);

import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store, { history } from './store/configureReduxStore';
import Routes from './containers/router';
import 'antd/dist/antd.css';
import './../assets/styles/index.scss';
import './i18n';
import { Spin } from 'antd';
render((
    <Provider store={store} >
        <Router history={history}>
            <Suspense fallback={<Spin />}>
                <Routes />
            </Suspense>
        </Router>
    </Provider>
), document.getElementById('app'));
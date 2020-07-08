import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/Header';
import Schemas from '../pages/Schemas';
import CreateSchema from '../pages/CreateSchema';

const App = () => {
    return (
        <div className='ptivate-container'>
            <Header />
            <Switch>
                <Route path='/create' component={(CreateSchema)} />
                <Route path='/' component={(Schemas)} />
            </Switch>
        </div>
    )
};

export default App;

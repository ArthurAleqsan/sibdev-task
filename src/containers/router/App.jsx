import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/Header';
import Schemas from '../pages/Schemas';
import CreateSchema from '../pages/CreateSchema';
import Task from '../pages/Task';

const App = () => {
    return (
        <div className='ptivate-container'>
            <Header />
            <Switch>
                <Route path='/create' component={(CreateSchema)} />
                <Route path='/edit/:id' component={(CreateSchema)} />
                <Route path='/task/:id' component={(Task)} />
                <Route path='/' component={(Schemas)} />
            </Switch>
        </div>
    )
};

export default App;

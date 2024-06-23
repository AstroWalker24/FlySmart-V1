import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomePage from './HomePage';
import { Switch } from '@headlessui/react';
import ReactDOM from 'react-dom';
import App from '..';



const AppRouter=()=>{
    return(
        <Router>
            <App/>
        </Router>,
        document.getElementById('root')
    );
};

export default AppRouter;
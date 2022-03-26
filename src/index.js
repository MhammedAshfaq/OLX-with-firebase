import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from './firebase/config'
import { FirebaseContext } from './store/Context'
import Context from './store/Context'

ReactDOM.render(
    <Context>
        <FirebaseContext.Provider value={{ firebase }}>
            <App />
        </FirebaseContext.Provider>
    </Context>
    , document.getElementById('root')
);

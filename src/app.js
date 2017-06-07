
import React, { Component } from 'react';
import App from './components/App';
import { Provider } from 'mobx-react';
import stores from './stores'

export default class AppContainer extends Component {
    render() {
        return (
            <Provider {...stores} >
                <App />
            </Provider>
        )
    }
} ;

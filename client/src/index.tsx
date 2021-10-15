import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './Application';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './style/css/bundle.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Application />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

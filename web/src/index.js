import 'rxjs';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import registerServiceWorker from './registerServiceWorker';
import 'css/base.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

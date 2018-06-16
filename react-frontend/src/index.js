import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'bulma/css/bulma.css';
import './app.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

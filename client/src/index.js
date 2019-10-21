import React from 'react';
import ReactDOM from 'react-dom';
import TwitterAnalyst from './TwitterAnalyst';
import "./assets/scss/black-dashboard-react.scss";
import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TwitterAnalyst />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

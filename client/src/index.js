import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SuccessPage_PGCheckout from './components/SuccessPage_PGCheckout';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={App}/>
      <Route path="/success_pg_checkout" component={SuccessPage_PGCheckout} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

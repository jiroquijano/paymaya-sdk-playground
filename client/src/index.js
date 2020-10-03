import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SuccessPage_PGCheckout from './components/SuccessPage_PGCheckout';
import SuccessPage_OneTimePay from './components/SuccessPage_OneTimePay';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={App}/>
      <Route path="/success_pg_checkout" component={SuccessPage_PGCheckout} />
      <Route path="/success_onetimepay" component={SuccessPage_OneTimePay} />
      <Route path="/failure" component={(e)=>(<><h1>Welp, that failed</h1></>)} />
      <Route path="/cancel" component={(e)=>(<><h1>Ya just got... Canceldttt</h1></>)} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

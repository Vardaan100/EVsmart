import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signin from "./components/Signin";
import SignUp from "./components/Signup";
import Landing from "./components/Landing";
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function App() {
  return (<Router>
    <div className="App">
      <Navbar />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/ || landing' component={Landing} />
            <Route path="/sign-in" component={Signin} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
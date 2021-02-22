import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
// import Footer from "./components/navigation/Footer";
import Home from "./components/home components/Home";
import Contact from "./components/contacttus";
import Signup from "./components/signup";
import About from "./components/About";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/signup";
import Station from "./components/Station"
import { Fragment } from "react";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch className="App">
        <Fragment>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/contact" component={Contact} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/station" component={Station} />
          <Route path="/dashboard" component={Dashboard} />
        </Fragment>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

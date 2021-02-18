import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
import Footer from "./components/navigation/Footer";
import Home from "./components/home components/Home";
import Find from "./components/find";
import Contact from "./components/contacttus";
import Signup from "./components/signup";
import About from "./components/About";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/signup";
import { Fragment } from "react";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch className="App">
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/find" component={Find} />
          <Route path="/contact" component={Contact} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
        </Fragment>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

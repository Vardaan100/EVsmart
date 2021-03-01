import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
// import Footer from "./components/navigation/Footer";
import Home from "./components/home components/Home";
import Contact from "./components/contacttus";
import Profile from "./components/Profile";
import StationProfile from "./components/StationProfile";
import Help from "./components/Help";
import About from "./components/About";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Map from "./components/Map";
import SignUp from "./components/Signup";
import Station from "./components/Station"
import { Fragment } from "react";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch className="App">
        <Fragment>
          <Route exact path="/"  component={Home} />
          <Route exact path="/home"  component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/help" component={Help} />
          <Route path="/profile" component={Profile} />
          <Route path="/station-profile" component={StationProfile} />
          <Route path="/map" component={Map} />
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

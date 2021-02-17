import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/navigation";
import Footer from "./components/navigation/Footer";
import Home from "./components/home components/Home";
import Find from "./components/find";
import Contact from "./components/contacttus";
import Signup from "./components/signup";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/find" component={Find} />
          <Route path="/contact" component={Contact} />
          <Route path="/signup" component={Signup} />
          <Route path="/about" component={About} />
        </div>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

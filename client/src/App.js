import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/NavBar/NavBar.component";
import LandingPage from "./components/LandingPage/LandingPage.component";
import Blob from "./components/Blob/blob.component";
import Auth from "./components/Auth/Auth.component";
import Store from "./components/Store_/Store.component";
import ProductShowcase from "./components/ProductShowcase/ProductShowcase.component";

function App() {
  return (
    <Router>
      <Navbar />
      <Blob />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/auth' component={Auth} />
        <Route exact path='/store' component={Store} />
        <Route exact path='/product/:id' component={ProductShowcase} />
      </Switch>
    </Router>
  );
}

export default App;

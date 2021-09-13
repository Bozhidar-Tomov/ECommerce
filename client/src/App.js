import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const LazyNavbar = React.lazy(() => import("./components/NavBar/NavBar.component"));
const LazyLandingPage = React.lazy(() => import("./components/LandingPage/LandingPage.component"));
const LazyBlob = React.lazy(() => import("./components/Blob/blob.component"));
const LazyAuth = React.lazy(() => import("./components/Auth/Auth.component"));
const LazyStore = React.lazy(() => import("./components/Store_/Store.component"));
const LazyProductShowcase = React.lazy(() =>
  import("./components/ProductShowcase/ProductShowcase.component")
);
const LazyCheckout = React.lazy(() => import("./components/Checkout/Checkout.component"));

function App() {
  return (
    <Router>
      <React.Suspense fallback=''>
        <LazyNavbar />
        <LazyBlob />
        <Switch>
          <Route exact path='/' component={LazyLandingPage} />
          <Route exact path='/auth' component={LazyAuth} />
          <Route exact path='/store' component={LazyStore} />
          <Route exact path='/product/:id' component={LazyProductShowcase} />
          <Route exact path='/checkout/:id' component={LazyCheckout} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;

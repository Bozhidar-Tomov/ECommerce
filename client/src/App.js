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
const LazyProtectedRoute = React.lazy(() => import("./components/ProtectedRoute.component"));
const LazyActivationStatus = React.lazy(() =>
  import("./components/AccountActivation/ActivationStatus.component")
);
const LazyVerify = React.lazy(() => import("./components/AccountActivation/Verify.component"));

function App() {
  return (
    <Router>
      <React.Suspense fallback=''>
        <LazyNavbar />
        <LazyBlob />
        <Switch>
          <Route exact path='/' component={LazyLandingPage} />
          <Route exact path='/auth' component={LazyAuth} />
          <Route exact path='/auth/verify' component={LazyVerify} />
          {/* TODO: Make ActivationStatus a protected route */}
          <Route exact path='/auth/activationStatus/:token' component={LazyActivationStatus} />
          <Route exact path='/store' component={LazyStore} />
          <Route exact path='/product/:id' component={LazyProductShowcase} />
          <LazyProtectedRoute
            exact
            path='/checkout/:id'
            component={LazyCheckout}
            type='userAuthenticate'
          />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;

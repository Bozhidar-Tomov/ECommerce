import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./themes";

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
const LazyDashboard = React.lazy(() => import("./components/Dashboard/Dashboard.component"));

function App() {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  sessionStorage.setItem("theme", theme);
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />

      <Router>
        <React.Suspense fallback=''>
          <LazyNavbar themeToggler={themeToggler} />
          <LazyBlob />
          <Routes>
            <Route exact path='/' component={<LazyLandingPage />} />
            <Route exact path='/auth' component={<LazyAuth />} />
            <Route exact path='/auth/verify' component={<LazyVerify />} />
            <Route
              exact
              path='/auth/activationStatus/:token'
              component={<LazyActivationStatus />}
            />
            <Route exact path='/store' component={<LazyStore />} />
            <Route exact path='/product/:id' component={<LazyProductShowcase />} />
            <Route exact path='/dashboard' component={<LazyDashboard />} />
            <LazyProtectedRoute
              exact
              path='/checkout/:id'
              component={LazyCheckout}
              type='userAuthenticate'
            />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

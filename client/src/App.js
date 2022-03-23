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

const LazyProtectedRoute = React.lazy(() => import("./components/ProtectedRoute.component"));
const LazyActivationStatus = React.lazy(() =>
  import("./components/AccountActivation/ActivationStatus.component")
);
const LazyVerify = React.lazy(() => import("./components/AccountActivation/Verify.component"));
const LazyDashboard = React.lazy(() => import("./components/Dashboard/Dashboard.component"));

const LazyPaymentSuccess = React.lazy(() =>
  import("./components/Payment/PaymentSuccess.component")
);
const LazyPaymentCancel = React.lazy(() => import("./components/Payment/PaymentCancel.component"));
const LazyPageNotFound = React.lazy(() =>
  import("./components/PageNotFound/PageNotFound.component")
);

function App() {
  const [theme, setTheme] = useState(
    window?.matchMedia("(prefers-color-scheme: dark)")?.matches ? "dark" : "light"
  );
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
            <Route exact path='/' element={<LazyLandingPage />} />
            <Route exact path='/auth' element={<LazyAuth />} />
            <Route exact path='/auth/verify' element={<LazyVerify />} />
            <Route exact path='/auth/activationStatus/:token' element={<LazyActivationStatus />} />
            <Route exact path='/store' element={<LazyStore />} />
            <Route path='/product/:id' element={<LazyProductShowcase />} />

            <Route
              path='/payment/success'
              element={
                <LazyProtectedRoute>
                  <LazyPaymentSuccess />
                </LazyProtectedRoute>
              }></Route>
            <Route
              path='/payment/cancel'
              element={
                <LazyProtectedRoute>
                  <LazyPaymentCancel />
                </LazyProtectedRoute>
              }></Route>
            <Route
              exact
              path='/dashboard'
              element={
                <LazyProtectedRoute>
                  <LazyDashboard />
                </LazyProtectedRoute>
              }></Route>
            <Route path='*' element={<LazyPageNotFound />}></Route>
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;

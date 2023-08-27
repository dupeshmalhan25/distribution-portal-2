import React, { Component, Suspense, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import { useSelector } from "react-redux";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Logout = React.lazy(() => import("./views/pages/login/Logout"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {
  const user = useSelector((state) => state.user);
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          {user ? (
            <Route
              exact
              path="/logout"
              name="Login Page"
              element={<Logout />}
            />
          ) : (
            <Route exact path="/login" name="Login Page" element={<Login />} />
          )}
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;

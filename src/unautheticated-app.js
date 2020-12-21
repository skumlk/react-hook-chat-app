/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import React from "react";
import PropTypes from "prop-types";
import * as colors from "./styles/colors";
import { Route, Link, Switch } from "react-router-dom";
import { CenterContent } from "utils/main";

function Login() {
  return (
    <CenterContent>
      <form
        className="grid gap-4 p-4"
        css={{
          width: 500,
          backgroundColor: colors.green,
          gridTemplateColumns: "min-content auto",
        }}
      >
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" type="text" />
        <input type="submit" className="col-span-2" value="Login" />
        <Link to="/register">Register</Link>
      </form>
    </CenterContent>
  );
}

function Register() {
  return (
    <CenterContent>
      <form
        className="grid gap-4 p-4"
        css={{
          width: 500,
          backgroundColor: colors.green,
          gridTemplateColumns: "min-content auto",
        }}
      >
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" type="text" />
        <input type="submit" className="col-span-2" value="Register" />
        <Link to="/login">Login</Link>
      </form>
    </CenterContent>
  );
}

function UnauthenticatedApp(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

UnauthenticatedApp.propTypes = {};

export default UnauthenticatedApp;

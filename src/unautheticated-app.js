/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import * as colors from "./styles/colors";
import { Route, Link, Switch } from "react-router-dom";
import { CenterContent } from "utils/main";
import { useFirebaseAuth } from "context/firebase/auth-context";
import { Input, Button } from "@chakra-ui/react";

function Login() {
  const { login } = useFirebaseAuth();

  function onLogin(e) {
    e.preventDefault();
    const { email, password } = e.target;
    login(email.value, password.value)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error));
  }

  return (
    <CenterContent>
      <form
        className="grid gap-4 p-4"
        css={{
          width: 500,
          backgroundColor: colors.green,
          gridTemplateColumns: "min-content auto",
        }}
        onSubmit={onLogin}
      >
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" />
        <label htmlFor="password">Password</label>
        <Input id="password" type="text" />
        <Button type="submit" className="col-span-2">
          Login
        </Button>
        <Button>
          <Link to="/register">Register</Link>
        </Button>
      </form>
    </CenterContent>
  );
}

function Register() {
  const { register } = useFirebaseAuth();

  function onRegister(e) {
    e.preventDefault();
    const { email, name, password } = e.target;
    register(name.value, email.value, password.value)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error));
  }

  return (
    <CenterContent>
      <form
        className="grid gap-4 p-4"
        css={{
          width: 500,
          backgroundColor: colors.green,
          gridTemplateColumns: "min-content auto",
        }}
        onSubmit={onRegister}
      >
        <label htmlFor="name">Full Name</label>
        <Input id="name" type="text" />
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" />
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
        <Button type="submit" className="col-span-2">
          Register
        </Button>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
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

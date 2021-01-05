/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState } from "react";
import * as colors from "./styles/colors";
import { Route, Link, Switch } from "react-router-dom";
import { CenterContent } from "utils/main";
import { Input, Button, Badge, FormErrorIcon } from "@chakra-ui/react";
import { useAuth } from "services/auth";
import { PRIMARY_BLUE } from "styles/colors";
import { validateEmail } from "utils/main"
import * as _ from "lodash";
import { ErrorMessage } from "styles/style";
import { Spinner } from "@chakra-ui/react"

function ShowError({ error }) {
  return error ? <ErrorMessage colorScheme="red">{error}</ErrorMessage> : null
}

function Login() {
  const { login } = useAuth();
  const [error, setError] = useState({})

  function textChange() {
    setError({})
  }

  function onLogin(e) {
    e.preventDefault();
    const { email, password } = e.target;
    const error = {}

    if (!email?.value)
      error.email = "Empty email field";
    else if (!validateEmail(email.value))
      error.email = "Invalid email field";

    if (!password?.value)
      error.password = "Empty password field";

    if (!_.isEmpty(error)) {
      setError(error)
      return
    }

    login.mutate({ email: email.value, password: password.value });
  }

  return (
    <div style={{ backgroundColor: PRIMARY_BLUE }}>
      <CenterContent>
        <div className="text-2xl text-white text-center mb-10">Welcome Back!</div>
        <form
          className="rounded-2xl p-14 mb-4"
          css={{
            width: "500px",
            backgroundColor: "white",
          }}
          onSubmit={onLogin}
        >
          {login.isError && <ShowError error="Invalid email/password combination" />}
          <Input id="email" type="text" placeholder="Email address" className="p-6" onChange={textChange} />
          <ShowError error={error.email} />
          <Input id="password" type="password" placeholder="Password" className="mt-4 p-6" onChange={textChange} />
          <ShowError error={error.password} />
          <Button type="submit" className="mt-4 p-6 text-white	font-normal	 text-lg"
            disabled={login.isLoading}
            isFullWidth={true} style={{ backgroundColor: PRIMARY_BLUE }}>
            {login.isLoading ? <Spinner /> : 'Login'}
          </Button>
        </form>
        <div className="flex">
          <Link to="/reigster" className="text-white flex-grow">Forgot your password?</Link>
          <Link to="/register" className="text-white">Don't have an account? Get Started</Link>
        </div>
      </CenterContent>
    </div>
  );
}

function Register() {
  const { register } = useAuth();
  const [error, setError] = useState({})

  function textChange() {
    setError({})
  }

  function onRegister(e) {
    e.preventDefault();
    const { email, name, password } = e.target;
    const error = {}
    if (!email?.value)
      error.email = "Empty email field";
    else if (!validateEmail(email.value))
      error.email = "Invalid email field";

    if (!password?.value)
      error.password = "Empty password field";
    else if (password.value.length < 3)
      error.password = "Password field length should be at least 3";

    if (!password?.value)
      error.name = "Empty Name field";

    if (!_.isEmpty(error)) {
      setError(error)
      return
    }

    register.mutate({ name: name.value.toLowerCase(), email: email.value, password: password.value })
  }

  return (
    <div style={{ backgroundColor: PRIMARY_BLUE }}>
      <CenterContent>
        <div className="text-2xl text-white text-center mb-10">Welcome Back!</div>
        <form
          className="rounded-2xl p-14 mb-4"
          css={{
            width: "500px",
            backgroundColor: "white",
          }}
          onSubmit={onRegister}
        >
          <ShowError error={error.register_error} />
          <Input id="name" type="text" placeholder="Full Name" className="p-6" onChange={textChange} />
          <ShowError error={error.name} />
          <Input id="email" type="text" placeholder="Email address" className="p-6 mt-4" onChange={textChange} />
          <ShowError error={error.email} />
          <Input id="password" type="password" placeholder="Password" className="mt-4 p-6" onChange={textChange} />
          <ShowError error={error.password} />
          <Button type="submit" className="mt-4 p-6 text-white font-normal	text-lg" 
            isFullWidth={true} style={{ backgroundColor: PRIMARY_BLUE }}
            disabled={register.isLoading}>
            {register.isLoading ? <Spinner /> : 'Register'}
          </Button>
        </form>
        <div className="flex">
          <Link to="/reigster" className="text-white flex-grow">Forgot your password?</Link>
          <Link to="/login" className="text-white">Back to Login</Link>
        </div>
      </CenterContent>
    </div>
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

import React from "react";
import UserProfile from "screens/UserProfile";
import { Switch, Route } from "react-router-dom";
import { ChatHome } from "screens/ChatHome";

function AuthenticatedApp() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/user">
          <UserProfile />
        </Route>
        <Route path="/">
          <ChatHome />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

AuthenticatedApp.propTypes = {};

export default AuthenticatedApp;

import React from "react";
import AuthenticatedApp from "./autheticated-app";
import UnauthenticatedApp from "./unautheticated-app";
import Header from "components/header";
import { useAuth } from "services/auth";

function App() {
  const { user } = useAuth();

  return (
    <div className="App flex flex-col">
      <Header />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

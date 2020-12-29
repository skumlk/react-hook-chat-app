import React from "react";
import AuthenticatedApp from "./autheticated-app";
import UnauthenticatedApp from "./unautheticated-app";
import { useFirebaseAuth } from "context/firebase/auth-context";
import Header from "components/header";

function App() {
  const { user } = useFirebaseAuth();

  return (
    <div className="App flex flex-col">
      <Header />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;

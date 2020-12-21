import React from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticatedApp from "./autheticated-app";
import UnauthenticatedApp from "./unautheticated-app";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyByImdCacT3lzK-kC9zsz2E3mf9QGohlxs",
  authDomain: "react-hooks-chat-7a0e8.firebaseapp.com",
  databaseURL: "https://react-hooks-chat-7a0e8.firebaseio.com",
  projectId: "react-hooks-chat-7a0e8",
  storageBucket: "react-hooks-chat-7a0e8.appspot.com",
  messagingSenderId: "12012459919",
  appId: "1:12012459919:web:eb65bb83ccaaf8f25a9dfa",
  measurementId: "G-9Y26C3RPXD",
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  return (
    <BrowserRouter>
      <div className="App">
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
    </BrowserRouter>
  );
}

export default App;

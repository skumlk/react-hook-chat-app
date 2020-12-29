import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./styles/tailwind.output.css";
import { FirebaseAuthProvider } from "context/firebase/auth-context";
import { FirebaseProvider } from "context/firebase/firebase-context";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "context/firebase/user-context";
import { ChatProvider } from "context/firebase/chat-context";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <FirebaseProvider>
        <FirebaseAuthProvider>
          <UserProvider>
            <ChatProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ChatProvider>
          </UserProvider>
        </FirebaseAuthProvider>
      </FirebaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

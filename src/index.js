import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./styles/tailwind.output.css";
import { FirebaseProvider } from "context/firebase/firebase-context";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import WebFont from 'webfontloader';
import { extendTheme } from "@chakra-ui/react"
import firebaseConfig from "config/firebase";

const theme = extendTheme({
  colors: {
    global: {
      body: {
        bg: "gray.400",
        color: "white",
      }
    }
  },
})

const queryClient = new QueryClient();

WebFont.load({
  google: {
    families: ['Open Sans:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <FirebaseProvider configuration={firebaseConfig}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </QueryClientProvider>
      </FirebaseProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

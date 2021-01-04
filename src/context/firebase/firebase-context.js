import firebase from "firebase";
import React, { createContext, useContext } from "react";
const FirebaseContext = createContext(null);

function useFirebase() {
  const firebase = useContext(FirebaseContext);
  if (firebase === null) throw new Error("Not enclosed in FirebaseProvider");
  return firebase;
}

function FirebaseProvider({ configuration, children }) {
  //check if already initialized
  if (firebase.apps.length === 0) firebase.initializeApp(configuration);
  let firebaseApp = {
    app: firebase.app,
    database: firebase.database,
    auth: firebase.auth,
    firestore: firebase.firestore(),
  };

  return (
    <FirebaseContext.Provider value={firebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
}

export { FirebaseContext, FirebaseProvider, useFirebase };

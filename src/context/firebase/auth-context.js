import React, { useRef } from "react";
const { useState, useEffect, useContext } = require("react");
const { useFirebase } = require("./firebase-context");

const FirebaseAuthContext = React.createContext();

function useFirebaseAuth() {
  const value = useContext(FirebaseAuthContext);
  if (value === null) throw new Error("Not enclosed in FirebaseAuthProvider");
  return value;
}

function FirebaseAuthProvider({ children }) {
  const auth = useAuth();
  return (
    <FirebaseAuthContext.Provider value={auth}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

function useAuth() {
  const [user, setUser] = useState(null);
  const { auth, firestore: db } = useFirebase();
  const isPendingUserRegister = useRef(false);

  const login = (email, password) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const register = (name, email, password) => {
    let user = null;
    isPendingUserRegister.current = true;
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        user = response.user;
        return user.updateProfile({ displayName: name });
      })
      .then(() => {
        return db.collection("users").doc(user.uid).set({
          name,
          email,
        });
      })
      .then(() => {
        setUser(user);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        isPendingUserRegister.current = false;
      });
  };

  const logout = () => {
    return auth()
      .signOut()
      .then(() => setUser(null));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (isPendingUserRegister.current === true) return;
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, []);

  return { user, register, login, logout };
}

export { FirebaseAuthProvider, useFirebaseAuth };

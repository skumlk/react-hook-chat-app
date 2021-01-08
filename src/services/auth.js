import { useRef } from "react";
import { useFirebase } from "context/firebase/firebase-context";
import { useMutation } from "react-query";
const { useState, useEffect } = require("react");

function useAuth() {
  const [user, setUser] = useState(null);
  const { auth, firestore: db } = useFirebase();
  const isPendingUserRegister = useRef(false);

  const login = useMutation(({ email, password }) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  });

  const register = useMutation(({ name, email, password }) => {
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
  });

  const logout = () => {
    return auth()
      .signOut()
      .then(() => setUser(null));
  };

  const updateProfile = useMutation((({ name, email }) => {
    return user.updateProfile({ displayName: name, email })
  }))

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (isPendingUserRegister.current === true) return;
      if (user) setUser(user);
      else setUser(null);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, register, login, logout, updateProfile };
}

export { useAuth };

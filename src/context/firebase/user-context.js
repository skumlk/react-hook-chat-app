import React, { createContext, useCallback, useContext, useState } from "react";
import { getSuccessorQueryToSearch } from "utils/main";
import { useFirebase } from "./firebase-context";
import firebase from "firebase";

const UserContext = createContext(null);

function useUserApi() {
  const value = useContext(UserContext);
  if (value === null) throw new Error("Not enclosed in UserProvider");
  return value;
}

function UserProvider({ children }) {
  const value = _useUserApi();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function _useUserApi() {
  const { firestore: db } = useFirebase();
  const [, setUserCache] = useState({});
  const getUsersByName = (name) => {
    var toName = getSuccessorQueryToSearch(name);
    return db
      .collection("users")
      .where("name", ">=", name)
      .where("name", "<", toName)
      .get();
  };

  const fetchUsersByIds = useCallback(() => async (id_list) => {
    if (!id_list || id_list.length === 0) return Promise.resolve();

    const users = await db
      .collection("users")
      .where(firebase.firestore.FieldPath.documentId(), "in", id_list)
      .get();

    const tmpUserCache = {};
    users.forEach((user) => {
      tmpUserCache[user.id] = user.data();
    });
    setUserCache((userCache) => ({ ...userCache, ...tmpUserCache }));
  }, [db]);

  const getUserById = async (id) => {
    const user = await db.collection("users").doc(id).get();
    return user.data();
  };

  return { getUsersByName, fetchUsersByIds, getUserById };
}

export { UserProvider, useUserApi };

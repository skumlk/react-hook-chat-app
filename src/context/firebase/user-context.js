import React, { createContext, useContext, useMemo, useState } from "react";
import { getSuccessorQueryToSearch } from "utils/main";
import { useFirebase } from "./firebase-context";
import firebase from "firebase";

const UserContext = createContext(null);

function useUser() {
  const value = useContext(UserContext);
  if (value === null) throw new Error("Not enclosed in UserProvider");
  return value;
}

function UserProvider({ children }) {
  const value = useUserApi();
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserApi() {
  const { firestore: db } = useFirebase();
  const [userCache, setUserCache] = useState({});
  const getUsersByName = (name) => {
    var toName = getSuccessorQueryToSearch(name);
    return db
      .collection("users")
      .where("name", ">=", name)
      .where("name", "<", toName)
      .get();
  };

  const fetchUsersByIds = async (id_list) => {
    console.log("Fetching all users");
    const users = await db
      .collection("users")
      .where(firebase.firestore.FieldPath.documentId(), "in", id_list)
      .get();

    const tmpUserCache = {};
    users.forEach((user) => {
      tmpUserCache[user.id] = user.data();
    });
    setUserCache((userCache) => ({ ...userCache, ...tmpUserCache }));
  };

  const getUserById = async (id) => {
    console.log("fetching user: ", id);
    const user = await db.collection("users").doc(id).get();
    return user.data()
  };

  return { getUsersByName, fetchUsersByIds, getUserById };
}

export { UserProvider, useUser };

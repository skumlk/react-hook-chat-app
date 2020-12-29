import React, { createContext, useContext } from "react";
import { getSuccessorQueryToSearch } from "utils/main";
import { useFirebase } from "./firebase-context";

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
  const getUsersByName = (name) => {
    var toName = getSuccessorQueryToSearch(name)
    return (
      db
        .collection("users")
        .where("name", ">=", name)
        .where("name", "<", toName)
        .get()
    );
  };
  return { getUsersByName };
}

export { UserProvider, useUser };

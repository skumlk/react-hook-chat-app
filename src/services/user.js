import { useCallback, useState } from "react";
import { getSuccessorQueryToSearch } from "utils/main";
import { useFirebase } from "../context/firebase/firebase-context";
import firebase from "firebase";


function useUserApi() {
  const { firestore: db } = useFirebase();
  const [, setUserCache] = useState({});

  const getUsersByName = useCallback((name) => {
    var toName = getSuccessorQueryToSearch(name);
    return db
      .collection("users")
      .where("name", ">=", name)
      .where("name", "<", toName)
      .get();
  }, [db]);

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
    if (!id) return Promise.resolve()
    const user = await db.collection("users").doc(id).get();
    return user.data();
  };

  return { getUsersByName, fetchUsersByIds, getUserById };
}

export { useUserApi };

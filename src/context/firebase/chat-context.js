import React, { useContext, useEffect, useState } from "react";
import { useFirebaseAuth } from "./auth-context";
import { useUserApi } from "./user-context";
import { useFirebase } from "./firebase-context";
import firebase from "firebase";
import { useQuery } from "react-query";
const { createContext } = require("react");

const ChatContext = createContext();

function useChat() {
  const value = useContext(ChatContext);
  if (value === null) throw new Error("Out of chat context");
  return value;
}



function ChatProvider({ children }) {
  const { user } = useFirebaseAuth();
  const { fetchUsersByIds } = useUserApi();
  const { firestore: db, admin } = useFirebase();
  const chatapi = getChatApi(user, db, admin, fetchUsersByIds);
  return (
    <ChatContext.Provider value={chatapi}>{children}</ChatContext.Provider>
  );
}

function getChatApi(user, db, admin, fetchUsersByIds) {
  function addToChatHistory(user1, user2, message) {
    const batch = db.batch();
    batch.set(
      db.collection("chat_history").doc(user1).collection("chats").doc(user2),
      {
        updated: firebase.firestore.FieldValue.serverTimestamp(),
        message,
        user: user2,
      },
      { merge: true }
    );
    batch.set(
      db.collection("chat_history").doc(user2).collection("chats").doc(user1),
      {
        updated: firebase.firestore.FieldValue.serverTimestamp(),
        message,
        user: user1,
      },
      { merge: true }
    );

    return batch.commit();
  }

  const subscribeChat = (user1, callback) => {
    if (!user1) return Promise.resolve();
    let user2 = user.uid;
    if (user2 < user1) [user1, user2] = [user2, user1];

    return db
      .collection("chats")
      .doc(user1 + "#" + user2)
      .collection("messages")
      .orderBy("created")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach(callback);
      });
  };

  const subscribeToChatHisory = (callback) => {
    return db
      .collection("chat_history")
      .doc(user.uid)
      .collection("chats")
      .orderBy("updated")
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach(callback);
      });
  };

  const getChatHistory = async () => {
    const user_list = new Set();
    const chat_history = await db
      .collection("chat_history")
      .doc(user.uid)
      .collection("chats")
      .get();
    chat_history.forEach((doc) => {
      user_list.add(doc.data().user);
    });

    fetchUsersByIds([...user_list]);
  };

  const unsubscribeChat = (unsub) => {
    if (typeof unsub === "function") unsub();
  };

  const sendMessage = (user1, message) => {
    if (!user1) return Promise.resolve();
    let user2 = user.uid;
    if (user2 < user1) [user1, user2] = [user2, user1];

    addToChatHistory(user1, user2, message);

    return db
      .collection("chats")
      .doc(user1 + "#" + user2)
      .collection("messages")
      .add({
        message,
        user: user.uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return {
    subscribeChat,
    unsubscribeChat,
    sendMessage,
    subscribeToChatHisory,
    getChatHistory,
  };
}

export { ChatProvider, useChat };

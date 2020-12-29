import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Input,
  ListItem,
  OrderedList,
  Textarea,
} from "@chakra-ui/react";
import { useUser } from "context/firebase/user-context";
import { useChat } from "context/firebase/chat-context";

function UserSearch({ onUserChange }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const { getUsersByName } = useUser();

  function onUserClick(id) {
    setQuery("");
    onUserChange(id);
  }

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }
    getUsersByName(query).then((result) => {
      const users = [];
      if (!result.empty)
        result.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
      setUsers(users);
    });
  }, [query]);

  return (
    <div>
      <Input
        placeholder="Search By Name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <OrderedList>
        {users.length === 0 && query && (
          <ListItem>No users for {query}</ListItem>
        )}
        {users &&
          users.map((item) => (
            <ListItem key={item.id} onClick={() => onUserClick(item.id)}>
              {item.name}
            </ListItem>
          ))}
      </OrderedList>
    </div>
  );
}

function AuthenticatedApp() {
  const [user, setUser] = useState();
  const {
    sendMessage,
    subscribeChat,
    unsubscribeChat,
    subscribeToChatHisory,
    getAllChats,
  } = useChat();
  const [message, setMessage] = useState();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToChatHisory(function (change) {
      if (change.type === "added") {
        const newDoc = change.doc.data();
        setChatList((data) => [...data, newDoc]);
        console.log(newDoc);
      }

      if (change.type === "modified") {
        const newDoc = change.doc.data();
        console.log("modified chat history", newDoc);
        setChatList((chatList) => {
          const list = chatList.filter(x => x.user !== newDoc.user)
          list.unshift(newDoc)
          return list
        });
      }
    });

    // return () => unsubscribe();
  }, []);

  useEffect(() => {
    setChatMessages([]);
    const unsub = subscribeChat(user, function (change) {
      if (change.type === "added") {
        const newDoc = change.doc.data();
        setChatMessages((data) => [...data, newDoc]);
      }

      if (change.type === "modified") {
        const newDoc = change.doc.data();
        // setChatMessages((data) => [...data, newDoc]);
      }
    });
    return () => unsubscribeChat(unsub);
  }, [user]);

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(user, message);
      setMessage("");
    }
  }

  function onMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <React.Fragment>
      <Button>Start Chat</Button>
      <div className="flex flex-row min-h-full min-w-full">
        <div className="max-w-7xl p-3 border-r-2 min-h-full bg-gray-100	">
          <UserSearch onUserChange={setUser} />
          {chatList.length === 0 && <div className="mt-2">No chats</div>}
          <ul>
            {chatList.map((chat) => (
              <li onClick={() => setUser(chat.user)}>
                {chat.user}, {chat.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-3 bg-gray-50 flex-grow">
          <div>
            {chatMessages.length === 0 && (
              <div className="text-2xl my-auto min-h-full">
                Select a chat to start a conversation
              </div>
            )}
            {chatMessages.map((x) => (
              <div>
                {x.message} {x.user}
              </div>
            ))}
          </div>
          <div>
            <Textarea
              placeholder="Enter message to send"
              value={message}
              onKeyDown={onKeyDown}
              onChange={onMessageChange}
              disabled={!user}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

AuthenticatedApp.propTypes = {};

export default AuthenticatedApp;

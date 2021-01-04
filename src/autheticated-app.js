import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@chakra-ui/react";
import { useChat } from "context/firebase/chat-context";
import UserSearch from "components/UserSearch";
import UserProfile from "screens/UserProfile";
import { Switch, Route } from "react-router-dom";
import TimeAgo from "timeago-react";
import { useFirebaseAuth } from "context/firebase/auth-context";
import { UserThumb } from "components/UserThumb";
import useUser from "hooks/useUser";
import { ChatBubble } from "styles/style";

function ChatHistoryItem({ chat, onSelect }) {
  const { user, isLoading } = useUser(chat.user);
  return (
    <li onClick={() => onSelect(chat.user)} className="flex">
      <UserThumb user_id={chat.user} />
      <div className="flex flex-col flex-grow">
        <div className="font-bold">{!isLoading && user.name}</div>
        <div className="text-gray-800">{chat.message}</div>
      </div>
      <div className="text-xs text-gray-600">
        {chat.updated ? (
          <TimeAgo datetime={new Date(chat.updated.seconds * 1000)} />
        ) : (
            "Just Now"
          )}
      </div>
    </li>
  );
}

function ChatHistory({ setUser }) {
  const [chatList, setChatList] = useState([]);
  const { subscribeToChatHisory, getChatHistory } = useChat();

  useEffect(() => {
    let unsubscribe = null;
    getChatHistory().then(() => {
      const unsubscribe = subscribeToChatHisory(function (change) {
        if (change.type === "added") {
          const newDoc = change.doc.data();
          setChatList((data) => [...data, newDoc]);
        }

        if (change.type === "modified") {
          const newDoc = change.doc.data();
          setChatList((chatList) => {
            const list = chatList.filter((x) => x.user !== newDoc.user);
            list.unshift(newDoc);
            return list;
          });
        }
      });
    });

    return () => { if (unsubscribe !== null) unsubscribe(); }
  }, [subscribeToChatHisory, getChatHistory]);

  return (
    <div className="p-4">
      {chatList.length === 0 && <div className="mt-2">No chats</div>}
      <ul>
        {chatList.map((chat) => (
          <ChatHistoryItem key={chat.user} chat={chat} onSelect={setUser} />
        ))}
      </ul>
    </div>
  );
}

function ChatMessage({ message, isReply }) {
  return (
    <div className="flex">
      {isReply && <div className="flex-grow"></div>}
      {!isReply && (
        <div>
          <UserThumb user_id={message.user} />
        </div>
      )}
      <div>
        <ChatBubble isReply={isReply}>
          {message.message} {isReply ? "Yes" : "no"}
        </ChatBubble>
        {/* {!isLoading && user.name} */}
        <div
          className={
            isReply
              ? "text-xs text-gray-600 text-right"
              : "text-xs text-gray-600"
          }
        >
          {message.created ? (
            <TimeAgo datetime={new Date(message.created.seconds * 1000)} />
          ) : (
              "Just Now"
            )}
        </div>
      </div>
      {!isReply && <div className="flex-grow"></div>}
    </div>
  );
}

function ChatMessages({ user: user_id }) {
  const { subscribeChat, unsubscribeChat } = useChat();
  const [chatMessages, setChatMessages] = useState([]);
  const { user: authUser } = useFirebaseAuth();
  const { user, isLoading } = useUser(user_id);

  useEffect(() => {
    const unsub = subscribeChat(user_id, function (change) {
      if (change.type === "added") {
        const newDoc = change.doc.data();
        const key = change.doc.id;
        setChatMessages((data) => [...data, { key, ...newDoc }]);
      }

      if (change.type === "modified") {
        const newDoc = change.doc.data();
        const key = change.doc.id;
        setChatMessages((messages) => {
          const index = messages.findIndex((x) => x.key === key);
          const new_message = { ...messages[index], created: newDoc.created };
          messages[index] = new_message;
          return [...messages];
        });
      }
    });
    return () => {
      setChatMessages([]);
      unsubscribeChat(unsub);
    };
  }, [user_id, subscribeChat, unsubscribeChat]);

  if (chatMessages.length === 0)
    return (
      <div className="text-2xl my-auto h-full ">
        <h3>Select a chat to start a conversation</h3>
      </div>
    );

  return (
    <React.Fragment>
      <div className="p-2 mb-2 border-b-2">
        {!isLoading && <h2 className="font-bold text-xl">{user?.name}</h2>}
      </div>
      {chatMessages.map((message) => (
        <ChatMessage
          key={message.key}
          message={message}
          isReply={authUser.uid === message.user}
        />
      ))}
    </React.Fragment>
  );
}

function ChatInput({ onNewMessage, disabled }) {
  const [message, setMessage] = useState();

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setMessage("");
      onNewMessage(message);
    }
  }

  function onMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="bg-white">
      <Textarea
        placeholder="Type your message..."
        value={message}
        onKeyDown={onKeyDown}
        onChange={onMessageChange}
        disabled={disabled}
        border="0px"
        borderRadius="0"
        style={{ height: '2rem' }}
      />
    </div>
  );
}

function ChatHome() {
  const [user, setUser] = useState();
  const { sendMessage } = useChat();

  function sendNewMessage(message) {
    sendMessage(user, message);
  }

  return (
    <React.Fragment>
      <div className="flex flex-row flex-grow bg-gray-200 p-4 max-h-full">
        <div className="w-80 p-3 border-r-2 bg-white mr-2">
          <UserSearch onUserChange={setUser} />
          <div className="flex border-b-2 pb-2 items-center p-4">
            <div className="flex-grow">Chat</div>
            <Button>New</Button>
          </div>
          <ChatHistory setUser={setUser} />
        </div>
        <div className="p-3 bg-gray-100 flex-grow flex flex-col ">
          <div className="flex-grow overflow-y-scroll p-5">
            <ChatMessages user={user} />
          </div>
          <ChatInput onNewMessage={sendNewMessage} disabled={!user} />
        </div>
      </div>
    </React.Fragment>
  );
}

function AuthenticatedApp() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/user">
          <UserProfile />
        </Route>
        <Route path="/">
          <ChatHome />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

AuthenticatedApp.propTypes = {};

export default AuthenticatedApp;

import { UserThumb } from "components/User/UserThumb";
import useUser from "hooks/useUser";
import React, { useEffect, useRef } from "react"
import { useAuth } from "services/auth";
import {  useChatHook } from "services/chat";
import { ChatBubble } from "styles/style";
import TimeAgo from "timeago-react";

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
                <ChatBubble isReply={isReply} className="whitespace-pre-line">
                    {message.message}
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
    const { user: authUser } = useAuth();
    const { user, isLoading } = useUser(user_id);
    const { data: chatMessages } = useChatHook(authUser?.uid, user_id)
    const chatMessagesEndRef = useRef()

    useEffect(() => {
        if (chatMessagesEndRef.current)
            chatMessagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }, [chatMessages]);

    if (chatMessages.length === 0)
        return (
            <div className="text-2xl my-auto h-full ">
                <h4>Select a chat to start a conversation</h4>
            </div>
        );

    return (
        <React.Fragment>
            <div className="p-2 mb-2 border-b-2">
                {!isLoading && <h2 className="font-bold text-xl">{user?.name}</h2>}
            </div>
            <div className="flex-grow overflow-y-scroll p-5">
                {chatMessages.map((message) => (
                    <ChatMessage
                        key={message.key}
                        message={message}
                        isReply={authUser.uid === message.user}
                    />
                ))}
                <div ref={chatMessagesEndRef}></div> {/* To scroll messages */}
            </div>
        </React.Fragment>
    );
}

export { ChatMessages }
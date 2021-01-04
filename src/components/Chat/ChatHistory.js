import React from "react"
import useUser from "hooks/useUser";
import TimeAgo from "timeago-react";
import { UserThumb } from "components/UserThumb";
import { useAuth } from "services/auth";
import { useChatHistory } from "services/chat";
import { Dot } from "../../styles/style"

function ChatHistoryItem({ chat, onSelect }) {
    const { user, isLoading } = useUser(chat.user);
    return (
        <li onClick={() => onSelect(chat.user)} className="flex my-2">
            <div className="flex justify-center	items-center"><UserThumb user_id={chat.user} /></div>
            <div className="flex flex-col flex-grow">
                <div className="font-bold">{!isLoading && user.name}</div>
                <div className="text-gray-800">{chat.message}</div>
            </div>
            <div className="flex flex-col">
                <div className="flex-grow text-right">
                    <Dot></Dot>
                </div>
                <div className="text-xs text-gray-600">
                    {chat.updated ? (
                        <TimeAgo datetime={new Date(chat.updated.seconds * 1000)} />
                    ) : (
                            "Just Now"
                        )}
                </div>
            </div>
        </li>
    );
}

function ChatHistory({ setUser }) {
    const { user: authUser } = useAuth();
    const { data: chatList } = useChatHistory(authUser?.uid)

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

export { ChatHistory }
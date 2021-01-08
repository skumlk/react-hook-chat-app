import React from "react"
import useUser from "hooks/useUser";
import TimeAgo from "timeago-react";
import { UserThumb } from "components/User/UserThumb";
import { useAuth } from "services/auth";
import { useChatHistory } from "services/chat";
import { ChatItemli, Dot } from "styles/style"

function ChatHistoryItem({ chat, onSelect, isSelected }) {
    const { user, isLoading } = useUser(chat.user);
    return (
        <ChatItemli onClick={() => onSelect(chat.user)} className="flex my-2 p-2" isSelected={isSelected} >
            <div className="flex justify-center	items-center mr-2"><UserThumb user_id={chat.user} /></div>
            <div className="flex flex-col flex-grow overflow-hidden">
                <div className="font-bold capitalize text-sm flex-grow">{!isLoading && user.name}</div>
                <div className="text-gray-600 overflow-ellipsis overflow-hidden whitespace-nowrap text-xs">{chat.message}</div>
            </div>
            <div className="flex flex-col pl-2">
                <div className="flex-grow text-right">
                    <Dot></Dot>
                </div>
                <div className="text-xs text-gray-600 whitespace-nowrap">
                    {chat.updated ? (
                        <TimeAgo datetime={new Date(chat.updated.seconds * 1000)} />
                    ) : (
                            "Just Now"
                        )}
                </div>
            </div>
        </ChatItemli>
    );
}

function ChatHistory({user: selectedUser, setUser }) {
    const { user: authUser } = useAuth();
    const { data: chatList } = useChatHistory(authUser?.uid)

    return (
        <div className="p-2">
            {chatList.length === 0 && <div className="mt-2">No chats</div>}
            <ul>
                {chatList.map((chat) => (
                    <ChatHistoryItem key={chat.user} chat={chat} onSelect={setUser} isSelected={selectedUser === chat.user}/>
                ))}
            </ul>
        </div>
    );
}

export { ChatHistory }
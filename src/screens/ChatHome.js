import React, { useState } from "react"
import { Button } from "@chakra-ui/react";
import UserSearch from "components/User/UserSearch";
import { ChatHistory } from "components/Chat/ChatHistory";
import { ChatMessages } from "components/Chat/ChatMessages";
import { useAuth } from "services/auth";
import { useChatApi } from "services/chat";
import { ChatInput } from "components/Chat/ChatInput";

function ChatHome() {
    const [user, setUser] = useState();
    const { user: authUser } = useAuth();
    const { sendChatMessage } = useChatApi()

    function sendNewMessage(message) {
        sendChatMessage(authUser.uid, user, message);
    }
    return (
        <React.Fragment>
            <div className="flex flex-row flex-grow bg-gray-200 p-4 max-h-full min-h-0">
                <div className="w-80 p-3 border-r-2 bg-white mr-2">
                    <UserSearch onUserChange={setUser} />
                    <div className="flex border-b-2 pb-2 items-center p-4">
                        <div className="flex-grow">Chat</div>
                        <Button>New</Button>
                    </div>
                    <ChatHistory setUser={setUser} user={user}/>
                </div>
                <div className="p-3 bg-gray-100 flex-grow flex flex-col">
                    <ChatMessages user={user} />
                    <ChatInput onNewMessage={sendNewMessage} disabled={!user} />        </div>
            </div>
        </React.Fragment>
    );
}

export { ChatHome }

import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";

function ChatInput({ onNewMessage, disabled }) {
    const [message, setMessage] = useState("");

    function onKeyDown(e) {
        if(e.key === "Enter" && e.ctrlKey)
            setMessage(message => message + "\n")
        else if (e.key === "Enter" && !e.ctrlKey && message && message.trim().length > 0) {
            e.preventDefault();
            onNewMessage(message.trim());
            setMessage("");
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

export { ChatInput }
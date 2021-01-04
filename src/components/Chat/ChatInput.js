
import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";

function ChatInput({ onNewMessage, disabled }) {
    const [message, setMessage] = useState("");

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

export { ChatInput }
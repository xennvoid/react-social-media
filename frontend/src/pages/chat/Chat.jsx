import React, { useState } from "react";
import styles from "./chat.module.scss";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        setMessages([...messages, { sender: "Me", text: inputValue }]);
        setInputValue("");
    };

    return (
        <div className={styles["chat-container"]}>
            <div className={styles["chat-header"]}>Messages</div>
            <div className={styles["chat-messages"]}>
                {messages.map((message, index) => (
                    <div key={index} className={styles["chat-message"]}>
                        <div className={styles["message-sender"]}>{message.sender}</div>
                        <div className={styles["message-text"]}>
                            {message.text}
                            {message.typing && (
                                <span className={styles["typing-animation"]}>_</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles["chat-input"]}>
                <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
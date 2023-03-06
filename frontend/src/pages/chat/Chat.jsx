import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./chat.module.scss"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"
import { AuthContext } from '../../context/authContext'
import ProfileLink from "../../components/profileLink/ProfileLink"
import moment from 'moment'
import { sendRequest } from "../../requestPattern"

const Chat = () => {

    const { currentUser } = useContext(AuthContext)

    const { id } = useParams()

    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState("")

    const scrollRef = useRef()
    const messagesLength = useRef(0)
    const refresh = useRef(false)

    const socket = io.connect('http://localhost:5151')

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== "") {
            socket.emit('message', {
                userId: currentUser.id,
                name: currentUser.name,
                profileImage: currentUser.profileImage,
                text: inputValue,
                chatId: id,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            })
            setInputValue("")
        }
    };

    /* if 0 messages delete chat */
    const cleanUp = async () => {
        if (messagesLength?.current == 0 && !refresh.current)
            await sendRequest.delete(`/chats/${id}`)
    }

    const refreshed = () => {
        refresh.current = true
    }

    useEffect(() => {
        socket.emit('join-room', id)
        sendRequest(`/chats/${id}/messages`).then(res => setMessages(res.data))
        window.addEventListener("beforeunload", refreshed)
        return () => {
            window.removeEventListener("beforeunload", refreshed);
            cleanUp()
        }
    }, [])

    useEffect(() => {
        socket.on('receive-message', (data) => setMessages(messages => [...messages, data]))
        scrollRef.current.scrollIntoView()
    }, [socket, messages])

    useEffect(() => {
        messagesLength.current = messages?.length
    }, [messages])

    return (
        <div className={styles["chat-container"]}>
            <div className={styles["chat-header"]}>Messages</div>
            <div className={styles["chat-messages"]}>
                {messages && messages?.map((message, index) => (
                    <div
                        key={index}
                        className={styles["chat-message"]}
                        style={currentUser.id == message.userId ? { marginLeft: 'auto' } : null}
                    >
                        {currentUser.id == message.userId
                            ? <div className={styles["message-sender"]}>Me</div>
                            : <ProfileLink
                                to={`/profile/${message.userId}`}
                                name={message.name}
                                image={message.profileImage}
                            />
                        }
                        <div className={styles["message-text"]}>
                            {message.text}
                        </div>
                        <div className={styles["message-date"]}>
                            {moment(message.createdAt).format('lll')}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef}></div>
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
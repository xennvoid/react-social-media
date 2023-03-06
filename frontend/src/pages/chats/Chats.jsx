import React from 'react'
import styles from './chats.module.scss'
import ProfileLink from '../../components/profileLink/ProfileLink'
import { sendRequest } from '../../requestPattern'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

const Chats = () => {

    const { isLoading, error, data: chats } = useQuery(["chats"], () => sendRequest(`/chats`).then(res => res.data))

    if (isLoading)
        return null

    return (
        <div className={styles.chats}>
            {chats.map(interlocutor =>
                <div className={styles.chat} key={interlocutor.id}>
                    <ProfileLink
                        to={`/profile/${interlocutor.id}`}
                        name={interlocutor.name}
                        image={interlocutor.profileImage}
                        big
                    />
                    <Link to={`${interlocutor.chatId}`}>
                        Open chat
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Chats
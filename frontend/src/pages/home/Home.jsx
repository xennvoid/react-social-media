import React, { useContext, useEffect } from 'react'
import Posts from '../../components/posts/Posts'
import styles from './home.module.scss'
import { useQuery } from 'react-query'
import { AuthContext } from '../../context/authContext'
import { sendRequest } from '../../requestPattern'

const Home = () => {

    const { currentUser } = useContext(AuthContext)

    const {
        isLoading,
        error,
        data: posts,
    } = useQuery(["friends_posts"], () => sendRequest(`posts/friends/${currentUser.id}`).then(res => res.data))

    return (
        <div className={styles.container}>
            {error
                ? "Error"
                : isLoading
                    ? "Loading..."
                    : <Posts posts={posts} />
            }
        </div>
    )
}

export default Home
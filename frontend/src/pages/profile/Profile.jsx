import React, { useContext, useEffect } from 'react'
import Posts from '../../components/posts/Posts'
import styles from './profile.module.scss'
import userPng from '../../assets/icons/user.png'
import { Link, useParams } from 'react-router-dom'
import { sendRequest } from '../../requestPattern'
import { useQuery, useQueryClient } from 'react-query'
import { AuthContext } from '../../context/authContext'
import PostCreate from '../../components/postCreate/PostCreate'
import { useInView } from 'react-intersection-observer'
import usePosts from '../../hooks/usePosts'

const Profile = () => {

    const { ref, inView } = useInView()
    const { currentUser } = useContext(AuthContext)
    const { id: profileId } = useParams()

    const queryClient = useQueryClient()

    const {
        isLoading: userDataIsLoading,
        error: userDataError,
        data: userData,
    } = useQuery(["userData", profileId], () => sendRequest(`users/${profileId}`).then(res => res.data))

    const {
        isLoading: postsIsLoading,
        error: postsError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        data: posts,
    } = usePosts("posts", profileId, [profileId])

    const {
        isFetching: subscribedIsFetching,
        refetch: subscribedRefetch,
        data: subscribed,
    } = useQuery(["subscribed", profileId, currentUser], () => sendRequest(`subscriptions/${profileId}/subscribed`).then(res => res.data))

    const {
        data: subscriptions_count,
    } = useQuery(["subscriptions_count", profileId], () => sendRequest(`subscriptions/${profileId}/count/subscriptions`).then(res => res.data))

    const {
        data: subscribers_count,
    } = useQuery(["subscribers_count", profileId], () => sendRequest(`subscriptions/${profileId}/count/subscribers`).then(res => res.data))

    const postsData = posts?.pages[0] == null ? [] : posts?.pages?.map(page => page.posts).flat()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img
                    src={userData?.backgroundImage || "https://adoption.microsoft.com/files/microsoft-teams/custom-backgrounds-gallery/community/nature/community-nature-Teams-background-18.jpg"}
                    alt="user-background"
                    className={styles.background}
                />
                <div className={styles.info}>
                    <div className={styles.left}>
                        <div className={styles.image}>
                            <img src={userData?.profileImage || userPng} alt="" />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.name}>
                                {userData?.name}
                            </div>
                            <div className={styles.cutaway}>
                                @{userData?.login}
                            </div>
                            {currentUser.id == profileId
                                ?
                                <Link to={`/profile/${profileId}/update`} className={styles.settings}>
                                    Change profile
                                </Link>
                                : null
                            }
                        </div>
                        {profileId != currentUser.id &&
                            (subscribed && !subscribedIsFetching
                                ? <button
                                    className={styles.unsubscribe}
                                    onClick={async () => {
                                        await sendRequest.delete(`subscriptions/${profileId}`)
                                        queryClient.invalidateQueries(["subscribed"])
                                    }}>
                                    Unsubscribe
                                </button>
                                : <button
                                    className={styles.subscribe}
                                    onClick={async () => {
                                        await sendRequest.post(`subscriptions/${profileId}`)
                                        queryClient.invalidateQueries(["subscribed"])
                                    }}>
                                    Subscribe
                                </button>)
                        }
                    </div>
                    <div className={styles.right}>
                        <div className={styles.subscriptions}>
                            <Link to={`/profile/${profileId}/subscriptions`}>
                                Subscriptions: {subscriptions_count}
                            </Link>
                            <Link to={`/profile/${profileId}/subscribers`}>
                                Subscribers: {subscribers_count}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {currentUser.id == profileId ? <div className={styles.create_container}><PostCreate /></div> : null}
            {postsError
                ? null
                : postsIsLoading
                    ? "Loading"
                    : <>
                        <Posts posts={postsData} />
                        <div
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            style={{ display: !hasNextPage ? 'none' : 'block' }}
                            ref={ref}
                        >
                            ...
                        </div>
                    </>
            }
        </div>
    )
}

export default Profile
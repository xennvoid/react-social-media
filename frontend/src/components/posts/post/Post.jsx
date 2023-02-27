import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './post.module.scss'
import { BsThreeDots } from 'react-icons/bs'
import {
    AiFillLike,
    AiOutlineLike,
    AiOutlineComment,
    AiOutlineShareAlt
} from 'react-icons/ai'

import ProfileLink from '../../profileLink/ProfileLink'
import moment from 'moment'
import Comments from '../../comments/Comments'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { sendRequest } from '../../../requestPattern'
import { AuthContext } from '../../../context/authContext'

const Post = ({ post, commentsVisiblePost, setCommentsVisiblePost }) => {

    const { currentUser } = useContext(AuthContext)
    const ref = useRef(null)
    const [height, setHeight] = useState(0)
    const [enableDeleteButton, setEnableDeleteButton] = useState(false)
    const [currentComment, setCurrentComment] = useState('')

    const postCreationDate = moment(post.createdAt).fromNow()

    const {
        isLoading,
        error,
        data: commentsCount
    } = useQuery(["comments_count", post.id], () => sendRequest(`comments/post/${post.id}/count`).then(res => res.data))

    const {
        isLoading: likesCountIsLoading,
        error: likesCountError,
        data: likesCount,
    } = useQuery(["likesCount", post.id], () => sendRequest(`likes/post/${post.id}/count`).then(res => res.data))

    const {
        data: liked
    } = useQuery(["liked", post.id], () => sendRequest(`likes/post/${post.id}/liked`).then(res => res.data))

    const changeComment = (value) => {
        setCurrentComment(value)
    }

    const toggleComments = () => {
        commentsVisiblePost.id === post.id
            ? setCommentsVisiblePost(post => ({ ...post, opened: !post.opened }))
            : setCommentsVisiblePost({ id: post.id, opened: true })
    }


    /* Delete post */
    const queryClient = useQueryClient()

    const mutation = useMutation(() => sendRequest.delete(`/posts/${post.id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        },
    })

    const addLikeMutation = useMutation(() => sendRequest.post(`/likes/post/${post.id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries(["liked", post.id])
            queryClient.invalidateQueries(["likesCount", post.id])
        },
    })

    const removeLikeMutation = useMutation(() => sendRequest.delete(`/likes/post/${post.id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries(["liked", post.id])
            queryClient.invalidateQueries(["likesCount", post.id])
        }
    })

    const deletePost = async () => {
        try {
            mutation.mutate()
        } catch (err) {
            console.log(err)
        }
    }

    const addLike = async () => {
        addLikeMutation.mutate()
    }

    const removeLike = async () => {
        removeLikeMutation.mutate()
    }

    useEffect(() => {
        setHeight(ref.current?.offsetHeight);
    }, [ref.current]);

    return (
        <div className={styles.card} onClick={() => setEnableDeleteButton(false)}>
            <div className={styles.head}>
                <div className={styles.profile}>
                    <ProfileLink
                        to={`/profile/${post.userId}`}
                        name={post.userName}
                        image={post.profileImage}
                    />
                    <span className={styles.time}>{postCreationDate}</span>
                </div>
                {post.userId == currentUser.id &&
                    <div className={styles.settings} onClick={(e) => { e.stopPropagation(); setEnableDeleteButton(prevState => !prevState) }}>
                        <div
                            className={styles.delete}
                            style={enableDeleteButton ? { display: 'block' } : { display: 'none' }}
                            onClick={deletePost}
                        >
                            Delete
                        </div>
                        <BsThreeDots />
                    </div>
                }
            </div>
            <div className={styles.content}>
                {post.image
                    ?
                    <div className={styles.image + ((height * 3) > window.innerHeight ? " " + styles.justifyCenter : "")}>
                        <img src={"/files/" + post.image} alt="postImage" ref={ref} />
                    </div>
                    : null
                }
                <div className={styles.description}>
                    {post.description}
                </div>
            </div>
            <div className={styles.actions}>
                <div className={styles.action}>
                    {liked
                        ? <AiFillLike color='red' onClick={removeLike} />
                        : <AiOutlineLike onClick={addLike} />
                    }
                    <span>{likesCount} Likes</span>
                </div>
                <div className={styles.action}>
                    <AiOutlineComment
                        onClick={() => toggleComments()}
                    />
                    <span>{commentsCount == 1 ? commentsCount + " Comment" : commentsCount + " Comments"}</span>
                </div>
                <div className={styles.action}>
                    <AiOutlineShareAlt />
                    <span>Share</span>
                </div>
            </div>
            {
                (commentsVisiblePost.id == post.id && commentsVisiblePost.opened) &&
                <Comments post={post} currentComment={currentComment} changeComment={changeComment} setCurrentComment={setCurrentComment} />
            }
        </div>
    )
}

export default Post
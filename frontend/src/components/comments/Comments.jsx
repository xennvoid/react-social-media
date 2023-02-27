import React, { useContext } from 'react'
import styles from './comments.module.scss'
import ProfileLink from '../profileLink/ProfileLink'
import MyInput from '../UI/MyInput/MyInput'
import Comment from '../comment/Comment'
import { sendRequest } from '../../requestPattern'
import { useQuery } from 'react-query'
import { AuthContext } from '../../context/authContext'
import moment from 'moment'
import { useMutation, useQueryClient } from 'react-query'

const Comments = ({ post, currentComment, changeComment, setCurrentComment }) => {

    const { isLoading, error, data: comments } = useQuery(["comments"], () => sendRequest(`comments/post/${post.id}`).then(res => res.data))
    const { currentUser } = useContext(AuthContext)

    const queryClient = useQueryClient()

    const addComment = async () => {
        const url = `comments/post/${post.id}/comment/add`
        const data = {
            text: currentComment,
            postId: post.id,
            userId: currentUser.id,
            createdAt: moment(new Date()).format('YYYY-MM-DD HH:m:s')
        }
        const response = await sendRequest.post(url, data)
        setCurrentComment('')
    }

    // When this mutation succeeds, invalidate any queries with the `comments` query key
    const mutation = useMutation(addComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"])
            queryClient.invalidateQueries(["comments_count"])
        },
    })

    const handleAddComment = () => {
        if (currentComment !== "")
            mutation.mutate()
    }

    return (
        <div className={styles.comments}>
            <div className={styles.comment_write}>
                <ProfileLink
                    to={`/profile/${currentUser.id}`}
                    name={currentUser.name}
                    image={currentUser.profileImage}
                />
                <MyInput
                    placeholder="Your comment..."
                    inputValue={currentComment}
                    onChange={changeComment}
                    onClick={handleAddComment}
                />
            </div>
            {error
                ? "Loading data error"
                : isLoading
                    ? "Loading"
                    : comments && comments.map(comment =>
                        <Comment comment={comment} key={comment.id} />
                    )
            }
        </div>
    )
}

export default Comments
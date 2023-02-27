import React from 'react'
import styles from './comment.module.scss'
import ProfileLink from '../profileLink/ProfileLink'
import moment from 'moment'

const Comment = ({ comment }) => {

    const timeago = moment(comment.createdAt).fromNow();
    //console.log(comment)

    return (
        <div className={styles.comment} key={comment.id}>
            <div className={styles.comment_info}>
                <ProfileLink
                    to={`/profile/${comment.userId}`}
                    name={comment.name}
                    image={comment.profileImage}
                />
                <span className={styles.comment_time}>{timeago}</span>
            </div>
            <p>{comment.text}</p>
        </div>
    )
}

export default Comment
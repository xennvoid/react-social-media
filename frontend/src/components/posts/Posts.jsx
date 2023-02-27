import React, { useState } from 'react'
import Post from './post/Post'
import styles from './posts.module.css'

const Posts = ({ posts }) => {

    const [commentsVisiblePost, setCommentsVisiblePost] = useState({ id: null, opened: false })

    return (
        <div className={styles.container}>
            {posts && posts.map(post =>
                <Post
                    key={post.id}
                    post={post}
                    commentsVisiblePost={commentsVisiblePost}
                    setCommentsVisiblePost={setCommentsVisiblePost}
                />
            )}
        </div>
    )
}

export default Posts
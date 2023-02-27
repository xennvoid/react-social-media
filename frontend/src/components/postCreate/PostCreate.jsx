import React, { useContext, useState } from 'react'
import styles from './post-create.module.scss'
import { BsFillImageFill } from 'react-icons/bs'
import { MdOutlineDownloadDone } from 'react-icons/md'
import { AuthContext } from '../../context/authContext'
import { useMutation, useQueryClient } from 'react-query'
import { sendRequest } from '../../requestPattern'
import moment from 'moment'

const PostCreate = () => {

    const { currentUser } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [postText, setPostText] = useState("");

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            console.log(formData)
            const res = await sendRequest.post("/load", formData)
            return res.data;
        } catch (err) {
            console.log(err)
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return sendRequest.post("/posts/new", newPost);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleClick = async () => {
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({
            postText, image: imgUrl, createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
        setPostText("");
        setFile(null);
    };

    return (
        <div className={styles.container}>
            <textarea
                type="text"
                className={styles.input}
                placeholder="What's happening?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
            />
            <div className={styles.assets}>
                <label htmlFor="file" className={styles.label}>
                    <BsFillImageFill className={styles.image} />
                </label>
                {file && (
                    <div className={styles.attachments}>
                        <span>Attachments:</span>
                        <img className={styles.preview} alt="preview" src={URL.createObjectURL(file)} />
                    </div>
                )}
                <MdOutlineDownloadDone className={styles.download} onClick={handleClick} />
            </div>
            <input type="file" name="file" id="file" className={styles.file} onChange={(e) => setFile(e.target.files[0])} />
        </div>
    )
}

export default PostCreate
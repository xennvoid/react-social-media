const db = require('../config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

const getPostLikesCount = (req, res) => {

    const { postId } = req.params

    const query = `SELECT COUNT(*) FROM likes WHERE postId = ?`

    db.query(query, postId, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json(0)

        const commentsCount = result[0]['COUNT(*)']

        return res.status(200).json(commentsCount)
    })
}

const isPostLiked = (req, res) => {

    const { postId } = req.params

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const query = `SELECT * FROM likes WHERE postId = ? AND userId = ?`;

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return data?.length == 0 ? res.status(200).json(false) : res.status(200).json(true)
        })
    })
}

const addLike = (req, res) => {

    const { postId } = req.params

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const query = `INSERT INTO likes (postId, userId) VALUES (?)`;
        const values = [postId, userInfo.id]

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post was liked")
        })
    })
}

const removeLike = (req, res) => {

    const { postId } = req.params

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const query = `DELETE FROM likes WHERE postId = ? AND userId = ?`;

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post like was removed")
        })
    })
}

module.exports = { getPostLikesCount, isPostLiked, addLike, removeLike }
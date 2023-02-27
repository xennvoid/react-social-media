const db = require('../config/db')
require('dotenv').config({ path: './config.env' })
const jwt = require('jsonwebtoken')

const getAllUserPosts = (req, res) => {

    const { id } = req.params
    const { limit, offset } = req.query

    const query = `SELECT p.*, u.name as userName, u.profileImage FROM posts AS p JOIN users AS u 
    ON (p.userId = u.id) 
    WHERE p.userId = ? 
    ORDER BY p.createdAt DESC
    LIMIT ` + limit + ` OFFSET ` + offset;

    db.query(query, id, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json({ message: `User with id ${id} has no own posts`, posts: null })

        return res.status(200).json({ offset: offset * 1 + 5, posts: result })
    })
}

const getFriendsPosts = (req, res) => {

    const { id } = req.params

    const query = `SELECT p.*, u.id AS userId, u.name AS userName, u.profileImage FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN subscribers AS s ON (p.userId = s.subscribedId) WHERE s.subscriberId = ? ORDER BY p.createdAt DESC`

    db.query(query, id, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json(`There are no friends' posts`)

        return res.status(200).json(result)
    })
}

const createPost = (req, res) => {

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const query = "INSERT INTO posts(`userId`,`description`, `image`, `createdAt`) VALUES (?)"

        const values = [
            userInfo.id,
            req.body.postText,
            req.body.image,
            req.body.createdAt
        ]

        db.query(query, [values], (err, data) => {
            if (err) {
                console.log(err)
                return res.status(500).json(err)
            }
            return res.status(200).json("Post has been created.")
        });
    });
}

const deletePost = (req, res) => {

    const { postId } = req.params
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const query = "DELETE FROM posts WHERE id = ? AND userId = ?"

        db.query(query, [postId, userInfo.id], (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows > 0) return res.status(200).json("Post was deleted.");
            return res.status(403).json("Can't delete someone else's post")
        });
    });
}

module.exports = { getAllUserPosts, getFriendsPosts, createPost, deletePost }
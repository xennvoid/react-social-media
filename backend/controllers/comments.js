const db = require('../config/db')
require('dotenv').config({ path: './config.env' })

const getPostComments = async (req, res) => {

    const { id } = req.params

    const query = `SELECT * FROM comments WHERE postId = ? ORDER BY comments.createdAt DESC`

    db.query(query, id, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json({ message: `Post with id ${id} has no comments` })

        const userIds = result.map(row => row.userId)

        const query = `SELECT id,name,profileImage FROM users WHERE id IN (?)`

        // search for comment owners
        db.query(query, [userIds], (err, result2) => {

            if (err)
                return res.status(500).json(err)

            // concat post data with comment owner data
            const data = result.map(comment => {
                const suitableUser = result2.find(el => el.id === comment.userId)
                const { name, profileImage } = suitableUser
                return { ...comment, name, profileImage }
            })

            //console.log(data)

            return res.status(200).json(data)
        })
    })
}

const getPostCommentsCount = async (req, res) => {

    const { id } = req.params

    const query = `SELECT COUNT(*) FROM comments WHERE postId = ?`

    db.query(query, id, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json({ message: `Post with id ${id} has no comments` })

        const commentsCount = result[0]['COUNT(*)']

        return res.status(200).json(commentsCount)
    })
}


const addPostComment = async (req, res) => {

    const query = `INSERT INTO comments SET ?`

    db.query(query, req.body, (err, result) => {

        if (err)
            return res.status(500).json(err)

        return res.status(200).json("Comment was added successfully")
    })
}


module.exports = { getPostComments, getPostCommentsCount, addPostComment }
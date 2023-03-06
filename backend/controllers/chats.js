const db = require('../config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

const createChat = (req, res) => {

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const { secondUserId } = req.body
        const query = `SELECT * FROM personal_chats WHERE (user1 = ? OR user2 = ?) AND (user1 = ? OR user2 = ?)`

        const values = [userInfo.id, userInfo.id, secondUserId, secondUserId]

        db.query(query, values, (err, result) => {

            if (err)
                return res.status(500).json(err)

            if (result.length)
                return res.status(200).json(result[0].id) // return existing chat id

            const query = "INSERT INTO personal_chats (user1,user2) VALUES (?)" // creating new chat
            const values = [userInfo.id, secondUserId]

            db.query(query, [values], (err, result) => {

                if (err)
                    return res.status(500).json(err)

                return res.status(200).json(result.insertId)
            })
        })
    })
}

const deleteChat = (req, res) => {

    const { chatId } = req.params
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const query = "DELETE FROM personal_chats WHERE id = ?"

        db.query(query, chatId, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows > 0) return res.status(200).json("Chat was deleted");
            return res.status(403).json("Can't delete chat")
        });
    });
}

const getAllPersonalChats = (req, res) => {

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const query = `SELECT pc.id AS chatId, u.id,u.name,u.login,u.profileImage,u.phoneNumber FROM personal_chats AS pc 
        JOIN users AS u 
        ON (pc.user1 = u.id OR pc.user2 = u.id) 
        WHERE (user1 = ? OR user2 = ?) AND u.id != ?`

        db.query(query, [userInfo.id, userInfo.id, userInfo.id], (err, result) => {

            if (err)
                return res.status(500).json(err)

            if (result.length === 0)
                return res.status(204).json({ message: `No chats` })

            return res.status(200).json(result)
        })
    });
}

const getChatMessages = (req, res) => {

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const { chatId } = req.params
        const query = `SELECT cm.*,u.name,u.profileImage FROM chat_messages AS cm JOIN users AS u ON (cm.userId = u.id) WHERE chatId = ? ORDER BY cm.createdAt ASC`

        db.query(query, chatId, (err, result) => {

            if (err)
                return res.status(500).json(err)

            if (result.length === 0)
                return res.status(204).json({ message: `No messages` })

            return res.status(200).json(result)
        })
    });
}

module.exports = { createChat, deleteChat, getAllPersonalChats, getChatMessages }
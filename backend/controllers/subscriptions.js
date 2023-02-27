const db = require('../config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

const getUserSubscriptions = (req, res) => {

    const { id } = req.params

    const query = `SELECT f.subscribedId,u.name,u.profileImage from users AS u JOIN subscribers AS f ON (f.subscribedId = u.id) AND f.subscriberId = ?`

    db.query(query, id, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json(`User with id ${id} has no subscriptions`)

        return res.status(200).json(result)
    })
}

const getUserSubscribers = (req, res) => {

    const { id } = req.params

    const query = `SELECT f.subscriberId,u.name,u.profileImage from users AS u JOIN subscribers AS f ON (f.subscriberId = u.id) AND f.subscribedId = ?`

    db.query(query, id, (err, result) => {

        console.log(err)

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json(`User with id ${id} has no subscribers`)

        return res.status(200).json(result)
    })
}

const isSubscribed = (req, res) => {

    const { id } = req.params
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const query = "SELECT * FROM subscribers WHERE subscriberId = ? AND subscribedId = ?"

        db.query(query, [userInfo.id, id], (err, result) => {
            if (err) return res.status(500).json(err);
            return result.length == 0 ? res.status(200).json(false) : res.status(200).json(true)
        });
    });
}

const followUser = (req, res) => {

    const { followedId } = req.params
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const query = "INSERT INTO subscribers (subscriberId,subscribedId) VALUE (?)"
        const values = [userInfo.id, followedId]

        db.query(query, [values], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(`You followed user with id ${followedId}`);
        });
    });
}

const unfollowUser = (req, res) => {

    const { followedId } = req.params
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const query = "DELETE FROM subscribers WHERE subscribedId = ? AND subscriberId = ?"

        db.query(query, [followedId, userInfo.id], (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows > 0) return res.status(200).json(`You unfollowed user with id ${followedId}`);
            return res.status(403).json("Can't unfollow user")
        });
    });
}


const getUserSubscriptionsCount = (req, res) => {

    const { id } = req.params

    const query = `SELECT COUNT(*) FROM subscribers WHERE subscriberId = ?`

    db.query(query, id, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json(0)

        const commentsCount = result[0]['COUNT(*)']

        return res.status(200).json(commentsCount)
    })
}

const getUserSubscribersCount = (req, res) => {

    const { id } = req.params

    const query = `SELECT COUNT(*) FROM subscribers WHERE subscribedId = ?`

    db.query(query, id, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length === 0)
            return res.status(204).json(0)

        const commentsCount = result[0]['COUNT(*)']

        return res.status(200).json(commentsCount)
    })
}

module.exports = {
    getUserSubscriptions,
    isSubscribed,
    followUser,
    unfollowUser,
    getUserSubscribers,
    getUserSubscriptionsCount,
    getUserSubscribersCount
}
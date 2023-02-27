const db = require("../config/db");
require('dotenv').config({ path: './config.env' })
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getAllUsers = (req, res) => {

    const query = `SELECT * FROM users`;

    db.query(query, (err, data) => {

        if (data.length === 0) return res.status(204).json([]);

        return res.status(200).json(data);
    })
}

const getUserById = (req, res) => {

    const { id } = req.params

    const query = `SELECT id,name,login,profileImage,backgroundImage,email,phoneNumber,city FROM users WHERE id = ?`;

    db.query(query, id, (err, data) => {

        if (data.length === 0) return res.status(204).json([]);

        return res.status(200).json(data[0]);
    })
}

const getUsersByLogin = (req, res) => {

    const { searchQuery } = req.body

    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const query = `SELECT id,name,login,profileImage,backgroundImage,email,phoneNumber,city FROM users WHERE login LIKE ? AND id <> ? LIMIT 5`;

        db.query(query, [`%${searchQuery}%`, userInfo.id], (err, data) => {

            if (data?.length === 0) return res.status(204).json([])

            return res.status(200).json(data);
        })
    })
}

const updateUser = (req, res) => {

    const token = req.headers['x-access-token']

    const {
        name,
        login,
        password,
        profileImage,
        backgroundImage,
        email,
        phoneNumber,
        city
    } = req.body

    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {

        if (err) return res.status(403).json("Token is not valid!")

        const query = (password === "" ?
            `UPDATE users SET 
        name = ?, 
        login = ?,
        profileImage = ?, 
        backgroundImage = ?, 
        email = ?, 
        phoneNumber = ?, 
        city = ? 
        WHERE id = ?` :
            `UPDATE users SET 
        name = ?, 
        login = ?, 
        password = ?, 
        profileImage = ?, 
        backgroundImage = ?, 
        email = ?, 
        phoneNumber = ?, 
        city = ? 
        WHERE id = ?`);

        let salt, hashPassword, values;

        if (password === "")
            values = [name, login, profileImage, backgroundImage, email, phoneNumber, city]
        else {
            salt = bcrypt.genSaltSync(7)
            hashPassword = bcrypt.hashSync(password, salt)
            values = [name, login, hashPassword, profileImage, backgroundImage, email, phoneNumber, city]
        }

        db.query(query, [...values, userInfo.id], (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.affectedRows > 0) return res.status(200).json("User was updated.");
            return res.status(403).json("Can't update someone else's profile")
        });
    });
}


module.exports = { getAllUsers, getUserById, getUsersByLogin, updateUser };
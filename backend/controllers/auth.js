const bcrypt = require('bcrypt')
const db = require('../config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: './config.env' })

const register = async (req, res) => {

    const { name, login, password, email } = req.body

    const query = `SELECT * FROM users WHERE login = ?`

    db.query(query, login, (err, result) => {

        if (err)
            return res.status(500).json(err)

        if (result.length)
            return res.status(409).json({ message: "User with this login already exists!" })

        const salt = bcrypt.genSaltSync(7)
        const hashPassword = bcrypt.hashSync(password, salt)

        const query = "INSERT INTO users (name,login,password,email) VALUE (?)"
        const values = [name, login, hashPassword, email]

        db.query(query, [values], (err, result) => {

            if (err)
                return res.status(500).json(err)

            return res.status(200).json({ message: "Successfull registration" })
        })
    })
}

const login = (req, res) => {
    const { login, password } = req.body
    const query = `SELECT * FROM users WHERE login = ?`

    db.query(query, login, (err, result) => {

        if (err) return res.status(500).json({ message: "Error" })
        if (result.length === 0) return res.status(400).json({ message: "User with this login doesn't exist" })

        const { password: pass, ...others } = result[0]

        const passwordsMatch = bcrypt.compareSync(password, pass)

        if (!passwordsMatch) return res.status(400).json({ message: "Wrong password or login!" })

        const token = jwt.sign({ id: others.id }, process.env.SECRET_KEY)

        res.status(200).json({ ...others, token })
    })
}

module.exports = { register, login }
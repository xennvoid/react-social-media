import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './register.module.css'
import backgroundImage from '../../assets/images/login-page-bg.png'
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import axios from 'axios'

const Register = () => {

    const [error, setError] = useState('')
    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    const [inputsValues, setInputsValues] = useState({
        name: "",
        login: "",
        email: "",
        password: "",
        confirm: ""
    })

    const formInputs = [
        { placeholder: "Name", name: "name", type: "text", },
        { placeholder: "Login", name: "login", type: "text", },
        { placeholder: "Email", name: "email", type: "email" },
        { placeholder: "Password", name: "password", type: "password" },
        { placeholder: "Confirm password", name: "confirm", type: "password" }
    ]

    const inputChange = (e) => {
        const name = e.target.name
        setInputsValues(prevState => ({ ...prevState, [name]: e.target.value }))
    }

    const register = async () => {

        if (!formValidation()) return

        const url = "http://localhost:5151/api/auth/register"
        const values = { ...inputsValues }
        const { confirm, ...data } = values

        try {
            const response = await axios.post(url, data)
            setError("")
            setRegistrationSuccess(true)
        } catch (error) {
            setError(error.response.data.message)
            setRegistrationSuccess(false)
        }
    }

    const formValidation = () => {

        for (let value of Object.values(inputsValues)) {
            if (!value) {
                setError("You need to fill in all fields!")
                return false;
            }
        }

        if (inputsValues.password !== inputsValues.confirm) {
            setError("Password mismatch")
            return false;
        }

        return true;
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Register</h2>
                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    {formInputs.map((input, i) =>
                        <Fragment key={i}>
                            <label htmlFor={input.name} className={styles.input_label}>{input.name}</label>
                            <input
                                type={input.type}
                                className={styles.input}
                                value={inputsValues[input.name]}
                                placeholder={input.placeholder}
                                name={input.name}
                                onChange={inputChange}
                                required
                            />
                        </Fragment>
                    )}
                    {error && <div className={styles.error}>{error}</div>}
                    {registrationSuccess &&
                        <div className={styles.success}>Your account was successfully created! Go to the login page!</div>
                    }
                    <div className={styles.labels}>
                        <Link to="/login" className={styles.link}>Back to login page</Link>
                    </div>
                    <CustomButton text="Register" onClick={register} />
                </form>
            </div>
            <img src={backgroundImage} alt="background" className={styles.background} />
        </div>
    )
}

export default Register
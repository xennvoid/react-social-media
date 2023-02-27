import React, { Fragment, useContext, useState } from 'react'
import styles from './login.module.css'
import backgroundImage from '../../assets/images/login-page-bg.png'
import CustomButton from '../../components/UI/CustomButton/CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Login = () => {

    const { currentUser, signIn } = useContext(AuthContext)
    const navigate = useNavigate()

    if (currentUser) {
        navigate("/")
    }

    const [error, setError] = useState('')

    const [inputsValues, setInputsValues] = useState({
        login: "",
        password: ""
    })

    const formInputs = [
        { placeholder: "Login", name: "login", type: "text" },
        { placeholder: "Password", name: "password", type: "password" },
    ]

    const inputChange = (e) => {
        const name = e.target.name
        setInputsValues(prevState => ({ ...prevState, [name]: e.target.value }))
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        const login = inputsValues.login
        const password = inputsValues.password

        if (login === "" || password === "") return

        try {
            await signIn(login, password)
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Sign in</h2>
                <p className={styles.text}>Sign in and get started!</p>
                <form className={styles.form}>
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
                    <div className={styles.labels}>
                        <label className={styles.checkbox}>
                            <input type="checkbox" name="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/register" className={styles.link}>Register</Link>
                    </div>
                    <CustomButton text="Login" onClick={handleSignIn} />
                </form>
            </div>
            <img src={backgroundImage} alt="background" className={styles.background} />
        </div>
    )
}

export default Login
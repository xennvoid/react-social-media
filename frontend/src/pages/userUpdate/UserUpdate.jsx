import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './user-update.module.scss';
import { sendRequest } from '../../requestPattern';
import { AuthContext } from '../../context/authContext';

const UserUpdate = () => {

    const { id } = useParams()
    const { currentUser, setCurrentUser } = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [formUpdated, setFormUpdated] = useState(false)

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        login: currentUser?.login || '',
        password: '',
        profileImage: currentUser?.profileImage || '',
        backgroundImage: currentUser?.backgroundImage || '',
        email: currentUser?.email || '',
        phoneNumber: currentUser?.phoneNumber || '',
        city: currentUser?.city || ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setFormUpdated(true)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formUpdated) {
            await sendRequest.put(`/users`, formData)
                .then(response => {
                    console.log(response.data)
                    if (response.status) {
                        setMessage("User was updated! After 4 seconds, you will be redirected to the login page. Log in to your account again!")
                        setTimeout(() => setCurrentUser(null), 4000)
                    }
                })
                .catch(error => console.error(error));

            setFormUpdated(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="profileImage">Profile Image</label>
                <input
                    type="text"
                    id="profileImage"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="backgroundImage">Background Image</label>
                <input
                    type="text"
                    id="backgroundImage"
                    name="backgroundImage"
                    value={formData.backgroundImage}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                />
            </div>
            {message === "" ? null : <div className={styles.message}>{message}</div>}
            <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
    )
}

export default UserUpdate;
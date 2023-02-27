import React from 'react'
import { Link } from 'react-router-dom'
import styles from './profile-link.module.scss'
import userPng from '../../assets/icons/user.png'

const ProfileLink = ({ to, image, name, big }) => {

    return (
        <Link to={to} className={styles.link}>
            <img src={(image == null || image == "") ? userPng : image} alt={name} className={styles.image + (big ? " " + styles.big : "")} />
            <span className={styles.name}>{name}</span>
        </Link>
    )
}

export default ProfileLink
import React, { useContext } from 'react'
import styles from './leftbar.module.scss'
import { AiOutlineUser, AiFillHeart } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Leftbar = () => {

    const { currentUser } = useContext(AuthContext)

    const navigationItems = [
        { icon: <AiOutlineUser />, text: "Profile", to: `/profile/${currentUser.id}` },
        { icon: <FaUserFriends />, text: "Subscriptions", to: `profile/${currentUser.id}/subscriptions` },
        { icon: <FaUserFriends />, text: "Subscribers", to: `profile/${currentUser.id}/subscribers` },
        { icon: <AiFillHeart color="red" />, text: "Charity", to: "/charity" },
    ]

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <ul>
                    {navigationItems.map((item, i) =>
                        <Link to={item.to} key={i} className={styles.link}>
                            <li>
                                {item.icon}
                                <span>{item.text}</span>
                            </li>
                        </Link>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Leftbar
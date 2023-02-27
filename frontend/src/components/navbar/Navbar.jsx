import React, { useContext, useEffect, useState } from 'react'
import styles from './navbar.module.scss'
import Search from '../search/Search'
import { BiUser, BiMessageRounded, BiLogOut } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import ProfileLink from '../profileLink/ProfileLink'
import { sendRequest } from '../../requestPattern'
import useDebounce from '../../hooks/useDebounce'

const Navbar = () => {

    const { currentUser, setCurrentUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [foundUsers, setFoundUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const navigationItems = [
        { icon: <BiUser />, to: `profile/${currentUser.id}/subscribers` },
        { icon: <BiMessageRounded />, to: `/chat` },
    ]

    const signOut = async () => {
        setCurrentUser(null)
        localStorage.removeItem("authToken")
        navigate("/login")
    }

    useEffect(() => {
        const searchUser = async () => {
            const data = await sendRequest.post("users/search", { searchQuery }).then(res => res.data)
            setFoundUsers(data)
        }
        if (searchQuery !== "")
            searchUser()
    }, [debouncedSearchQuery])

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    SM
                </Link>
            </div>
            <div className={styles.search}>
                <Search value={searchQuery} setValue={setSearchQuery} placeholder="Search for friends" foundUsers={foundUsers} />
            </div>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {navigationItems.map((item, i) =>
                        <li className={styles.list_item} key={i}>
                            <Link to={item.to}>
                                {item.icon}
                            </Link>
                        </li>
                    )}
                    <li className={styles.list_item}>
                        <ProfileLink
                            to={`/profile/${currentUser.id}`}
                            name={currentUser.name}
                            image={currentUser.profileImage}
                        />
                    </li>
                    <li className={styles.list_item}>
                        <BiLogOut onClick={signOut} cursor="pointer" />
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
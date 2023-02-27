import React, { useEffect, useRef, useState } from 'react'
import styles from './search.module.scss'
import { BiSearch } from 'react-icons/bi'
import ProfileLink from '../profileLink/ProfileLink'
import { useLocation } from 'react-router-dom'

const Search = ({ value, setValue, placeholder, foundUsers }) => {

    const { pathname } = useLocation()
    const [focused, setFocused] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const removeFocus = (e) => {
            const search = e.target?.closest('[focused]')
            if (!search)
                setFocused(false)
        }
        window.addEventListener('click', removeFocus)
        return () => {
            window.removeEventListener('click', removeFocus)
        }
    }, [])

    useEffect(() => {
        ref?.current?.blur()
        setFocused(false)
    }, [pathname])

    return (
        <div className={styles.container} onClick={() => ref.current.focus()} focused={focused.toString()}>
            <BiSearch size={24} className={styles.icon} />
            <input
                type="text"
                className={styles.input}
                ref={ref}
                value={value}
                placeholder="user123"
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
            />
            {foundUsers?.length > 0 && value !== "" &&
                <div
                    className={styles.foundUsers}
                    style={focused
                        ? { display: 'flex', flexDirection: 'column', gap: '1rem' }
                        : { display: 'none' }
                    }
                >
                    {foundUsers.map(user =>
                        <ProfileLink key={user.id} image={user.profileImage} name={user.login} to={`/profile/${user.id}`} />
                    )}
                </div>
            }
        </div>
    )
}

export default Search
import React from 'react'
import styles from './custom-button.module.css'

const CustomButton = ({ text, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>{text}</button>
    )
}

export default CustomButton
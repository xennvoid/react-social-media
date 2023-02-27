import React, { useContext } from 'react'
import styles from './stories.module.scss'
import { AiFillPlusCircle } from 'react-icons/ai'
import { AuthContext } from '../../context/authContext'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Stories = () => {

    const { currentUser } = useContext(AuthContext)
    const stories = new Array(7).fill(0)

    return (
        <div className={styles.container}>

            <Swiper
                spaceBetween={15}
                slidesPerView={'auto'}
                grabCursor={true}
            >
                {stories.map((story, i) =>
                    <SwiperSlide key={i} style={{ width: '22.222%', userSelect: 'none' }}>
                        <div className={styles.story}>
                            <img
                                src="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt=""
                                className={styles.image}
                            />
                            <div className={styles.info}>
                                {i == 0 ? <AiFillPlusCircle className={styles.icon} /> : null}
                                <span className={styles.user}>{currentUser.name}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                )
                }
            </Swiper>
        </div>
    )
}

export default Stories
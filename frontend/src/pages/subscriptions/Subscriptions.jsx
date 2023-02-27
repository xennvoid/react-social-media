import React from 'react'
import styles from './subscriptions.module.scss'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { sendRequest } from '../../requestPattern'
import Subscription from './subscription/Subscription'

const Subscriptions = () => {

    const { pathname } = useLocation()
    const { id: profileId } = useParams()

    // subscriptions or subscribers
    const dataName = pathname.split('/')[3]

    const {
        isLoading,
        error,
        data: subscriptions,
    } = useQuery([dataName, profileId], () => sendRequest(`subscriptions/${profileId}/${dataName}`).then(res => res.data))

    const {
        data: userById
    } = useQuery(["userById", profileId], () => sendRequest(`users/${profileId}`).then(res => res.data))

    return (
        <section className={styles.friends}>
            <h2 className={styles.title}>{userById?.login} {dataName}</h2>
            {subscriptions && subscriptions.map((subscription, i) =>
                <Subscription subscription={subscription} profileId={profileId} dataName={dataName} key={i} />
            )}
        </section>
    )
}

export default Subscriptions
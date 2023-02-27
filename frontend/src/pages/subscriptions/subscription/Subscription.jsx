import React, { useContext } from 'react'
import ProfileLink from '../../../components/profileLink/ProfileLink'
import styles from './subscription.module.scss'
import { useMutation, useQueryClient } from 'react-query'
import { sendRequest } from '../../../requestPattern'
import { AuthContext } from '../../../context/authContext'

const Subscription = ({ subscription, dataName, profileId }) => {

    const { currentUser } = useContext(AuthContext)

    const queryClient = useQueryClient()

    const mutation = useMutation(
        () => {
            return sendRequest.delete(`subscriptions/${subscription.subscribedId}`);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([dataName]);
            },
        }
    )

    const unfollow = async () => {
        try {
            mutation.mutate()
        } catch (err) {
            console.log(err)
        }
    }

    const profileLinkId = dataName == "subscriptions" ? subscription.subscribedId : subscription.subscriberId

    return (
        <article className={styles.subscription}>
            <ProfileLink
                to={`/profile/${profileLinkId}`}
                name={subscription.name}
                image={subscription.profileImage}
                big
            />
            {dataName == "subscriptions" && profileId == currentUser.id &&
                <div className={styles.delete} onClick={unfollow}>
                    Unfollow
                </div>
            }
        </article>
    )
}

export default Subscription
const router = require('express').Router();
const {
    getUserSubscriptions,
    getUserSubscribers,
    followUser,
    unfollowUser,
    getUserSubscriptionsCount,
    getUserSubscribersCount,
    isSubscribed
} = require('../controllers/subscriptions')

router.get("/:id/subscriptions", getUserSubscriptions)
router.get("/:id/subscribers", getUserSubscribers)
router.get("/:id/count/subscriptions", getUserSubscriptionsCount)
router.get("/:id/count/subscribers", getUserSubscribersCount)
router.get("/:id/subscribed", isSubscribed)
router.post("/:followedId", followUser)
router.delete("/:followedId", unfollowUser)

module.exports = router;
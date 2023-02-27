const router = require('express').Router()
const {
    getPostLikesCount,
    isPostLiked,
    addLike,
    removeLike
} = require('../controllers/likes')

router.get("/post/:postId/count", getPostLikesCount)
router.get("/post/:postId/liked", isPostLiked)
router.post("/post/:postId", addLike)
router.delete("/post/:postId", removeLike)

module.exports = router;
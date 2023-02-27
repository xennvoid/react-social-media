const router = require('express').Router()
const { getAllUserPosts, getFriendsPosts, createPost, deletePost } = require('../controllers/posts')

router.get("/user/:id", getAllUserPosts)
router.get("/friends/:id", getFriendsPosts)
router.post("/new", createPost)
router.delete("/:postId", deletePost)

module.exports = router;
const router = require('express').Router()
const { getPostComments, getPostCommentsCount, addPostComment } = require('../controllers/comments')
const { verify } = require('../verify')

router.get("/post/:id", getPostComments)
router.get('/post/:id/count', getPostCommentsCount)
router.post('/post/:id/comment/add', verify, addPostComment)

module.exports = router;
const router = require('express').Router();
const { getAllUsers, getUserById, getUsersByLogin, updateUser } = require('../controllers/users')

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/search", getUsersByLogin)
router.put("/", updateUser)

module.exports = router;
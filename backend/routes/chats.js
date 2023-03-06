const router = require('express').Router();
const { createChat, deleteChat, getAllPersonalChats, getChatMessages } = require('../controllers/chats');

router.post("/create", createChat)
router.delete("/:chatId", deleteChat)
router.get("/", getAllPersonalChats)
router.get("/:chatId/messages", getChatMessages)

module.exports = router;
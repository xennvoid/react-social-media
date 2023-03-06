const db = require('./config/db')

module.exports = {
    start: function (io) {
        io.on('connection', (socket) => {

            socket.on('message', data => {
                socket.to(data.chatId).emit('receive-message', data);

                const query = `INSERT INTO chat_messages (chatId,userId,text,createdAt) VALUES (?)`
                const values = [data.chatId, data.userId, data.text, data.createdAt]

                db.query(query, [values], (err, result) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    console.log('saved')
                })
            });

            socket.on('join-room', chatId => {
                socket.join(chatId);
            });

            socket.on('disconnect', () => {
                console.log('🔥: A user disconnected');
            });

        })
    }
}
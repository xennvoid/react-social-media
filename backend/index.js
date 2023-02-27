const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv");
const cors = require('cors');
const multer = require('multer');

/* Routes */
const userRoutes = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');
const postsRoutes = require('./routes/posts.js');
const commentsRoutes = require('./routes/comments.js');
const likesRoutes = require('./routes/likes');
const subscriptionsRoutes = require('./routes/subscriptions');
const achievementsRoutes = require('./routes/achievements');


const app = express();

/* Bodyparser Middleware */
app.use(express.json());

const corsOptions = {
    origin: 'http://127.0.0.1:5173',
}
app.use(cors(corsOptions));

/* Load env */
dotenv.config({ path: "./config.env" });

//* Log rout actions
if (process.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// File upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/files");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/api/load", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});



//* Using Routes

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/subscriptions', subscriptionsRoutes);
app.use('/api/achievements', achievementsRoutes);

const port = process.env.PORT || 5555;

app.listen(port, () => console.log(`Server started on port ${port}`));

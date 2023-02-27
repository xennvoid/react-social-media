const mysql = require("mysql");
require('dotenv').config({ path: './config.env' })

let db;
connectDatabase = () => {
    if (!db) {
        db = mysql.createConnection({
            host: process.env.DBHOST,
            database: process.env.DBNAME,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            multipleStatements: true,
        });
        db.connect(function (err) {
            if (!err) {
                console.log("Database is connected!");
            } else {
                console.log("Error connecting database!");
                console.log(err)
            }
        });
    }
    return db;
};
module.exports = connectDatabase();

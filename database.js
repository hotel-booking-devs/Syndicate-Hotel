/*
just install mysql2 using the command: npm install mysql2

*/

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'kiddo_4326970_2025',
    database: 'hotel_booking',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    }
    else{
        console.log('Connected to the MySQL database.');
    }
});
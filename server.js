
const express = require('express');
const app = express();
const Port = 3000;
const path = require('path');
const mysql = require('mysql2');


app.use(express.json());
app.use(express.static(__dirname));

//DB connection
const db = mysql.createConnection({
    host: '127.0.0.1',     
    user: 'root',
    password: 'Password',
    database: 'hotel_booking',
});

db.connect((err) => {
    if (err){
      console.error('Database connection error :', err);
    } 
    else{
      console.log('Connected to MySQL database.');
    } 
});

// Route for your main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});


let userdata ={
  "names":"",
  "email":"",
};

//LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      res.json({ correct: true });
    } else {
      res.json({ correct: false });
    }
  });
});


//SIGNUP
//
app.post("/api/signup", (req, res) => {
  const { username, names, email, phonenumber, password } = req.body;

  // Check if username exists
  const checkSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkSql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0){
      return res.json({ success: false, message: "Username not available" });
    }
    //Insert new user
    const insertSql = 'INSERT INTO users (username, names, email, phonenumber, password) VALUES (?, ?, ?, ?, ?)';
    db.query(insertSql, [username, names, email, phonenumber, password], (err2) => {
      if (err2){
        return res.status(500).json({ error: err2.message });
      } 
      res.json({ success: true, message: "Account created successfully" });
    });
  });
});

// CHECK USERNAME
app.post("/api/checkuser", (req, res) => {
  const { username } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ exist: results.length > 0 });
  });
});
// SEND OTP
app.post("/api/sendotp", (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const sql = 'UPDATE users SET otp = ? WHERE email = ?';
  db.query(sql, [otp, email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.json({ success: false, message: "Email not found" });

    console.log(`OTP for ${email}: ${otp}`);
    res.json({ success: true, message: "OTP sent" });
  });
});
//send userdata
app.post('/api/getuserdata', (req, res) => {
    // You can check req.body if needed
    if (req.body.data === "true") {
        res.json({
            names: userdata.names,
            email: userdata.email
        });
    } else {
        res.status(400).json({ error: "Invalid request" });
    }
});
// RESET PASSWORD
app.post("/api/resetpassword", (req, res) => {
  const { email, otp, newPassword } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND otp = ?';
  db.query(sql, [email, otp], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.json({ success: false, message: "Invalid or expired OTP" });

    const updateSql = 'UPDATE users SET password = ?, otp = NULL WHERE email = ?';
    db.query(updateSql, [newPassword, email], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ success: true, message: "Password reset successful" });
    });
  });
});
// Load rooms
app.post("/api/search_rooms", (req, res) => {
    const { room_type } = req.body;
    let sql = "SELECT * FROM rooms WHERE available = 1";
    if (room_type && room_type.trim() !== "") {
        sql += " AND type = ?";
        params.push(room_type);
    }
    db.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
        res.json({ rooms: results });
    });
});

app.listen(Port, ()=>console.log(`the server is listnenig in ${Port}`));

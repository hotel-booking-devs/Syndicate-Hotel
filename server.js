// address: http://localhost:3000
// to run the server use the command: npm run dev
// make sure you have nodemon installed globally using the command: npm install -g nodemon
// to install express use the command: npm install express
// 127.0.0.1:3000
// I have installed nodemon and -save-dev nodemon
/*
  just instaal express and nodemon on the command
  line using npm install express nodemon --save-dev
  Just make sure that u have installed the node JS on ur computer 
*/


const express = require('express');

const app = express();
const Port = 3000;
const path = require('path');

// Serve all static files from the client folder
app.use(express.static(path.join(process.cwd(), 'client')));

// Route for your main page
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'login.html'));
});

app.post('/login', (req, res)=>{
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required',
      sucess: false
    });
  }
});



app.listen(Port, ()=>console.log(`the server is listnenig in ${Port}`));
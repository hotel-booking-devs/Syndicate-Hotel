const connection = require('./database');

connection.query(' SELECT * FROM users', (err, results)=>{
   if (err){
    console.error('Error executing query:', err.mesage);
    return;
   }
   console.log('Query Result:', results);
   connection.end();
});
const mysql = require('mysql');

// const connection = mysql.createPool({
//     connectionLimit: 10,
//     host: 'dragon.kent.ac.uk',
//     port: 3306,
//     user: 'c10_friends',
//     password:'kyl6oqu',
//     database:'c10_friends',
//     debug: false
//     });

// connection.getConnection((err, connection) => {
//     (err)? console.log(err): console.log('connected to database');
//     (connection)? connection.release(): null;
// })

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'Zhou19980921',
    database:'c10_friends',
});

connection.connect((err) => {
    (err)? console.log(err): console.log('connected to database');
})
module.exports = connection;

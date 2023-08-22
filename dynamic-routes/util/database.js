const mysql=require('mysql2');

const pool =mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-completed',
    password: 'Rockrolland@981'
});

module.exports=pool.promise();
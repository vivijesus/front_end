const mysql = require('mysql');

var pool = mysql.createPool({
    "user" : process.env.MSQL_USER,
    "password" : process.env.MSQL_PASSWORD,
    "database" : process.env.MYSQL_DATABASE,
    "host" : process.env.MSQL_HOST,
    "port" : process.env.MSQL_PORT
});

exports.pool = pool;

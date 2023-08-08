const http = require('http');
const reqHandler=require('./serv')

const server = http.createServer(reqHandler);

server.listen(3000);

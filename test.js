const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    try {
      const data = fs.readFileSync('./messag.txt', { encoding: 'utf-8' });
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write(`<body>${data}</body>`);
      res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
      res.write('</html>');
      return res.end();
    } catch (err) {
      console.log('Error reading file:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.write('<html><body><h1>Error: Could not read file</h1></body></html>');
      return res.end();
    }
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(parsedBody);
      fs.writeFileSync('./messag.txt', message);
      res.statusCode = '302';
      res.setHeader('Location', '/');
      return res.end();
    });
  }
});

server.listen(3000);

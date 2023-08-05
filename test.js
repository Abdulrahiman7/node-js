const http=require('http');
const server=http.createServer((req,res)=>{
    switch(req.url)
    {
        case '/home':
        res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Welcome to the Home Page</h1></html></body>');
    res.end();
    break;
    case '/about':
        res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Welcome to About Page</h1></html></body>');
    res.end();
    break;
    case '/node':
        res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><h1>Welcome to Node js project</h1></html></body>');
    res.end();
    break;
    }
})
server.listen(4000);
  
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>HTML page by Node.js</title></head>');
    res.write('<body><h1>Rendering HTML by Node.js</h1></body></html>');
    res.end();
}); 

server.listen(3000);
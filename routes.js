
const httpRequest = (req, res) =>{

    if(req.url === '/'){
        console.log("Home Page");
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>HTML page by Node.js</title></head>');
        res.write(
            '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
          ); 
        res.write('</html>');  
        return res.end();

    }

    if(req.url === '/users'){
        console.log("Users");

        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Users</title></head>');
        res.write('<body><h1><ul><li>User1</li><li>User2</li></ul></body></html>');
        return res.end();

    }

    if(req.url === '/create-user' ){
        console.log("Create Users");
        const body = [];

        req.on('data', chunk => {
            console.log("chunk"+ chunk);
            body.push(chunk);
        })

        console.log("BODY:" + body);

        req.on('end', () => {
            const bodyParse = Buffer.concat(body).toString();
            console.log(bodyParse.split('=')[1]);
        })

        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }
   
}

module.exports = httpRequest;
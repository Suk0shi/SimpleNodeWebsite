 const http = require('http')
 const fs = require('fs/promises')
 const port = 3000

 const getFilename = (url) => {
    switch (url) {
        case '/':
            return './index.html'
        
        case '/contact-me':
            return './contact-me.html'

        case '/about':
            return './about.html'

        default:
            return './404.html'
    }
 }

 const getFile = async (filename) => {
    try {
        const data = await fs.readFile(filename, {encoding: 'utf-8'})
        return data;
    } catch (err) {
        console.error(err)
    }
 }

 const server = http.createServer(async function(req, res) {
    const filename = getFilename(req.url);
    const content = await getFile(filename);

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content);
 })

 server.listen(port, function(error) {
    if(error) {
        consolelog('something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
 })
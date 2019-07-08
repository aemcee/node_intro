// Build Static Webserver Here

// http is a module. different from php require
const http = require('http');
// import http library?
const fs = require('fs');
const path = require('path');

// create server takes a callback function
const server = http.createServer(function(request, response) {

    // console.log('Request URL: ', request.url);

    let filePath = '.' + request.url; 

    if(filePath === './'){
        filePath = './index.html';
    }

    const fileExt = path.extname(filePath);

    // object to match the file extension to the content-type
    const mimeTypes = {
        '.html' : 'text/html',
        '.css' : 'text/css',
        '.js' : 'text/javascript',
        '.png' : 'image/png',
        '.ico' : 'image/x-icon',
        '.jpg' : 'image/jpg'
    };

    const contentType = mimeTypes[fileExt];

    // gets extention of each file
    // console.log('File Ext', path.extname(filePath));

    fs.readFile(filePath, function(error, content){
        if(error){
            // console.log('File Load Error: ', error);

            if(error.code === 'ENOENT'){
                return fs.readFile('./404.html', function(error, content){
                    response.writeHead(404, {'Content-type': 'text/html'});
                    response.end(content, 'utf-8');
                });
            }

            response.writeHead(500);
            return response.end('Internal Server Error');
        };

        // because of the content type we were able to load all the files of our webpage
        response.writeHead(201, {'Content-Type': contentType});
        response.end(content, 'utf-8');
    });
});

// server information PORT and LISTEN
// make the server listen on port 3001
server.listen(3001);
console.log('Server listening at localhost:3001');
console.log('"control + c" to stop and exit');

// const ENV = process.env.NODE_ENV || 'development';
// const PORT = process.env.PORT || 9000;

// if(PORT === 'production'){
//     // Production code
//     console.log('You are on the production server running on PORT: ', PORT);
// }else{
//     // Development code
//     console.log('You are in a development server running on PORT: ', PORT);
// }

// console.log('ENV: ', process.env.NODE_ENV);
// console.log('Arguments: ', process.argv);

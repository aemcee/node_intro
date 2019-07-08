// Build Static Webserver Here
const express = require('express');
const path = require('path');
const server = express();

// serve the folder we're in statically
// what we built on the server branch static is doing below
server.use(express.static(path.resolve(__dirname))); 

server.listen(3001, () => {
    console.log('Server is running at localhost:3001');
}).on('error', (error) => {
    console.log('Error listening on PORT:3001. Do you already have a server running on 3001');
});
console.log('Hello from server app!!!')
const express = require('express');
const app = express();
const filesRoute = require('./routes/FilesRoute');

app.use('/',filesRoute);
///////////////////////////////////////
var port = 3010;    //can be from 1024 - 65535

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})


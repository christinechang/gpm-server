console.log('Hello from server app')
const express = require('express');
const app = express();

/////////////////////////////////////////
const fs = require('fs');
let state = {
    dirItems:[]
}
async function getDirInfo(path) {

    let promise = new Promise((resolve=>{
        let dirItemsI = []; 
        dirItemsI = [{"name":"filename1"},{"name":"filename2"},{"name":"filename5"}]

        console.log('in promise');
        // fs.readdir(path, function(err, items) { 
        //     for (var i=0; i<items.length; i++) {
        //         console.log('in app: ', path + '/' + items[i]);
        //         dirItems.push({name: items[i], fullpath: path + '/' + items[i]});
        //     }
        //     console.log('x===>',dirItems);
        //     console.log('x===>');
        // })
        return(1);
    }),
    reject =>('error in promise'))
    // let promise2 = new Promise((resolve,reject) => {
    //     console.log('in promise2')
    //     dirItems.forEach((elem) => {
    //         console.log("elem:",elem);
    //         fs.stat(elem.fullpath, function(err, stats) {
    //             if (stats.isDirectory()) {
    //                 elem['isDir'] = true
    //             }
    //         });
    //     });
    // })
    try {
        let result = await promise;
        // let result2 = await promise2;
    } catch(err) {
            alert(err);
    }
    return(result);

}

app.get('/directory', (request, response) => {
    var path = '/Apps';

    // let dirItems = [];
    //put await here --need it!
    let res2 = getDirInfo(path);
    // fs.readdir(path, function(err, items) { 
    //     for (var i=0; i<items.length; i++) {
    //         console.log('in app: ', items[i]);
    //         dirItems.push({name: items[i], fullpath: path + '/' + items[i]});
    //     }
    // });
        
    // console.log('this happens right away:', res2);

    // console.log(dirItems);
    // //followed by testing if directory or not - to add link
    // //add directory slash to it
    // dirItems.forEach((elem) => {
    //     fs.stat(elem.fullpath, function(err, stats) {
    //             // console.log(stats);
    //             if (stats.isDirectory()) {
    //                 elem['isDir'] = true
    //             }
    //         });
    // });
     //console.log('finishing app.js' + dirItems);
    // fileArr = [{"name":"filename1"},{"name":"filename2"},{"name":"filename3"}]
    // response.send(fileArr);
    response.send(res2);
})

//////////////////////////////////////////


/////////////////////////////////
// app.get('/', (request, response) => {
//     console.log('you have reached the default page')
//     //response.send('<h1>you have reached default page, dudes,dudes</h1>')
//     //response.send()
// })
// app.get('/hello', (request, response) => (
//     // console.log('you have reached the default page')
//     response.send('<h1>hello: you have reached default page, dude</h1>')
// ))
// app.post('/home', (request, response) => {
//     response.send("you have reached me, dude")
// })

//let url = 'file:///C:'/


///////////////////////////////////////
var port = 3010;

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

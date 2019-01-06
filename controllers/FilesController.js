const Files = require('../models/FilesModel'); //import model
            //stores info on the files - name, type, etc

const fs = require('fs');

async function isItDirectory(item) {   //make this a promise
    return (await fs.stat(item, function(err, stats) {
        return((stats ? true : false));
    }))
}
function sendResult(x) { 
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
            // console.log('sending dirItems')
          }, 10);
    });
  }
             
class FilesController {
    //GET FIND ALL
    get(req,res){   //this works sending basic info
        // console.log(Files); //this works - shows the model
        let fileArr = [{"name":"filename1"},{"name":"filename2"},{"name":"filename4"}]

        // res.send(fileArr);
        res.json(fileArr);
    }
    async _find(req,res) { //(finds many and returns array)
        var path = '/';         //default value
        try {
            // const result = await getInfo();//model fetch data 
            await fs.readdir(path, async function(err, items) { 
                let dirItems = [];  
                let name, fullpath;
                for (var i=0; items && i<items.length; i++) {
                    name = items[i];
                    fullpath = path + (path.slice(-1) == '/' ? '': '/') + name;
                    dirItems.push({"name": name,"path":path,"isDir":false, "fullpath":fullpath}); 
                }
                for (let i = 0 ; i < dirItems.length ; i++) {   
                    await fs.stat(dirItems[i].fullpath, function(err, stats) {      
                        if (stats && stats.isDirectory()) {                                                
                            dirItems[i].isDir = true;                           
                        }
                    });
                }
                res.send( await sendResult(dirItems));
            });
        }
        catch(e) {
            res.send({e})
        }
    }
///////////////
    async _findOne(req,res) { //(finds many and returns array)
        let {path} =  req.params;
        try {
            await fs.readdir(path, async function(err, items) { 
                let dirItems = [];  
                let name, fullpath;
                for (var i=0; items && i<items.length; i++) {
                    name = items[i];
                    fullpath = path + (path.slice(-1) == '/' ? '': '/') + name;
                    dirItems.push({"name": name,"path":path,"isDir":false, "fullpath":fullpath}); 
                }
                for (let i = 0 ; i < dirItems.length ; i++) {
                    await fs.stat(dirItems[i].fullpath, function(err, stats) {
                        if (stats && stats.isDirectory()) {
                            dirItems[i].isDir = true;
                        }
                    });
                }
                res.send( await sendResult(dirItems));          
            });
        }
        catch(e) {
            res.send({e})
        }
    }
}

const filesController = new FilesController();     
module.exports = filesController;
//or   module.exports = new FilesController();   




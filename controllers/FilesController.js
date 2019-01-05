const Files = require('../models/FilesModel'); //import model
            //stores info on the files - name, type, etc

const fs = require('fs');

// async function getInfo() {   //this works sort of
//     let dirItems = [];
//     var path = '/Apps';
//     //put await here
//     await fs.readdir(path, function(err, items) { 
//         for (var i=0; i<items.length; i++) {
//             console.log(items[i]);
//             dirItems.push(path + '/' +  items[i]);
//         }
//     });
//     // dirItems = [{"name":"filename1"},{"name":"filename2"},{"name":"filename4"}]

//     //put this into a promise
//     await isItDirectory(dirItems,path);  //make this into promise?
//     console.log(dirItems)
//     return(dirItems);
// }    

async function isItDirectory(item) {   //make this a promise
    return (await fs.stat(item, function(err, stats) {
        return((stats ? true : false));
    })
    )
}
function sendResult(x) { 
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
            console.log('sending dirItems')
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
        console.log ('in controller' );
            var path = '/';         //this will be a req param later
            try {
            // let filesInfo = [{"name":"filename1"},{"name":"filename2"},{"name":"filename4"}]
            let filesInfo = []
            // const result = await getInfo();//model fetch data 

            await fs.readdir(path, async function(err, items) { 
                let dirItems = {};
                let itemType;
                let name, fullpath;
                for (var i=0; i<items.length; i++) {
                    name = items[i];
                    fullpath = path + (path.slice(-1) == '/' ? '': '/') + name;
                    // dirItems.push({"name": name,"path":path,"isDir":false, "fullpath":fullpath});
                    dirItems[name] = {"isDir":false,"fullpath":fullpath};
                }
                // console.log("OBJECT DIRITEMS:", dirItems)
                for (let elem in dirItems) {
                    await fs.stat(dirItems[elem].fullpath, function(err, stats) {
                        if (stats) {
                            dirItems[elem].isDir = true;
                        }
                    });
                }
                // await res.send(dirItems);
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

    console.log("in findOne controller path: ", path,'....',req.params)
    let filesInfo = []
    try {
        await fs.readdir(path, async function(err, items) { 
            let dirItems = {};
            let itemType;
            let name, fullpath;
            
            for (var i=0; items && i<items.length; i++) {
                name = items[i];
                fullpath = path + (path.slice(-1) == '/' ? '': '/') + name;
                // dirItems.push({"name": name,"path":path,"isDir":false, "fullpath":fullpath});
                dirItems[name] = {"isDir":false,"fullpath":fullpath};
            }
            for (let elem in dirItems) {
                await fs.stat(dirItems[elem].fullpath, function(err, stats) {
                    if (stats) {
                        dirItems[elem].isDir = true;
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




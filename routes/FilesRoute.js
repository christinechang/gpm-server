const express = require('express'), 
    router = express.Router(),
    controller = require('../controllers/FilesController');
    // isLoggedIn = () =>(next); //for now  return 'next' which allows to jump to next function

    router.get('/', controller._find);    //using function we defined in controller
    router.get('/:path', controller._findOne);   // parameters: path

    // router.get('/', controller.get);    //using function we defined in controller

module.exports = router;  //not class

var express = require('express');
var router = express.Router();

/* GET users listing. */





 
const service=require("../module/user.service")


router.post("/register",service.register)
router.post("/login",service.login );


module.exports=router

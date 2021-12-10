var express = require('express');
var router = express.Router();
var post=require("../module/post.service")
/* GET home page. */
router.post('/',post.Post );
router.get("/",post.getPost);
router.delete("/:id",post.deletePost)

module.exports = router;

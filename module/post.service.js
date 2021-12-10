const Post = require("../schema/postSchema")


exports.Post=async(req,res,next)=>{
    const {email,date,time,title}=req.body
    const PostList=new Post({
       email:email,
       title:title,
       date:date,
       time:time
    }) 
    const response=await PostList.save()
    res.send(response)
}
exports.getPost=async(req,res)=>{
    const email=req.user.user.email
    const response=await Post.find({email:email})
    res.send(response)

}
exports.deletePost=async(req,res)=>{
    const id=req.params.id 
  
   const response= await Post.findByIdAndDelete(id)
    res.send(response)
}
const express=require("express");

module.exports=function () {
    var router=express.Router();
//检查登陆状态
    router.use((req,res,next)=>{  //拦截所有请求
        if(!req.session['admin_id']&&req.url!='/login'){  //没有登陆
           res.redirect("/admin/login") ;
      }else{
            next()
       }
    })
     router.get("/login",(req,res)=>{
         res.render("admin/login.ejs",{});
     })
    router.get("/",(req,res)=>{
        res.send("我是admin").end();
})
    return router;
}
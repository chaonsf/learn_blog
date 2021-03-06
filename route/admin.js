const express=require("express");
const common=require("../libs/common");
const mysql=require("mysql");


var db=mysql.createPool({
    host:"localhost",
    user:'root',
    password:"543216",
    database:"learn"
})
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
     router.post("/login",(req,res)=>{
       username=req.body.username;
       password=common.md5(req.body.password+common.MD5_SUFFIX);

       db.query(`SELECT * FROM  admin_table WHERE username="${username}"`,(err,data)=>{
           if(err){
               res.status(500).send("database error").end();
           }else{
               if(data.length==0){
                   res.status(400).send("no this admin").end()
               }else{
                   if(data[0].password==password){
                       //登陆成功
                       req.session['admin_id']=data[0].ID;
                       res.redirect("/admin/")
                   }else{
                       res.status(400).send(" this password is error").end()
                   }
                }
           }
       })

     })
      router.get("/",(req,res)=>{
          res.send("恭喜成功登陆").end()
      })
    return router;
}

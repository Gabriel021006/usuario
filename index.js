const express = require ("express");
const app = express(); 
const bodyParser = require ("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/usuarios",{useNewUrlParser:true,useUnifiedTopology:true});
const cors = require ("cors")
app.use (cors());
const usuariosModel = require("./usuario");
const usuario = mongoose.model("Usuario",usuariosModel);

const jwt = require("jsonwebtoken");
const JWTSecret = "jjkjsjdssllldldsdsdjdksjkdsjhjhjhllhjls";

function auth(req,res,next){
    const authToken = req.headers['authorization']
    
    if(authToken != undefined){
    
        const bearer = authToken.split(' ');
        var token = bearer[1];
    
        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.status(401);
                res.json({err:"Token inválido!"});
            }else{
    
                req.token = token;
                req.loggedUser = {id: data.id,email: data.email};               
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err:"Token inválido!"});
    } 
    }

app.use (bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());


app.get("/usuarios",auth,(req , res)=>{
    res.statusCode = 200;



    usuario.find({}).then(usuario =>{
        res.json(usuario);
        }).catch(err =>{
            console.log(err)
        })
        
    
});

    app.get("/usuarios/:id",auth,(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(400)
        }else{
           var id = parseInt(req.params.id);
        
           var usuario = 
           Usuario.find({}).then(usuarios =>{
               res.json(usuarios);
               }).catch(err =>{
                   console.log(err)
               }).find(g =>g.id == id);
        
        
           if(usuario !=undefined){
               res.json(usuario);
           }else{
               res.sendStatus(404);
           }}
        }); 


    app.post("/usuarios",auth,(req,res)=>{
        var { name,
            email,
            password,
            status} = req.body;
      
        const artigo = new usuario ({ name,email,password,status})
        artigo.save().then(()=>{
            console.log("Artigo salvo!")
        }).catch(err=>{
            console.log(err);
        })
    
    res.sendStatus(200);
    })
    
    app.delete("/usuarios/:id",auth,(req,res)=>{
    
        usuario.findByIdAndDelete(name,email,password,status).then(()=>{
            console.log("Dado removido")
        }).catch(err =>{
            console.log(err)
        })
        
        })

        app.put("/usuarios/:id",auth,(req, res) => {

            if(isNaN(req.params.id)){
                res.sendStatus(400);
            }else{
            
                usuario.findByIdAndUpdate().then(()=>{
                    console.log("iten atualizado")
                }).catch(err =>{
                    console.log(err)
                })
                
            }
        
        });
    

        app.post("/auth",(req,res)=>{
            var {email, password} = req.body;
    
            if(email != undefined){
        
                var user = usuario.find(u => u.email == email);


                jwt.sign({id: 10, email: "oi"},JWTSecret,{expiresIn:'48h'},(err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })

               
        
            }else{
                res.status(400);
                res.send({err: "O E-mail enviado é inválido"});
            }
        })
   
app.listen(9090,()=>{
console.log("api rodando")
});
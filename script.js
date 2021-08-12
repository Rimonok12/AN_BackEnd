const express = require('express');

const bodyParser= require('body-parser');

const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});
db.select('*').from('users').then(data=>{
    console.log(data);
});

const app=express();


app.use(bodyParser.json());12
app.use(cors());
const database={
    users: [{
        id:'123', 
        name:'rimon' , 
        email:'rimon@gmail.com', 
        pass:'cookies',
        entries:0 , 
        joined: new Date()  
    }, 
    {
        id:'456', 
        name:'Shachi' , 
        email:'Shachi@example.com', 
        pass:'bananas',
        entries:0 , 
        joined: new Date() 
    }
],login:[{
    id:'987', 
    hash:'', 
    email:'rimon@gmail.com' 
 
}]
}

//1st:
app.listen(process.env.PORT || 3000,() => {
    console.log(`app is running on port ${process.env.PORT}`)
})

//2nd:
app.get('/', (req, res) => {
    res.send(database.users ,"it IS WORKING")
})

//3.signin:
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

//4.register::    
app.post('/register' ,(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

//5:  
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

//6:image::
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

//7:handle image api:
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



/* 
/1:res=this is working
/2:signin -->post =success/fail
/3:register --> post = user 
/4:profile--> userID --> Get req==User;
/5:ranking --> image -->put  --> User     
/6:becrypt
*/
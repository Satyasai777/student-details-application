const express=require("express");
const mongoose=require("mongoose");
const mysql = require('mysql');
const cors=require('cors');
const app=express();
const dotEnv=require('dotenv');
const bcrypt=require('bcrypt');
const userSchema=require('./model/CreateUser');

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended : true}))
dotEnv.config();

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log('succesfully connected to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'student'
})



app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userSchema.findOne({ email });

        if (user) {
            return res.status(200).json("User exists" );
        } else {
            return res.status(404).json("User does not exist");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userSchema({
            userName,
            email,
            password: hashedPassword
        });

        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }
        else{
            // await user.save();
            await userSchema.insertMany([user]);
            res.status(201).json("User registered successfully");
        }
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: "Server error" });
    }
});



app.get('/home',(req,res)=>{
    const sql = 'select * from studdetails';

    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.post('/create',(req,res)=>{
    const sql = 'insert into studdetails(name,email) values (?,?)';

    db.query(sql,[req.body.name,req.body.email],(err,result)=>{
        if(err){
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.put('/update/:id',(req,res)=>{
    const sql = 'update studdetails set `name`=?,`email`=? where id=?';

    db.query(sql,[req.body.name,req.body.email,req.params.id],(err,result)=>{
        if(err){
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.delete('/student/:id',(req,res)=>{
    const sql = 'delete from studdetails where id=?';

    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            console.log(err)
        } else {
            res.json(result)
        }
    })
})

app.listen(8081,()=>{
    console.log("Your server is running on port 8081")
})



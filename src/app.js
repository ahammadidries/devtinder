const express = require('express');
const connectDB = require("./config/database.js");
const User = require('./models/user');
const app = express();

app.use(express.json());

app.post("/signup", async (req, res)=>{
        const user = new User(req.body);
    
        await user.save();

    res.send("User data sended successfully");
});

//Get user by email
app.get("/user", async (req,res)=> {
   
   const userEmail = req.body.emailId;

   try {

        const users = await User.find({emailId: userEmail});

        res.send(users);
   } catch(err) {

    res.status(400).send("Something went worng");

   }
});

// Feed API - GET /feed - get all the users froom the database
app.get("/feed", async (req , res)=> {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(404).send("Users not found");
        
    }
});


connectDB()
    .then(()=> {
        console.log("Database connection established....")
        app.listen(3000,() => {
            console.log("Server is running");
    });
    }).catch(err=> {
        console.log("Data cannot be connected!!")
    })


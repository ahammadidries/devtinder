const express = require('express');
const connectDB = require("./config/database.js");
const User = require('./models/user');
const app = express();


app.use(express.json());
//signup API
app.post("/signup", async (req, res)=>{
    try {

        const user = new User(req.body);
    
        await user.save();

        res.send("User data sended successfully");
    } catch (err) {

        res.status(500).send(`Signup went worng!! Error : ${err}`);
        
    }
        
});

//Get user by email from the database
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

//Update data of the user
app.patch("/user/:userId", async (req,res)=> {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["userId","photoUrl","about","gender","age","skills"]
    
    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));

    if(!isUpdateAllowed){
       throw new Error ("Update not allowed");
    }
    if(data?.skills.length > 10){
        throw new Error("Skills connot be more than 10");
    }
    
        await User.findByIdAndUpdate({_id:userId},data,{
            runValidators: true
        });
        res.send("User updated successfully")
    
       
    } catch (err) {
        res.status(500).send("Update failed" + err.message);
    }
});

//User Delete API from the database
app.delete("/user", async(req,res)=> {

    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
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


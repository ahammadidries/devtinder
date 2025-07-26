const express = require('express');
const connectDB = require("./config/database.js");
const User = require('./models/user');
const app = express();

app.post("/signup", async (req, res)=>{
        const user = new User( {
        firstName : "Ahammad Idries" , 
        lastName: "I",
        emailId :"ahammadidries01@gmail.com"
    });
    
        await user.save();

    res.send("User data sended successfully");
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


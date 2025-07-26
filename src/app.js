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


connectDB()
    .then(()=> {
        console.log("Database connection established....")
        app.listen(3000,() => {
            console.log("Server is running");
    });
    }).catch(err=> {
        console.log("Data cannot be connected!!")
    })


const mongoose = require('mongoose');


const connectDB = async ()=> {
    await mongoose.connect(
        "mongodb+srv://idries:qfM2EQ2g4ySOCvAM@devtinder.klhgkw2.mongodb.net/DevTinder"
    );
};


module.exports = connectDB;
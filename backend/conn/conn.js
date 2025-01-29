const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to database");
    } catch (error) {
        console.log("Server not found");
    }
};

// Export the function
module.exports = connectDB;
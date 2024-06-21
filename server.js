const path = require("path");
const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Load environment variables from .env file
const envPath = path.join(__dirname, "config", "config.env");
const result = require("dotenv").config({ path: envPath });

if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Dotenv configuration loaded:", result.parsed);
}

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});

//Config

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "backend/config/config.env"});
}

// Connect to database
connectDatabase();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

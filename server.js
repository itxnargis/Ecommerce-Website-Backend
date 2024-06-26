const path = require("path");
const app = require("./app");
const cloudinary = require("cloudinary").v2; // Ensure correct import
const connectDatabase = require("./config/database");
// Load environment variables
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

// Connect to database
connectDatabase();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});

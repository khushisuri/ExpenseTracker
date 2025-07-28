require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const DbConnect = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const iroutes = require("./routes/incomeRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const app =  express()

app.use(cors({
    origin:process.env.CLIENT_URL || "*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json());

DbConnect();
//This line mounts the authRoutes router in your Express app, so all routes defined inside it will be prefixed with /api/v1/auth
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/income",iroutes)
app.use("/api/v1/expense",expenseRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)

/*express.static(...) serves static files (like images, PDFs, etc.).

path.join(__dirname, "uploads") points to the physical uploads folder in your project directory.

app.use("/uploads", ...) tells Express to serve files from that folder when a client accesses /uploads/....
*/

//this middelware uploads the file to upload folder 
// and the route handler function returns the image url to the file uploaded to the server folder
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`app running on port ${PORT}`))
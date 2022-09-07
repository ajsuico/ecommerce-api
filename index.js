const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Routes
app.use("/users", userRoutes);
app.use("/products", userRoutes);
app.use("/orders", userRoutes);
app.use("/cart", userRoutes);

// Port
const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log(`API is now online on port ${port}`);
})
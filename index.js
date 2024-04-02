const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT  = process.env.PORT || 5000
dotenv.config();


const cors = require("cors")
const rateLimit = require("express-rate-limit");
const User = require("./models/UserPage");
const  products  = require("./products");
const app = express();

// Adding Limit User to not spam
const limiter = rateLimit({
  windowMs : 2000,
  max: 20
})



mongoose.connect(process.env.MONGO_URL,)
    .then(async () => {
        // Check if the collection is empty
        const count = await User.countDocuments();
        if (count === 0) {
            // Insert sample data
            await User.insertMany(products);
            console.log('Sample data inserted into the collection.');
        } else {
            console.log('Collection is not empty. No need to insert data.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });




app.use(limiter);
app.use(cors());
app.use(express.json())
app.use('/api' , require('./routes/userRoutes') )
// app.use("/api/products" , productRoute);




app.listen( PORT , () => {
  console.log("Backend Server Is Running!")
})
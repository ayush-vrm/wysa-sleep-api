const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const sleepRoutes = require("./routes/sleepAssessment");

const app = express();

connectDB();

const dotenv = require("dotenv");

dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sleep', sleepRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

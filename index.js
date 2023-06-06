const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // for securing response/request headers
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // for logging requests
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// MongoDB connect
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then((res) => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    })

    
// Routes
const authRoute = require("./routes/auth");
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

// Auth
app.use('/api/auth', authRoute);

app.listen(8000, () => {
    console.log('Server running at port 8000');
})

app.use(errorMiddleware);
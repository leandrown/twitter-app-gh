const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose'); require('dotenv').config();

const app = express();
const PORT = 3333;

mongoose.connect(process.env.DB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}, () => console.log('Connected to the database!'));

app.get('/', (req, res) => {
   res.send('Hello world! Mandrillus Team!');
});

app.use(morgan('common'));
app.use(cors({
   origin: 'http://localhost:3000'
}));

app.use((error, req, res, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   res.statusCode = statusCode;
   res.json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? 'OK' : error.stack
   });
});

app.use((req, res, next) => {
   const error = new Error(`Not found - ${req.originalUrl}`);
   res.status(404);
   next(error);
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

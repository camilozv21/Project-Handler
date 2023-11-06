const express = require('express');
const cors = require('cors');
const colors = require('colors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = process.env.PORT || 5000;
const connectDB = require('./database/config/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./database/schema/schema');

const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(cookieParser());
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server is running on port ${port}`.blue.bold));

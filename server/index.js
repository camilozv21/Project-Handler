const express = require("express");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 5000;
const connectDB = require("./database/config/db");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./database/schema/schema");
const { validateToken } = require("./middleware/auth");
const multer = require("multer");

const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(cors());
app.use(validateToken);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(
  "/graphql",
  upload.single("image"), 
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server is running on port ${port}`.blue.bold));

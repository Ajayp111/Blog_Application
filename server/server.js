const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const Post = require("./models/Post");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// api

app.use("/api", authRouter);
app.use("/api/posts", postRouter);

//MongoDB connection
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});

app.all("*", notFoundMiddleware);
app.use(errorMiddleware);
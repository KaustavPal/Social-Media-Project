const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const postsRoutes = require("./routes/posts");
//const commentsRoutes = require("./routes/comments");

const sequelize = require("./util/database");
const Posts = require("./models/posts");
const Comments = require("./models/comments");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/socialmedia", postsRoutes);
//app.use(commentsRoutes);

Comments.belongsTo(Posts, { constraints: true, onDelete: "CASCADE" });
Posts.hasMany(Comments);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

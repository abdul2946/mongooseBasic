const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//? MongoDB connection
mongoose.connect(
  "mongodb+srv://root:tY0ZBW86oVmTaCDS@cluster0.pg9op.mongodb.net/wikiDB?retryWrites=true&w=majority"
);

//? Creating Mongoose Schema and Model
const articleSchema = {
  title: String,
  content: String,
};
const Ariticle = mongoose.model("Article", articleSchema);

//? Route for all documents
app
  .route("/articles")
  // Fetching Data //*GET request
  .get((req, res) => {
    Ariticle.find()
      .then((article) => {
        res.send(article);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  // Uploading Data //* POST request
  .post((req, res) => {
    const article = new Ariticle({
      title: req.body.title,
      content: req.body.content,
    });
    article.save();
    res.send(article);
  })
  // Deleting all Data //* Delete request
  .delete((req, res) => {
    Ariticle.deleteMany()
      .then(() => {
        res.send("Deleted All article Successfully!");
      })
      .catch((err) => {
        res.send(err);
      });
  });

//? Route for a singel document
app
  .route("/articles/:articletitle")
  .get((req, res) => {
    Ariticle.findOne({ title: req.params.articletitle })
      .then((article) => {
        res.send(article);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put((req, res) => {
    Ariticle.replaceOne(
      { title: req.params.articletitle },
      {
        title: req.body.title,
        content: req.body.content,
      }
    )
      .then(() => {
        res.send("Replaced Successfully!");
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .patch((req, res) => {
    Ariticle.updateOne(
      { title: req.params.articletitle },
      {
        title: req.body.title,
        content: req.body.content,
      }
    )
      .then(() => {
        res.send("Updated Successfully!");
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .delete((req, res) => {
    Ariticle.deleteOne({ title: req.params.articletitle })
      .then(() => {
        res.send("Deleted an article successfully!");
      })
      .catch((err) => {
        res.send(err);
      });
  });

// App server Port
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

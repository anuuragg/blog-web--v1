const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Heyyy! Busy rn ttyl.";
// const aboutContent = "Nothing much! just find me here https://github.com/anuuraagg";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render(__dirname + "/views/home.ejs", {
    StartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res){
  // res.render(__dirname + "/views/about.ejs", {about: aboutContent});
  res.render(__dirname + "/views/about.ejs");
});

app.get("/contact", function(req, res){
  res.render(__dirname + "/views/contact.ejs", {contact: contactContent});
});

app.get("/compose", function(req, res){
  res.render(__dirname + "/views/compose.ejs");
});

app.post("/compose", function(req, res){
  var post = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(post);
  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

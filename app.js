// this code to control website
const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
// lesson 11.2 hard one
app.use(express.urlencoded({ extended: true }));



// 
// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

// mondodb
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://karimatif33:Karim010@ak.vmcunh8.mongodb.net/all-data?retryWrites=true&w=majority")
  .then((result) => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const connectLivereload = require("connect-livereload");
const Article = require("./models/articleSchema");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
// end



// get data from mongodb

app.get("/all-articles", (req, res) => {
  


  Article
  .find()
  .then ((result) => { 
    res.render("index", { mytitle: "Home", arrArticle: result});

  
})
  .catch((err) => {
    console.log(err);
  })
  


});


















// send data from mongodb

app.post('/all-articles', (req, res) => {
  const Articlepost = new Article(req.body);

  

  Articlepost
  .save()
  .then ((result) => { res.redirect("/all-articles");})
    .catch((err) => {
      console.log(err);
    })
 
  
}); 

// get data from mongodb by id

app.get("/article/:id", (req, res) => {

  Article
  .findById(req.params.id)
  .then ((result) => { 
    res.render("article-details", { mytitle :"Article Details", objArticle: result});

    // console.log(result);

})
  .catch((err) => {
    console.log(err);
  })


});
  

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", { mytitle :"create new article"});
});
app.get("/", (req, res) => {
  res.redirect("/all-articles");
});
app.get("/new-article", (req, res) => {
  res.redirect("/all-articles");
});





app.delete("/article/:id", (req, res) => {
 
  Article.findByIdAndDelete(req.params.id)
  
  .then((params)=> {
    res.json( {mylink: "/"} );
  })

   .catch( (err) => {
     console.log(err) });
 
  

 
 
 })
 


  // console.log(req.body)
// const arra =[  {MyFirstname:"karim"}   , {MyLastname:"atif"}  , {MyAge:23} , {ImFrom:"Egypt"} , {TryToLearnPrograming:"karim"}         ] 
  


// arra.forEach(currentItem => {
//   console.log(currentItem.MyLastname)
// });




404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
require("./models/db");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const Todo = mongoose.model("Todo");

const app = express();
const port = process.env.PORT|| 3000;

//public path setup
publicDirectoryPath = path.join(__dirname, 'public')
app.use(express.static(publicDirectoryPath))



//hbs setup
app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render('index',{
    titlei:'Add-Todo'
  })
});


app.post("/", (req, res) => {
  console.log("dddddddddddddddddddddddddddddddddd");
  if(req.body._id == "")
      insertRecord(req, res);
  else
      updateRecord(req,res)
});


function insertRecord(req, res) {
  const todo = new Todo();
  todo.title = req.body.title;
  todo.body = req.body.body;
  todo.save((err, doc) => {
    if (!err) {
      console.log("insideeeee");
      console.log(req.body.title, req.body.body);
      res.redirect("/list");
    } else {
      console.log("Error", +err);
    }
  });
}


function updateRecord(req, res) {
    Todo.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err,docs)=>{
        if(!err){
            res.redirect('/list')
        }else{
            console.log('noooooooooooo');
            
        }
    })

}



//to fetch data form database and render in list
app.get("/list", (req, res) => {
  Todo.find((err, doc) => {
    if (!err) {
      console.log("indise LIST");

      res.render("list", {
        title3: "Data",
        list: doc
      });
    } else {
      console.log("Erroooor");
    }
  });
});




//to update
app.get('/:id', (req, res) => {
    console.log('hellooooooooo');
    
    Todo.findById(req.params.id, (err, docs) => {
        if (!err) {

            res.render("index", {
                titlei: "Update Todo",
                id:docs._id,
                title: docs.title,
                body: docs.body,
            });
        }
        

    });
});





//delete
app.get('/delete/:id', (req,res)=>{
  Todo.findByIdAndRemove(req.params.id,(err,docs)=>{
      console.log(req.params.id);
      
      if(!err){
       res.redirect('/list');
      }else{
          console.log("Error in Employee deletion", + err);
          
      }
  })  
})




app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});

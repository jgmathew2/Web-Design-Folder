const express = require("express"); 

const app = express(); 

const path = require("path"); 



app.set('view engine', 'ejs'); // Sets view engine to EJS

app.set('views', path.join(__dirname, "/views"));
 // Calibrates view folder so its set to directory under project, instead of working directory. 


app.use(express.static("static"));
//Connects index.js to JS/CSS files in static file. 


app.listen(3000, () => {
    console.log("TESTING..."); 

});

app.get("/", (req, res) => {
    console.log("Requesting..."); 
    
    res.send("Hi There"); 
    


    //If you send an object, will send in form of JSON
})

app.get("/:task", (req, res) => {

    res.render("home.ejs", {task: req.params.task, date: req.query.date}); 

    res.send("Your task is: " + req.params.task + ". The due date is " + req.query.date); 

});


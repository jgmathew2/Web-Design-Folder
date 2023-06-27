const express = require("express"); 
const app = express(); 


// Allows the front end to access backEnd, not exactly sure why this is necessary, 
// but found it on stackoverflow
const cors = require('cors');

app.use(cors()); 

const path = require("path"); 

const fsProm = require("fs/promises"); 

const fs = require("fs"); 

const txtPath = path.join(__dirname, "/data.txt"); 



app.set('view engine', 'ejs'); // Sets view engine to EJS

app.set('views', path.join(__dirname, "/views"));
 // Calibrates view folder so its set to directory under project, instead of working directory. 


app.use(express.static("static"));
//Connects index.js to JS/CSS files in static file. 

app.use(express.json()); 

app.listen(8080, () => {

});

app.get("/", async (req, res) => {
    // This will give the front-end all object information
    // Reads all tasks from the file
 
    
    // Have to use sync version, async didn't work for sm reason,
    //should debug/ask Mummy
    let data = fs.readFileSync(txtPath, 'utf8', {flag: 'r'}); 

    res.send(data); 

}); 

app.post("/", async (req, res) => {

    // Should make new file/overwrite original data in the file. 
    await fsProm.writeFile(txtPath, "", {flag: 'w+'}); 

    res.send("File Overwritten!")

})

app.post("/new", async (req, res) => {

    let date = req.body.date; 
    let task = req.body.task; 
    let completed = req.body.completed; 
    let additional = req.body.additional; 

    //Gets initial info from user, updates the file

    await fsProm.appendFile(txtPath,  
        JSON.stringify( {date: date, task:task, completed:completed, 
            additional: additional}) + "\n"); 

    res.send("Task Added!"); 

    
}); 



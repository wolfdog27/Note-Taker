const express = require("express");
const path = require("path");
const fs = require("fs");
const DB = require("./db/DB");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

});


app.get("/api/notes", async (req, res) => {
    let availableNotes;
    try{
        availableNotes = await DB.readNotes();
    } catch(e) {
        console.log(e);
    }
    res.json(availableNotes);
});

app.post("/api/notes", async (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() * 900)
    const availableNotes = await DB.readNotes();
    await DB.writeNotes([newNote, ...availableNotes]);
    res.json(newNote);
    console.log(newNote)
});

app.delete("/api/notes/:id", async(req,res)=>{
const noteId = req.params.id
console.log(noteId);
const availableNotes = await DB.readNotes();
await DB.deleteNotes(availableNotes, noteId)
res.json();

})

// const newNote = req.body;
// const availableNotes = await DB.readNotes();
// const notesLeft = availableNotes.filter(newNote => newNote.id !== noteId) ???  I got lost with the learning assistant





app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});  
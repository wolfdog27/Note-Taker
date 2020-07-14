const util = require("util");
const fs = require("fs");
const notesData = "./db/db.json"

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    async readNotes() {
        try {
            const notesRaw = await readFileAsync(notesData, "utf8")
            return notesRaw ? JSON.parse(notesRaw) : []
        } catch (e) {
            console.log("Something went wront while READING notes", e)
        }
    }

    async writeNotes(notesArr) {
        try {
            await writeFileAsync(notesData, JSON.stringify(notesArr))
        } catch (e) {
            console.log("Something went wrong while WRITING notes", e);
        }
    }

    async deleteNotes(availableNotes, noteID) {
        console.log('note',noteID);
        try {
            const filteredNotes = availableNotes.filter(note => note.id !== parseInt(noteID))
            console.log('filtered', filteredNotes);
            await writeFileAsync(notesData, JSON.stringify(filteredNotes))
        } catch (e) {
            console.log("Something went wrong while DELETING notes")
        }
    }
}

// delete note should read the db.json first, then find the note that has the id that we got from the front end, delete that from the Data, and rewrite db.json

// testDB = new DB();
// testDB.writeNotes({
//     title: "It worked",
//     test: "WOW!  Thanks dennis!"
// })

module.exports = new DB();
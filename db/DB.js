const util = require("util");
const fs = require("fs");
const notesData = "./db.json"

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DB {
    async readNotes() {
        try {
            const notesRaw = await readFileAsync(notesData, "utf8")
            return notesRaw ? JSON.parse(notesRaw) : []
        } catch (err) {
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
}

// testDB = new DB();
// testDB.writeNotes({
//     title: "It worked",
//     test: "WOW!  Thanks dennis!"
// })

module.exports = new DB();
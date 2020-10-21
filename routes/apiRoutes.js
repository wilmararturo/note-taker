const fs = require("fs");
const path = require("path");
// const json = require("json")

const dbFile = path.join(__dirname, "../db/db.json");

const readDBFile = (dbFile) => {
    try {
        const data = fs.readFileSync(dbFile, "utf8");
        return JSON.parse(data);
    } catch (e) {
        throw e;
    }
}

const updateDBFile = (dbFile, data) => {
    try {
        const result = fs.writeFileSync(dbFile, data);
        return result;
    } catch (e) {
        throw e;
    }

}

module.exports = function (app) {
    app.get("/api/notes", (req, res) => {
        const notesJSON = readDBFile(dbFile);
        console.log(notesJSON);
        res.json(notesJSON);
    });

    app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        const notesJSON = readDBFile(dbFile);
        notesJSON.push(newNote);
        updateDBFile(dbFile, JSON.stringify(notesJSON));
        res.json(newNote);
    });

    app.delete("/api/notes/:id", (req, res) => {
        const delNote = req.body;
        const delNoteId = req.params.id;
        const notesJSON = readDBFile(dbFile);
        notesJSON.splice(delNoteId, 1);
        updateDBFile(dbFile, JSON.stringify(notesJSON));
        res.json(notesJSON);
    })


}


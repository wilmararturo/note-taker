const fs = require("fs").promises;
const path = require("path");
const express = require('express');
const compression = require('compression');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.json())

const PORT = process.env.PORT || 3000;

//routes
const apiRoutes = require("./routes/apiRoutes")(app);
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
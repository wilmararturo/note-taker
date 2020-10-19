const fs = require("fs").promises;
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(express.json())

const PORT = 3000;
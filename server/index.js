const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}))
// Setting the EJS for template rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (_req, res) => {
    res.render('index', { message: 'Error message' });
})

app.listen(PORT, () => {
    console.log("Server running");
})
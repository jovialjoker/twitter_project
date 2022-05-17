const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}))
// Setting the EJS for template rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (_req, res) => {
    fs.readFile(path.join(path.dirname(__dirname), 'server', 'mock_data', 'postari.json'), 'utf8', ((err, data) => {
        if (err) {
            return res.render('index', {message: 'Posts are not available'})
        }
        data = JSON.parse(data);
        return res.render('index', {postari: data});
    }));
})

app.post('/', (req, res) => {
    const fisier = fs.readFileSync(path.join(path.dirname(__dirname), 'server', 'mock_data', 'postari.json'));
    const postari = JSON.parse(fisier);
    postari.push(req.body);
    const postariNoi = JSON.stringify(postari);
    fs.writeFileSync(path.join(path.dirname(__dirname), 'server', 'mock_data', 'postari.json'), postariNoi, err => {
        if(err) {
            console.log(err);
        }
    })
})

app.get('/login', (_req, res) => {
    fs.readFile(path.join(path.dirname(__dirname), 'server', 'mock_data', 'users.json'), 'utf8', ((err, data) => {
        if (err) {
            return res.render('login', {message: 'Posts are not available'})
        }
        data = JSON.parse(data);
        return res.render('login', {users: data});
    }));
})

app.get('/register', (_req, res) => {
    fs.readFile(path.join(path.dirname(__dirname), 'server', 'mock_data', 'users.json'), 'utf8', ((err, data) => {
        if (err) { 
            return res.render('register', {message: 'Posts are not available'})
        }
        data = JSON.parse(data);
        return res.render('register', {users: data});
    }));
})

app.post('/register', (req, res) => {
    const fisier = fs.readFileSync(path.join(path.dirname(__dirname), 'server', 'mock_data', 'users.json'));
    const users = JSON.parse(fisier);
    users.push(req.body);
    const new_users = JSON.stringify(users);
    fs.writeFileSync(path.join(path.dirname(__dirname), 'server', 'mock_data', 'users.json'), new_users, err => {
        if(err) {
            console.log(err);
        }
    });
})

app.listen(PORT, () => {
    console.log("Server running");
})
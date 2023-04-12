const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    console.log(`${req.method} request received`)
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});


app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request received`)
    
    res.status(200).json(notes);
    return;
});

app.post('/api/notes', (req, res) => {

    console.log(`${req.method} request received`)
try{
    const { title, text } = req.body;
        const newNote = {title, text};
        fs.readFileSync('./db/db.json', 'utf8', { encoding: 'utf8' });
        const data = fs.readFileSync('./db/db.json', 'utf8', { encoding: 'utf8' });
        
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(parsedNotes, null, 4));
        
        res.send(parsedNotes);
        console.log(parsedNotes);
        return;
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// app.delete('/api/notes/:title', (req, res) => {
//     console.log(`${req.method} request received`)
//     try{
// const reqId = req.params.title;
// notes.findByPk(reqId)
// res.send(notes);}
// catch (err) {
//     console.log(err);
//     res.status(500).json(err);
// }});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () =>
    console.log('Success Get'));
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
    res.json(notes)
});

app.post('/api/notes', (req, res) => {

    console.log(`${req.method} request received`)

    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
                parsedNotes.push(newNote);

                // Write updated reviews back to the file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Successfully updated notes!')
                );
            }
        });
        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
    } else { res.status(500).json('error in posting note'); }
});

// app.delete('/api/notes/:id', (req, res) => {
//     console.log(`${req.method} request received`)
// const reqId = req.params.id;

// });
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () =>
    console.log('Success Get'));
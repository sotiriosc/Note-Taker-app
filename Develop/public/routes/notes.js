const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  const { title, text, note_id} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding Note');
  }
});


notes.delete('/notes/:id', (req, res) => {
    const id = req.params.id * 1;
    const noteToDelete = notesArray.find(el => el.id === id);
    const index = notesArray.indexOf(noteToDelete);

    notesArray.splice(index, 1);

    readAndAppend(notesArray, './db/db.json');
    res.json(`Note added successfully 🚀`);
//   } else {
//     res.error('Error in adding Note'),
});

module.exports = notes;
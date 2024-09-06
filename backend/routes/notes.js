const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');

// load schema
require('../models/notes');
const Note = mongoose.model('notes');

// Create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
      // Get random cat fact
      const catFactResponse = await axios.get('https://catfact.ninja/fact');
      const catfact = catFactResponse.data.fact;

      // Create a new note
      const newNote = new Note({
          title,
          content,
          catfact
      });
      await newNote.save();
      res.status(201).json(newNote);
  } catch (error) {
    console.log(error)
      res.status(500).json({ error: 'Error creating note' });
  }
});

// Retrieve all notes with their cat facts
router.get('/', async (req, res) => {
  const { q = "" } = req.query;
  console.log(q)
  try {
      const notes = await Note.find({
        $or: [
            { content: { $regex: q, $options: 'i' } },
            { title: { $regex: q, $options: 'i' } }
        ]
    }).sort({ createdAt: -1 });
      res.status(200).json(notes);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching notes' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedNote = await Note.findByIdAndDelete(id);

      if (!deletedNote) {
          return res.status(404).json({ message: 'Note not found' });
      }

      res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
      res.status(500).json({ error: 'Error deleting note' });
  }
});

module.exports = router;

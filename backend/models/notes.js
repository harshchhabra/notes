const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const NotesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    catfact: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

mongoose.model("notes", NotesSchema);

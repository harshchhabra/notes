const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors())

const notes = require("./routes/notes")

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use('/notes', notes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

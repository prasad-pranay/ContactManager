const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Contact = require('./model/Contact');

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());

require('./db'); // MongoDB connection

//  add contact here
app.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact saved!', contact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// fetch contacts here
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE contact
app.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// export contacts here
app.get("/export", async (req, res) => {
  const contacts = await Contact.find()
    .select("-_id -__v -createdAt -updatedAt")
    .lean();

  res.setHeader("Content-Disposition", "attachment; filename=contacts.json");
  res.setHeader("Content-Type", "application/json");

  res.send(JSON.stringify(contacts, null, 2));
});

app.listen(5000, () => console.log('Server running on port 5000'));

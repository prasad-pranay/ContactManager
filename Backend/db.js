const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cureasepranay:contact@cluster0.67tgjgn.mongodb.net/contactApp?retryWrites=true&w=majority')
// mongoose.connect('mongodb://127.0.0.1:27017/contactApp')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

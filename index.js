const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const shortLinks = require('./app/shortLink');

const app = express();

app.use(cors());
app.use(express.json());

const init = async () => {
  await mongoose.connect('mongodb://localhost/shortLinks', {useUnifiedTopology: true, useNewUrlParser: true});

  app.use('/', shortLinks);

    app.listen(8000, () => {
        console.log('Server started on 8000 port');
    });
};

init().catch(e => console.error(e));
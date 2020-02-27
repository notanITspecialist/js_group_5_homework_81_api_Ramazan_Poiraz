const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shortLinkSchema = new Schema({
    shortUrl: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    }
});

const ShortLinks = mongoose.model('shortLink', shortLinkSchema);

module.exports = ShortLinks;
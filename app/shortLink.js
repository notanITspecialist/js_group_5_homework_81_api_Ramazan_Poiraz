const express = require('express');
const ShortLink = require('../models/ShortLink');

const nanoid = require('nanoid');

const router = express.Router();

const coincidence = async () => {
    const shortUrl = nanoid(7);

    const check = await ShortLink.find({shortUrl: shortUrl});

    if(check[0]){
        return coincidence()
    } else {
        return shortUrl
    }
};

router.post('/', async (req, res) => {
    try{
        req.body.shortUrl = await coincidence();

        const shortLink = new ShortLink(req.body);

        await shortLink.save();

        res.send({shortUrl: 'http://localhost:8000/' + shortLink.shortUrl})
    } catch (e) {
        res.status(404).send(e);
    }
});

router.get('/:shortUrl', async (req, res) => {
    try {
        const data = await ShortLink.find({shortUrl: req.params.shortUrl});

        res.status(303).redirect(data[0].originalUrl);
    } catch (e) {
        res.status(404).send({error: 'Redirect dont possible'});
    }
});

module.exports = router;
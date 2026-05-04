const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');

router.get('/', cryptoController.getAllCryptos);
router.get('/gainers', cryptoController.getTopGainers);
router.get('/new', cryptoController.getNewListings);
router.post('/', cryptoController.addCrypto);

module.exports = router;
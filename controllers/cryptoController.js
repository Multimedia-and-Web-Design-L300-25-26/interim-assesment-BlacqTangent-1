const Crypto = require('../models/Crypto');

exports.getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 }).limit(10);
    res.json(gainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNewListings = async (req, res) => {
  try {
    const newCryptos = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.json(newCryptos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;
    const crypto = new Crypto({ name, symbol, price, image, change24h });
    await crypto.save();
    res.status(201).json({ message: 'Cryptocurrency added successfully', crypto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
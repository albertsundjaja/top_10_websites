const express = require('express');
const router = express.Router();

const websiteHandler = require('../controllers/websiteController');

router.get('/list', websiteHandler.getList);
router.get('/item/:id', websiteHandler.getItem);
router.get('/search', websiteHandler.searchItem);
router.get('/similar', websiteHandler.getSimilarItem);

module.exports = router;
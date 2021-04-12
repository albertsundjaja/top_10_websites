const express = require('express');
const router = express.Router();

const websiteHandler = require('../handler/websiteHandler');

router.get('/list', websiteHandler.getList);
router.get('/item/:id', websiteHandler.getItem);

module.exports = router;
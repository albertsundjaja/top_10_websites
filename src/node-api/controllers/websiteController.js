const websiteService = require('../services/websiteService');

/**
 * Get list of top 10 websites 
 * GET /list
 */
exports.getList = (req, res) => {
    let items = websiteService.getTop10List();
    res.json({items});
}

/**
 * Get specific item detail
 * GET /item/:id
 */
exports.getItem = (req, res) => {
    let itemId = req.params.id;
    if (!itemId) {
        res.status(400).send({"error": "need item id"})
        return;
    }
    let item = websiteService.getItemDetail(itemId);
    res.json({item});
}
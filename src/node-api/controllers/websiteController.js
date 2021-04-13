const websiteService = require('../services/websiteService');

/**
 * Get list of top 10 websites 
 * GET /list
 */
exports.getList = async (req, res) => {
    const items = await websiteService.getTop10List();
    res.json({items});
}

/**
 * Get specific item detail
 * GET /item/:id
 */
exports.getItem = async (req, res) => {
    const itemId = req.params.id;
    if (!itemId) {
        res.status(400).send({"error": "need item id"})
        return;
    }
    const item = await websiteService.getItemDetail(itemId);
    res.json({item});
}

/**
 * Search for items that match keyword
 * GET /search?keyword=
 */
exports.searchItem = async (req, res) => {
    const keyword = req.query.keyword;
    if (!keyword) {
        res.status(400).send({"error": "please input keyword"})
        return;
    }
    const items = await websiteService.searchItem(keyword);
    res.json({items})
}
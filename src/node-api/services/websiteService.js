const websiteModel = require('../models/website');

const getTop10List = async () => {
    // TODO: currently since the db only contains 10 items, 
    // we take the shortcut to just truncate the items if there's more than 10
    let items = await websiteModel.getAllItems();
    if (items.length > 10) {
        items = items.slice(0, 10);
    }
    return items;
}

const getItemDetail = async (id) => {
    return await websiteModel.getItem(id);
}

const searchItem = async (keyword) => {
    return await websiteModel.searchItem(keyword);
}

module.exports = {
    getTop10List,
    getItemDetail,
    searchItem
}
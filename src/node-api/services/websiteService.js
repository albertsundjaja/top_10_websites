const websiteModel = require('../models/website');

const getTop10List = async () => {
    return await websiteModel.getAllItems();
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
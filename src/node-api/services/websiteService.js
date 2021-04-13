const websiteModel = require('../models/website');

const getTop10List = async () => {
    return await websiteModel.getAllItems();
}

const getItemDetail = async (id) => {
    return await websiteModel.getItem(id)
}

module.exports = {
    getTop10List,
    getItemDetail
}
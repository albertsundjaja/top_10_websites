const websiteModel = require('../models/website');

const getTop10List = () => {
    return websiteModel.getAllItems();
}

const getItemDetail = (id) => {
    return websiteModel.getItem(id)
}

module.exports = {
    getTop10List,
    getItemDetail
}
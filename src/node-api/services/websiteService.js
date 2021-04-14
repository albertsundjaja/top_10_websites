const websiteModel = require('../models/website');
const websiteUtils = require('./utils/websiteUtils');

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

/**
 * Find 6 similar items (including the base item) based on item description from the database using ts_vector comparison
 * then calculate the Jaccard Index of each of the item tags
 * @param {number} id the id of the base item that we want to find similar items to
 * @return {object} up to 3 items that are most similar to the one given 
 */
const findSimilarItems = async (id) => {
    const baseItem = await websiteModel.getItem(id);
    // find potentially similar item by checking if their description are similar
    let potentialSimilar = await websiteModel.getSixSimilarItemDesc(baseItem.description);
    // remove baseItem
    potentialSimilar = potentialSimilar.filter((item) => {
        return item.id != baseItem.id;
    })

    // calculate Jaccard Index for each item
    potentialSimilar.forEach((item) => {
        item.jaccardScore = websiteUtils.calculateJaccardIdx(item.tags, baseItem.tags);
    })

    // sort DESC based on Jaccard Index
    potentialSimilar.sort((a, b) => (a.jaccardScore < b.jaccardScore ? 1 : -1));
    
    // return only top 3
    if (potentialSimilar.length < 3) {
        return potentialSimilar;
    } else {
        return potentialSimilar.slice(0, 3);
    }
}



module.exports = {
    getTop10List,
    getItemDetail,
    searchItem,
    findSimilarItems
}
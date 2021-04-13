const db = require('../db/db');

// serialize item into a JSON format accepted by the Vue app
const itemSerializer = (item) => {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        asset: {
            type: item.asset_type,
            url: item.asset_url
        }
    };
}

const getAllItems = async () => {
    const { rows } = await db.query("SELECT * FROM websites");
    const items = rows.map((item) => {
        return itemSerializer(item);
    });
    return items;
}

const getItem = async (id) => {
    const { rows } = await db.query("SELECT * FROM websites WHERE id = $1", [id]);
    const item = rows.map((item) => {
        return itemSerializer(item);
    });
    return item[0];
}

const searchItem = async (keyword) => {
    const { rows } = await db.query("SELECT * FROM websites WHERE search_token @@ to_tsquery($1)", [keyword]);
    const items = rows.map((item) => {
        return itemSerializer(item);
    });
    return items;
}

module.exports = {
    getAllItems,
    getItem,
    searchItem
}
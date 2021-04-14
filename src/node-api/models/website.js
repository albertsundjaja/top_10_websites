const db = require('../db/db');

// serialize item into a JSON format that contains full details
const itemSerializer = (item) => {
    return {
        id: item.id,
        title: item.title,
        description: item.description,
        url: item.url,
        asset: {
            type: item.asset_type,
            url: item.asset_url
        },
        tags: item.tags_arr
    };
}

const getAllItems = async () => {
    const { rows } = await db.query("SELECT w.*, jt.tags_arr FROM websites w LEFT JOIN (SELECT wt.website_id, array_agg(t.tag_name) as tags_arr FROM website_tags wt LEFT JOIN tags t ON wt.tag_id = t.id GROUP BY wt.website_id) jt ON w.id = jt.website_id");
    const items = rows.map((item) => {
        return itemSerializer(item);
    });
    return items;
}

const getItem = async (id) => {
    const { rows } = await db.query("SELECT w.*, jt.tags_arr FROM websites w LEFT JOIN (SELECT wt.website_id, array_agg(t.tag_name) as tags_arr FROM website_tags wt LEFT JOIN tags t ON wt.tag_id = t.id GROUP BY wt.website_id) jt ON w.id = jt.website_id WHERE w.id = $1", [id]);
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
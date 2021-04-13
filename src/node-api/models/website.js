const db = require('../db/db');

const dummyItems = [
    {
        "id": 1,
        "title": "ShredAcademy",
        "description": "Free guitar learning resource that have things like lick of the week for some amazing techniques.",
        "asset": {
            type: "youtube",
            url: "https://www.youtube.com/watch?v=5olxYUmumVc&ab_channel=ShredAcademy"
        }
    },
    {
        "id": 2,
        "title": "Justin Guitar",
        "description": "A guitar learning website that includes some free and paid guitar lessons.",
        "asset": {
            type: "image",
            url: "https://jtgt-static.b-cdn.net/images/thumbnails/BGC.gif"
        }
    },

]

const getAllItems = async () => {
    const { rows } = await db.query("SELECT * FROM websites");
    const items = rows.map((item) => {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            asset: {
                type: item.asset_type,
                url: item.asset_url
            }
        }
    });
    return items;
}

const getItem = async (id) => {
    const { rows } = await db.query("SELECT * FROM websites WHERE id = $1", [id]);
    const item = rows.map((item) => {
        return {
            id: item.id,
            title: item.title,
            description: item.description,
            asset: {
                type: item.asset_type,
                url: item.asset_url
            }
        }
    });
    return item[0];
}

module.exports = {
    getAllItems,
    getItem
}
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

const getAllItems = () => {
    return dummyItems;
}

const getItem = (id) => {
    return dummyItems.find((item) => item.id == id)
}

module.exports = {
    getAllItems,
    getItem
}
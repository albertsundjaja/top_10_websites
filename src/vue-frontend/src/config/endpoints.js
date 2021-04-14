const apiHost = process.env.VUE_APP_APIHOST;

// contains endpoints that are available in the API server
export default {
    itemList: `${apiHost}/list`,
    item: `${apiHost}/item`,
    searchItem: `${apiHost}/search`,
    similarItem: `${apiHost}/similar`
}
const {describe, expect, test} = require('@jest/globals');
const websiteModel = require('../models/website');
const websiteMockItems = require('./mocks/websiteItems');
const _ = require('lodash');

const websiteService = require('../services/websiteService');

describe("websiteService.getTop10List", () => {
    test('it should return 10 websites', async () => {
        const mockGetAllItems = jest.spyOn(websiteModel, "getAllItems").mockReturnValue(websiteMockItems);
        const items = await websiteService.getTop10List();
        expect(items.length).toEqual(10);
    })
})

describe("websiteService.getItemDetail", () => {
    test('it should return the item detail with correct properties', async () => {
        const expectedItem = websiteMockItems[0];
        const mockGetItem = jest.spyOn(websiteModel, "getItem").mockReturnValue(expectedItem);
        const queriedItem = await websiteService.getItemDetail(expectedItem.id);
        expect(_.isEqual(queriedItem, queriedItem)).toBe(true);
    })
})

describe("websiteService.searchItem", () => {
    test('it should return the searched item', async () => {
        const expectedItem = websiteMockItems[0];
        const mockGetItem = jest.spyOn(websiteModel, "searchItem").mockReturnValue(expectedItem);
        const queriedItem = await websiteService.searchItem("sometitle");
        expect(_.isEqual(queriedItem, queriedItem)).toBe(true);
    })
})
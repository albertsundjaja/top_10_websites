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

describe("websiteService.findSimilarItems", () => {
    test('it should return 3 most similar items', async () => {
        const baseItem = { id: 1, tags: ["1", "2", "3", "4"] };
        // items with id 2, 3, 4 are most similar
        const sixSimilarItems = [
            { id: 2, tags: ["1", "2", "3", "4"] },
            { id: 3, tags: ["1", "2", "3", "4"] },
            { id: 4, tags: ["1", "2", "3", "4"] },
            { id: 5, tags: ["1", "2"] },
            { id: 7, tags: ["1", "2", "3", "4", "5"] },
            { id: 8, tags: ["1", "2", "3"] },
        ]
        const mockGetItem = jest.spyOn(websiteModel, "getItem").mockReturnValue(baseItem);
        const mockGetSixSimlarItemDesc = jest.spyOn(websiteModel, "getSixSimilarItemDesc").mockReturnValue(sixSimilarItems);

        const expectedItems = sixSimilarItems.slice(0, 3);
        const queriedItems = await websiteService.findSimilarItems(1);

        // sort based on id
        expectedItems.sort((a, b) => a.id > b.id ? 1 : -1);
        queriedItems.sort((a, b) => a.id > b.id ? 1 : -1);

        // compare each item by id sequentially
        let equal = true;
        for (let i = 0; i < expectedItems.length; i++) {
            if (expectedItems[i].id != queriedItems[i].id) {
                equal = false;
                break;
            } 
        }

        expect(equal).toBe(true);
    })

    test('recommended items should not contain the base item', async () => {
        const baseItem = { id: 1, tags: ["1", "2", "3", "4"] };
        // items with id 2, 3, 4 are most similar
        const sixSimilarItems = [
            baseItem,
            { id: 2, tags: ["1", "2", "3", "4"] },
            { id: 3, tags: ["1", "2", "3", "4"] },
            { id: 4, tags: ["1", "2", "3", "4"] },
            { id: 5, tags: ["1", "2"] },
            { id: 7, tags: ["1", "2", "3", "4", "5"] },
        ]
        const mockGetItem = jest.spyOn(websiteModel, "getItem").mockReturnValue(baseItem);
        const mockGetSixSimlarItemDesc = jest.spyOn(websiteModel, "getSixSimilarItemDesc").mockReturnValue(sixSimilarItems);
        const queriedItems = await websiteService.findSimilarItems(1);

        expect(queriedItems.some((item) => item.id == baseItem.id)).toBe(false);
    })
})
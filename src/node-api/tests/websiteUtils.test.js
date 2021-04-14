const {describe, expect, test} = require('@jest/globals');
const websiteUtils = require("../services/utils/websiteUtils");

describe("websiteUtils.calculateJaccardIndex", () => {
    test("it should return 0.5 for Jaccard Index", () => {
        const arr1 = ["1", "2", "3", "4"];
        const arr2 = ["1", "2"];
        const score = websiteUtils.calculateJaccardIdx(arr1, arr2);
        expect(score).toEqual(0.5);
    })

    test("it should return 0 for Jaccard Index", () => {
        const arr1 = ["1", "2", "3", "4"];
        const arr2 = ["5", "6"];
        const score = websiteUtils.calculateJaccardIdx(arr1, arr2);
        expect(score).toEqual(0);
    })

    test("it should return 1 for Jaccard Index", () => {
        const arr1 = ["1", "2"];
        const arr2 = ["1", "2"];
        const score = websiteUtils.calculateJaccardIdx(arr1, arr2);
        expect(score).toEqual(1);
    })
})
/**
 * 
 * @param {array} a array of tags in item A
 * @param {array} b array of tags in item B
 * @returns {number} the score for Jaccard Index between tags of A and B
 */
 const calculateJaccardIdx = (a, b) => {
    let intersection = a.filter((tag) => b.includes(tag));
    let union = [...new Set([...a, ...b])];
    return intersection.length / union.length;
}

module.exports = {
    calculateJaccardIdx
}
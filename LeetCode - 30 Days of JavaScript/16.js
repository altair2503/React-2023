// 2677. Chunk Array

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array[]}
 */
var chunk = function(arr, size) {
    result = []

    for(var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size))
    }

    return result
};
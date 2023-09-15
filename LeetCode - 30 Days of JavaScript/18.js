// 2724. Sort By

/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function(arr, fn) {
    function swap(x, y) {
        return (fn(x) > fn(y)) ? 1 : -1
    }
    return arr.sort(swap)
};
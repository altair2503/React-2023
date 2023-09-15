// 2635. Apply Transform Over Each Element in Array

/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    for(var i = 0; i < arr.length; i++) {
        arr[i] = fn(arr[i], i)
    }
    return arr
};
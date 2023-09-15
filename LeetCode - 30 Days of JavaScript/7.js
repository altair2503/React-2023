// 2626. Array Reduce Transformation

/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function(nums, fn, init) {
    for(var i = 0; i < nums.length; i++) {
        init = fn(init, nums[i])
        // console.log(init)
    }
    return init
};
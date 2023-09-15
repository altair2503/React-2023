// 2703. Return Length of Arguments Passed

/**
 * @return {number}
 */
var argumentsLength = function(...args) {
    // return function() {
    return [...args].length
    // }
};

/**
 * argumentsLength(1, 2, 3); // 3
 */
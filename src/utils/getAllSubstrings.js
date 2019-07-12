const getAllSubstrings = (str, subStrSize = 4) => {
    const result = [];

    for (let i = 0; i <= str.length - subStrSize; i += 1) {
        result.push(str.slice(i, i + subStrSize));
    }
    return result;
};

export default getAllSubstrings;

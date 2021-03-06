export const updateInArray = (array, findFn, updateFn) => {
    const index = array.findIndex(findFn);
    const elem = array.find(findFn);
    const newArray = [...array];
    newArray.splice(index, 1, updateFn(elem));
    return newArray;
};
export const removeFromArray = (array, findFn) => {
    const index = array.findIndex(findFn);
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
}
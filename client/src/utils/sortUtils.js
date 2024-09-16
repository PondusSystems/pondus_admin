const getValue = (obj, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const sortArray = (arr, key, direction) => {
    return arr.sort((a, b) => {
        const aValue = getValue(a, key);
        const bValue = getValue(b, key);

        if (aValue < bValue) {
            return direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
};

export {
    sortArray,
};
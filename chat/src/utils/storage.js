const getFromStorage = (key) => {
    if (!key) {
        return null;
    }
    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    } catch (err) {
        return null;
    }
}

const removeFromStorage = (key) => {
    if (!key) {
        return null;
    }
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(err);
    }
}

const setInStorage = (key, obj) => {
    if (!key) {
        console.error('Error: Key is missing');
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}

module.exports.setInStorage = setInStorage;
module.exports.getFromStorage = getFromStorage;
module.exports.removeFromStorage = removeFromStorage;

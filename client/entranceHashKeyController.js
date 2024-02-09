const getItem = localStorage.getItem;
localStorage.getItem = function (key) {
    if (key === 'entrance_hash_key') {
        console.log(`Использованы данные для входа в ${location.pathname}`);
        arguments[0] = `${location.pathname}_${key}`;
    }
    return getItem.apply(this, arguments);
};

addEventListener('AccountStorageCreated', () => {
    setTimeout(() => {
        console.log(`Данные для входа в ${location.pathname} установлены`);
        localStorage[`${location.pathname}_entrance_hash_key`] =
            localStorage['entrance_hash_key'];
    }, 3000);
});

// memoryStorage.js
let users = [];

// Functions to interact with the in-memory storage
function addUser(user) {
    users.push(user);
}

function findUserByPin(pin) {
    return users.find(user => user.pin === pin);
}

function updateUser(pin, newData) {
    const index = users.findIndex(user => user.pin === pin);
    if (index !== -1) {
        users[index] = { ...users[index], ...newData };
    }
}

function deleteUser(pin) {
    users = users.filter(user => user.pin !== pin);
}

module.exports = { addUser, findUserByPin, updateUser, deleteUser };

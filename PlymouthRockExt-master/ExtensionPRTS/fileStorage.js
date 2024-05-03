// fileStorage.js
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'userStorage.json');

function readData() {
    if (!fs.existsSync(dataPath)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

function addUser(user) {
    const users = readData();
    users.push(user);
    writeData(users);
}

function findUserByPin(pin) {
    const users = readData();
    return users.find(user => user.pin === pin);
}

function updateUser(pin, newData) {
    const users = readData();
    const index = users.findIndex(user => user.pin === pin);
    if (index !== -1) {
        users[index] = { ...users[index], ...newData };
        writeData(users);
    }
}

function deleteUser(pin) {
    let users = readData();
    users = users.filter(user => user.pin !== pin);
    writeData(users);
}

module.exports = { addUser, findUserByPin, updateUser, deleteUser };

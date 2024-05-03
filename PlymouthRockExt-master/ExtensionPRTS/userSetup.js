// usersSetup.js
const { addUser } = require('./fileStorage');

const users = [
    { username: 'Level1User', password: 'password1', pin: '1111', role: 'Level 1' },
    { username: 'Level2User', password: 'password2', pin: '2222', role: 'Level 2' },
    { username: 'Level3User', password: 'password3', pin: '3333', role: 'Level 3' },
    { username: 'ModeratorUser', password: 'passwordModerator', pin: '4444', role: 'Moderator' },
];

users.forEach(user => addUser(user));

console.log('Users created successfully');

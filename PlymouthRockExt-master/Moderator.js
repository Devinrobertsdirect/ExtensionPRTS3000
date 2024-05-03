// moderator.js

async function fetchUsers() {
    const response = await fetch('http://localhost:3000/users/all', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const users = await response.json();
    document.getElementById('userList').innerHTML = users.map(u => `
        <div>
            <span>${u.username}</span> <span>${u.pin}</span> <span>${u.role}</span>
            <button onclick="editUser('${u._id}')">Edit</button>
            <button onclick="deleteUser('${u._id}')">Delete</button>
        </div>
    `).join('');
}
async function editUser(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const user = await response.json();
    document.getElementById('userId').value = user._id;
    document.getElementById('username').value = user.username;
    document.getElementById('pin').value = user.pin;
    document.getElementById('role').value = user.role;
}
async function deleteUser(id) {
    await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    fetchUsers();
}

document.getElementById('userForm').addEventListener('submit', async e => {
    e.preventDefault();
    const user = {
        _id: document.getElementById('userId').value,
        username: document.getElementById('username').value,
        pin: document.getElementById('pin').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value
    };
    await fetch('http://localhost:3000/users/createOrUpdate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user)
    });
    fetchUsers();
});

fetchUsers();

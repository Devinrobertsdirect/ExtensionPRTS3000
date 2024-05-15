// Function to update the display of users
function updateUserTable() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    userTable.innerHTML = '';
    users.forEach(user => {
        let row = userTable.insertRow();
        row.insertCell(0).textContent = user.name || "[Missing Name]";
        row.insertCell(1).textContent = user.pin || "[Missing PIN]";
        row.insertCell(2).textContent = user.role || "[Missing Role]";
        row.insertCell(3).textContent = user.email || "[Missing Email]";
        let deleteCell = row.insertCell(4);
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteUser(user.pin);
        deleteCell.appendChild(deleteBtn);
    });
}


document.getElementById('addEditUserBtn').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const pin = document.getElementById('pin').value;
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;

    if (!name || !pin || !role || !email) {
        alert('All fields are required.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if the PIN already exists
    if (users.some(u => u.pin === pin)) {
        alert('This PIN already exists.');
        return;
    }

    users.push({ name, pin, role, email });  // Add new user
    localStorage.setItem('users', JSON.stringify(users));
    updateUserTable();  // Refresh the displayed list of users

    // Clear form fields after adding
    document.getElementById('name').value = '';
    document.getElementById('pin').value = '';
    document.getElementById('role').value = 'level1.html';
    document.getElementById('email').value = '';
});

function deleteUser(pin) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter(user => user.pin !== pin);
    localStorage.setItem('users', JSON.stringify(users));
    updateUserTable();
}

// Initial display of users
document.addEventListener('DOMContentLoaded', updateUserTable);


// Adding user to local storage
const users = JSON.parse(localStorage.getItem('users') || '[]');
users.push({ name, pin, role, email });  // Add new user
localStorage.setItem('users', JSON.stringify(users));


function updateUserTable() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    userTable.innerHTML = '';  // Clear existing entries
    users.forEach(user => {
        let row = userTable.insertRow();
        row.insertCell(0).textContent = user.name || "[Missing Name]";  // Avoid [object Object]
        row.insertCell(1).textContent = user.pin || "[Missing PIN]";
        row.insertCell(2).textContent = user.role.replace('.html', '') || "[Missing Role]";  // Assuming role includes .html
        row.insertCell(3).textContent = user.email || "[Missing Email]";
        let deleteCell = row.insertCell(4);
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            deleteUser(user.pin);
        });
        deleteCell.appendChild(deleteBtn);

    });
}

// After adding a user
localStorage.setItem('users', JSON.stringify(users));
updateUserTable();  // Refresh the table display
function deleteUser(pin) {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users.filter(user => user.pin !== pin);
    localStorage.setItem('users', JSON.stringify(users));
    updateUserTable();  // Refresh the table
}

// Initialize users if not already present in localStorage
const initialUsers = [
    { name: 'Alice', pin: '1234', role: 'level1.html', email: 'alice@example.com' },
    { name: 'Bob', pin: '2222', role: 'level2.html', email: 'bob@example.com' },
    { name: 'Charlie', pin: '3333', role: 'level3.html', email: 'charlie@example.com' },
    { name: 'Rich', pin: '4444', role: 'moderator.html', email: 'rich@example.com' },
    { name: 'Stephen', pin: '5555', role: 'moderator.html', email: 'stephen@example.com' }
];

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
}

// Function to add user
function addUser(name, pin, role, email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if a user with the same PIN already exists
    const existingUser = users.find(user => user.pin === pin);

    if (existingUser) {
        alert('A user with this PIN already exists. Please use a different PIN.');
        return;
    }

    const newUser = { name, pin, role, email }; // Define the new user
    users.push(newUser); // Add the new user to the users list

    localStorage.setItem('users', JSON.stringify(users));
    renderTable(); // Refresh the table after adding
}

// Function to edit user
function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];
    document.getElementById('name').value = user.name;
    document.getElementById('pin').value = user.pin;
    document.getElementById('role').value = user.role;
    document.getElementById('email').value = user.email || '';
    document.getElementById('addEditUserBtn').dataset.editIndex = index;
}

// Function to update user
function updateUser(index, updatedUser) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users[index] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
    renderTable();
}

// Function to remove a user
function removeUser(pin) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.pin !== pin);
    localStorage.setItem('users', JSON.stringify(users));
    renderTable();
}

// Function to delete a user
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    removeUser(users[index].pin);
}

// Render user table
function renderTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('userTable').querySelector('tbody');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.pin}</td>
            <td>${user.role}</td>
            <td>${user.email || ''}</td>
            <td>
                <button class="editBtn" data-index="${index}">Edit</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Attach click events to the buttons after the rows are generated
    document.querySelectorAll('.editBtn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            editUser(index); // Connects the edit button to the function
        });
    });

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            deleteUser(index); // Connects the delete button to the function
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addEditUserBtn').addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const pin = document.getElementById('pin').value;
        const role = document.getElementById('role').value;
        const email = document.getElementById('email').value;
        const editIndex = this.dataset.editIndex;

        if (editIndex !== undefined) {
            updateUser(editIndex, { name, pin, role, email });
            delete this.dataset.editIndex;
        } else {
            addUser(name, pin, role, email);
        }

        document.getElementById('userForm').reset();
    });

    renderTable();
});


// Call renderTable initially
renderTable();

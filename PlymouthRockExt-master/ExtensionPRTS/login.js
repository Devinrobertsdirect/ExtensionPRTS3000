// Function to authenticate the PIN, show user name, and redirect based on the role
function authenticateAndRedirect(pin) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users:', users); // Log the list of users
    const user = users.find(u => u.pin === pin);
    console.log('Authenticating PIN:', pin, 'User Data:', user); // Log authentication info

    if (user) {
        alert(`Welcome, ${user.name}!`);
        window.location.href = user.page; // Redirect to the corresponding page
    } else {
        console.error('Invalid PIN:', pin); // Log invalid PIN
        alert('Invalid PIN. Please try again.');
    }
}

// Adding event listener to the login button
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const pin = document.getElementById('pinInput').value.trim(); // Retrieve the entered PIN
            authenticateAndRedirect(pin); // Authenticate and redirect based on PIN
        });
    }
});

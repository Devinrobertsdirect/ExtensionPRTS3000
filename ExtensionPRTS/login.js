// Function to authenticate the PIN
function authenticatePIN(pin) {
    // Example PIN for Level 1 reps
    const LEVEL_1_PIN = '1234';  // You should choose a secure PIN

    return pin === LEVEL_1_PIN;  // Returns true if PIN is valid, false otherwise
}

// Adding event listener to the login button
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');

    // Ensure loginBtn exists before adding an event listener
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const pin = document.getElementById('pinInput').value; // Retrieve the entered PIN
            if (authenticatePIN(pin)) {
                // Redirect to Level 1 interface if the PIN is correct
                window.location.href = 'level1.html';
            } else {
                // Notify the user if the PIN is incorrect
                alert('Invalid PIN. Please try again.');
            }
        });
    }
});

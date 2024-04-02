document.getElementById('loginBtn').addEventListener('click', () => {
    const pin = document.getElementById('pinInput').value;
    authenticatePIN(pin, isAuthenticated => {
        if (isAuthenticated) {
            // Redirect to Level 1 interface
            window.location.href = 'level1.html';
        } else {
            alert('Invalid PIN. Please try again.');
        }
    });
});

function authenticatePIN(pin, callback) {
    // Example PIN for Level 1 reps
    const LEVEL_1_PIN = '1234';  // You should choose a secure PIN

    if (pin === LEVEL_1_PIN) {
        callback(true);  // PIN is valid
    } else {
        callback(false);  // Invalid PIN
    }
}

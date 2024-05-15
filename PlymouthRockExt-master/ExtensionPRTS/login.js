document.getElementById('loginBtn').addEventListener('click', function (event) {
    event.preventDefault();

    // Get user input from the PIN input
    const pin = document.getElementById('pinInput').value;

    // Enhanced simple validation
    if (pin.trim() === '') {
        alert('Please enter your PIN');
        return;
    }
    // Initialize default PINs if not already set
    if (!localStorage.getItem('validPins')) {
        const defaultPins = ['1001', '1002', '1003', '1004', '1005', '2001', '2002', '3001', '3002', '4001'];
        localStorage.setItem('validPins', JSON.stringify(defaultPins));
    }

    // Determine redirection based on the first character of the PIN
    const firstChar = pin.charAt(0); // Get the first character of the PIN

    switch (firstChar) {
        case '1': // PIN starts with 1
            window.location.href = 'level1.html';
            break;
        case '2': // PIN starts with 2
            window.location.href = 'level2.html';
            break;
        case '3': // PIN starts with 3
            window.location.href = 'level3.html';
            break;
        case '4': // PIN starts with 4
            window.location.href = 'moderator.html';
            break;
        default:
            alert('Invalid PIN entered. PIN must start with 1, 2, 3, or 4.');
            break;
    }
});

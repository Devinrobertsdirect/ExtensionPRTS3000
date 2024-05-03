async function handleLogin() {
    const pinInput = document.getElementById('pinInput');
    const pin = pinInput.value;

    if (!pin) {
        showError('Please enter your PIN');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin })
        });

        if (!response.ok) {
            const errorData = await response.json();
            showError(errorData.message || 'Invalid PIN. Please try again.');
            return;
        }

        const data = await response.json();
        alert(`Welcome, ${data.username}`);

        // Redirect based on role
        switch (data.role) {
            case 'Level 1':
                window.location.href = 'level1.html';
                break;
            case 'Level 2':
                window.location.href = 'level2.html';
                break;
            case 'Level 3':
                window.location.href = 'level3.html';
                break;
            case 'Moderator':
                window.location.href = 'moderator.html';
                break;
            default:
                showError('Unknown role');
        }
    } catch (error) {
        console.error('Error during login:', error);
        showError('An error occurred. Please try again.');
    }
}

// Event listener for login button
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
});


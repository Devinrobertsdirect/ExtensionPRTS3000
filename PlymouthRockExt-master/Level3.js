document.getElementById('deadBtn').addEventListener('click', () => {
    // Logic for handling a dead call
    backToLevel1(); // Assuming a function to return to Level 1
});

document.addEventListener('DOMContentLoaded', () => {
    const completeBtn = document.getElementById('completeLevel3Btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', () => {
            window.location.href = 'congratulations.html'; // Redirect to the "Congratulations" screen
        });
    }
});

document.getElementById('followUpBtn').addEventListener('click', () => {
    // Show the follow-up form
    document.getElementById('followUpForm').style.display = 'block';
});

document.getElementById('dispoBtn').addEventListener('click', () => {
    const notes = document.getElementById('notes').value;
    // Logic to handle the follow-up disposition, including saving notes
    // Possibly send notification to the admin console with the notes
    backToLevel1(); // Assuming a function to return to Level 1, reset the form as well
    document.getElementById('followUpForm').style.display = 'none';
    document.getElementById('notes').value = ''; // Reset notes textarea
});

function backToLevel1() {
    // Logic to return to Level 1
    // This might involve logging out the current session and/or redirecting to the Level 1 interface
    window.location.href = 'level1.html';
}

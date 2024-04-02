document.getElementById('liveCallBtn').addEventListener('click', () => {
    // Logic for handling a live call, e.g., start a timer
    chrome.runtime.getBackgroundPage(backgroundPage => {
        backgroundPage.startLiveCall(); // Assuming this function exists in background.js
    });
});

document.getElementById('deadCallBtn').addEventListener('click', () => {
    // Logic for handling a dead call, e.g., return to Level 1
    chrome.runtime.getBackgroundPage(backgroundPage => {
        backgroundPage.handleDeadCall(); // Assuming this function exists in background.js
        window.location.href = 'level1.html'; // Redirect back to Level 1 UI
    });
});

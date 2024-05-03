let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    // Set call status to "started" in Chrome storage
    chrome.storage.local.set({ callData: { status: 'started', level: 1 } });
}
document.getElementById('startCallBtn').addEventListener('click', startTimer);
document.getElementById('toLevel2Btn').addEventListener('click', () => {
            // Redirect to Level 2 interface
    window.location.href = 'Level2.html';
});
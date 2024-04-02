document.getElementById('startCallBtn').addEventListener('click', () => {
    chrome.storage.local.set({ callData: { status: 'started', level: 1 } });
});
document.getElementById('toLevel2Btn').addEventListener('click', () => {
            // Redirect to Level 2 interface
            window.location.href = 'Level2.html';
        });
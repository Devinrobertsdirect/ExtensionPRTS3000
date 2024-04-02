document.getElementById('startCallBtn').addEventListener('click', () => {
    chrome.storage.local.set({ callData: { status: 'started', level: 1 } });
});

document.getElementById('pageToBtn').addEventListener('click', () => {
    chrome.storage.local.set({ currentLevel: 2 }); // Signal level change
    chrome.runtime.sendMessage({ type: 'changeLevel', newLevel: 2 });
});

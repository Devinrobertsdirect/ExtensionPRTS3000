document.addEventListener('DOMContentLoaded', function () {
    // Attach event listener to 'Live Call' button
    const liveCallButton = document.getElementById('liveCallBtn');
    if (liveCallButton) {
        liveCallButton.addEventListener('click', function () {
            // Logic for handling a live call, e.g., start a timer
            if (chrome.runtime && chrome.runtime.getBackgroundPage) {
                chrome.runtime.getBackgroundPage(function (backgroundPage) {
                    if (backgroundPage && typeof backgroundPage.startLiveCall === 'function') {
                        backgroundPage.startLiveCall();
                    } else {
                        console.error("startLiveCall function not found in background page.");
                    }
                });
            }
        });
    } else {
        console.error("Live Call button not found.");
    }

    // Attach event listener to 'Dead Call' button
    const deadCallButton = document.getElementById('deadCallBtn');
    if (deadCallButton) {
        deadCallButton.addEventListener('click', function () {
            // Logic for handling a dead call, e.g., return to Level 1
            if (chrome.runtime && chrome.runtime.getBackgroundPage) {
                chrome.runtime.getBackgroundPage(function (backgroundPage) {
                    if (backgroundPage && typeof backgroundPage.handleDeadCall === 'function') {
                        backgroundPage.handleDeadCall();
                        // Ensure to only redirect after the background function is successfully called
                        window.location.href = 'level1.html'; // Redirect back to Level 1 UI
                    } else {
                        console.error("handleDeadCall function not found in background page.");
                    }
                });
            }
        });
    } else {
        console.error("Dead Call button not found.");
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Other event listeners for Level 2...

    // Event listener for the V.O. button to move to Level 3
    const toLevel3Btn = document.getElementById('toLevel3Btn');
    if (toLevel3Btn) {
        toLevel3Btn.addEventListener('click', () => {
            window.location.href = 'Level3.html'; // Redirect to Level 3
        });
    } else {
        console.error("'V.O.' button not found.");
    }
});


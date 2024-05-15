
// Initialize extension state
let extensionState = {
    currentLevel: 1,
    queue: [],
    reps: {}
};
// Listen for messages
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("Received from content script:", request.greeting);
        if (request.greeting === "hello") {
            sendResponse({ farewell: "goodbye" });
        }
        return true; // Keep the message channel open for the response
    });
// Set user level
function updateUserLevel(newLevel) {
    chrome.storage.sync.set({ userLevel: newLevel }, function () {
        console.log('User level updated to: ' + newLevel);
    });
}

// Get user level
function getUserLevel(callback) {
    chrome.storage.sync.get(['userLevel'], function (result) {
        callback(result.userLevel);
    });
}

chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage and any necessary state
    chrome.storage.local.set({ reps: {}, sessions: {}, queue: { level2: [], level3: [] } });
});
switch (message.action) {
    case 'changeLevel':
        handleChangeLevel(message.level);
        break;
    case 'addToQueue':
        handleAddToQueue(message.repId);
        break;
    case 'removeFromQueue':
        handleRemoveFromQueue(message.repId);
        break;
    case 'addRep':
        handleAddRep(message.repDetails);
        break;
    // Add other cases as needed
}
sendResponse({ status: 'success' });
return true; // Indicates an asynchronous response
function authenticatePIN(pin, callback) {
    chrome.storage.local.get('reps', (data) => {
        const rep = Object.values(data.reps).find(rep => rep.pin === pin);
        if (rep) {
            callback(true, rep); // Authenticated
        } else {
            callback(false, null); // Not Authenticated
        }
    });
} function manageSession(rep, action) {
    chrome.storage.local.get('sessions', (data) => {
        const sessions = data.sessions;
        if (action === 'login') {
            sessions[rep.id] = { level: rep.level, station: rep.station };
        } else if (action === 'logout') {
            delete sessions[rep.id];
        }
        chrome.storage.local.set({ sessions });
    });
}
function updateQueue(rep, action) {
    chrome.storage.local.get('queue', (data) => {
        const queue = data.queue;
        const levelQueue = queue[`level${rep.level}`];

        if (action === 'add') {
            levelQueue.push(rep.id);
        } else if (action === 'remove') {
            const index = levelQueue.indexOf(rep.id);
            if (index > -1) {
                levelQueue.splice(index, 1);
            }
        }

        queue[`level${rep.level}`] = levelQueue;
        chrome.storage.local.set({ queue });
    });
}
function sendNotification() {
    chrome.notifications.create('', {
        type: 'basic',
        iconUrl: 'images/icon48.png',
        title: 'Next on Deck',
        message: 'You are next in line. Please be ready.',
        priority: 2
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Message received", message);
        // Handle the message
        sendResponse({ response: "Message received" });
        return true; // Keep the messaging channel open for sendResponse
    });
    chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
        console.log(response.response);
    });
    // Handle changing the level
    function handleChangeLevel(newLevel) {
        extensionState.currentLevel = newLevel;
        // Notify all parts of the extension about the level change
        chrome.runtime.sendMessage({ action: 'levelChanged', level: newLevel });
        console.log(`Level changed to ${newLevel}`);
    }

    // Handle adding a rep to the queue
    function handleAddToQueue(repId) {
        extensionState.queue.push(repId);
        // Update all parts of the extension about the queue change
        chrome.runtime.sendMessage({ action: 'queueUpdated', queue: extensionState.queue });
        console.log(`Rep ${repId} added to queue`);
    }

    // Handle removing a rep from the queue
    function handleRemoveFromQueue(repId) {
        extensionState.queue = extensionState.queue.filter(id => id !== repId);
        // Update all parts of the extension about the queue change
        chrome.runtime.sendMessage({ action: 'queueUpdated', queue: extensionState.queue });
        console.log(`Rep ${repId} removed from queue`);
    }

    // Handle adding a new rep
    function handleAddRep(repDetails) {
        if (extensionState.reps[repDetails.id]) {
            console.error(`Rep with ID ${repDetails.id} already exists`);
            return;
        }
        extensionState.reps[repDetails.id] = repDetails;
        // Optionally, notify parts of the extension about the new rep
        chrome.runtime.sendMessage({ action: 'repAdded', repDetails: repDetails });
        console.log(`Rep added: ${JSON.stringify(repDetails)}`);
    }

    // Example function to signal a rep at the next level (e.g., Level 2)
    function signalNextLevelRep() {
        // Determine the next rep to signal based on your criteria (e.g., round-robin, priority)
        // This is a simplified example that just takes the first rep in the queue
        const nextRepId = extensionState.queue.shift();
        if (nextRepId) {
            // Send a message to the specific rep's content script or popup
            // You might need additional logic to identify the correct tab/window
            chrome.runtime.sendMessage({ action: 'signalRep', repId: nextRepId });
            console.log(`Signaled rep ${nextRepId} at the next level`);
        }
    }
}


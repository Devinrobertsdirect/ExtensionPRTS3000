// Suppose we detect a level change or receive it from the server
function onLevelChange(newLevel) {
    chrome.runtime.sendMessage({
        type: "levelChange",
        newLevel: newLevel
    });
}

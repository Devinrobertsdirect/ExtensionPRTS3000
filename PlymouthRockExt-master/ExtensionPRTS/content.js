// Send a message to the background script
chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {
    console.log("Response:", response.farewell);
});
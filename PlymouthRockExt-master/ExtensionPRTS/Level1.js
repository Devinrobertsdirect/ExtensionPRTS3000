let timerInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
    var startTime = Date.now();
    var timer = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        var seconds = Math.floor((elapsedTime / 1000) % 60);
        var minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        var hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
        console.log('Time: ' + hours + ':' + minutes + ':' + seconds);
    }, 1000);
}
document.getElementById('startCallBtn').addEventListener('click', startTimer);
document.getElementById('toLevel2Btn').addEventListener('click', () => {
            // Redirect to Level 2 interface
    window.location.href = 'Level2.html';
});
function sendDataToSheet(data) {
    fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
        method: 'POST',
        mode: 'no-cors', // Important for CORS policy
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    }).then(() => console.log('Data sent to sheet')).catch((error) => console.error('Error:', error));
}

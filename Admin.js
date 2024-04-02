function addRep(repDetails) {
    // Basic validation for repDetails object
    if (!repDetails.id || !repDetails.name || !repDetails.level) {
        console.error('Invalid rep details provided');
        return;
    }

    chrome.storage.local.get('reps', (data) => {
        const reps = data.reps || {}; // Initialize reps as an empty object if undefined
        if (reps[repDetails.id]) {
            console.error('Rep already exists with the provided ID');
            return;
        }

        reps[repDetails.id] = repDetails;
        chrome.storage.local.set({ reps }, () => {
            console.log('Rep added successfully:', repDetails);
            // Update the UI
            updateRepListUI();
        });
    });
    function addRep(repDetails) {
        // Basic validation for repDetails object
        if (!repDetails.id || !repDetails.name || !repDetails.level) {
            console.error('Invalid rep details provided');
            return;
        }

        chrome.storage.local.get('reps', (data) => {
            const reps = data.reps || {}; // Initialize reps as an empty object if undefined
            if (reps[repDetails.id]) {
                console.error('Rep already exists with the provided ID');
                return;
            }

            reps[repDetails.id] = repDetails;
            chrome.storage.local.set({ reps }, () => {
                console.log('Rep added successfully:', repDetails);
                // Update the UI
                updateRepListUI();
            });
        });
        function updateRepListUI() {
            chrome.storage.local.get('reps', (data) => {
                const reps = data.reps || {};
                const repListContainer = document.getElementById('repList'); // Assuming you have a container for the rep list in your HTML

                // Clear existing list
                repListContainer.innerHTML = '';

                // Populate the list with updated reps
                Object.values(reps).forEach(rep => {
                    const repItem = document.createElement('div');
                    repItem.textContent = `ID: ${rep.id}, Name: ${rep.name}, Level: ${rep.level}`;
                    repListContainer.appendChild(repItem);
                });
            });
        }

    }
    function displayQueueStatus() {
        chrome.storage.local.get('queue', (data) => {
            const queue = data.queue || {}; // Initialize queue as an empty object if undefined
            const queueContainer = document.getElementById('queueStatus'); // Assuming you have a container for the queue status in your HTML

            queueContainer.innerHTML = ''; // Clear existing queue status

            // Check if the queue is empty
            if (Object.keys(queue).length === 0) {
                queueContainer.textContent = 'The queue is currently empty.';
                return;
            }

            // Display queue status for each level
            Object.entries(queue).forEach(([level, reps]) => {
                const levelContainer = document.createElement('div');
                levelContainer.textContent = `Level ${level}:`;
                reps.forEach(repId => {
                    const repItem = document.createElement('div');
                    repItem.textContent = `Rep ID: ${repId}`;
                    levelContainer.appendChild(repItem);
                });
                queueContainer.appendChild(levelContainer);
            });
        });
    }


}

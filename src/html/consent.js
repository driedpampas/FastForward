// Function to save consent status
async function saveConsentStatus(consentStatus) {
    return browser.storage.local.set({ consentStatus: consentStatus });
}

// Function to get consent status
async function getConsentStatus() {
    return new Promise((resolve) => {
        browser.storage.local.get('consentStatus').then((result) => {
            resolve(result.consentStatus);
        });
    });
}

browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === "install") {
        console.log("Extension installed.");
        const consentStatus = await getConsentStatus();
        console.log("Consent status:", consentStatus);

        if (consentStatus !== 'consent-granted') {
            console.log("Consent not granted.");

            // Event listener for "Agree" button
            document
                .querySelector('#agree')
                .addEventListener('click', async function () {
                    console.log("Agree button clicked.");
                    await saveConsentStatus('consent-granted');
                    window.location.href = 'options.html';
                });

            // Event listener for "Refuse" button
            document
                .querySelector('#refuse')
                .addEventListener('click', async function () {
                    console.log("Refuse button clicked.");
                    await saveConsentStatus('consent-refused');
                    console.log("Uninstalling extension.");
                    browser.management.uninstallSelf();
                });
        }
    }
});

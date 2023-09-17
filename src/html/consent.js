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

const isFirefox = /Firefox/i.test(navigator.userAgent);

if (isFirefox) {
    browser.runtime.onInstalled.addListener((details) => {
        if (details.reason === "install") {
            console.log("Extension installed.");
            browser.storage.local.get('consentStatus').then(function (data) {
                const consentStatus = data.consentStatus;
                console.log("Consent status:", consentStatus);

                if (consentStatus !== 'consent-granted') {
                    console.log("Consent not granted.");

                    // Event listener for "Agree" button
                    document.querySelector('#agree').addEventListener('click', async function () {
                        console.log("Agree button clicked.");
                        let options = await getOptions();
                        options['consent-granted'] = true;
                        saveConsentStatus(consentStatus);
                        window.location.href = 'options.html';
                    });

                    // Event listener for "Refuse" button
                    document.querySelector('#refuse').addEventListener('click', async function () {
                        console.log("Refuse button clicked.");
                        let options = await getOptions();
                        options['consent-granted'] = false;
                        saveConsentStatus(consentStatus);
                        console.log("Uninstalling extension.");
                        browser.management.uninstallSelf();
                    });
                }
            });
        }
    });
} else {
    console.log("Not Firefox, loading options.html directly.");
    // Not Firefox, load options.html directly
    window.location.href = 'options.html';
}

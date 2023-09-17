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

                if (consentStatus !== 'granted') {
                    console.log("Consent not granted.");
                    document.getElementById("consentButton").addEventListener("click", function () {
                        console.log("Consent granted.");
                        browser.storage.local.set({ 'consentStatus': 'granted' }).then(function () {
                            window.location.href = 'options.html';
                        });
                    });

                    document.getElementById("declineButton").addEventListener("click", function () {
                        console.log("Consent declined.");
                        browser.storage.local.set({ 'consentStatus': 'declined' }).then(function () {
                            const popup = document.getElementById("popup");
                            popup.style.display = "block";

                            let countdownValue = 5;
                            const countdownElement = document.getElementById("countdown");
                            const countdownInterval = setInterval(function () {
                                countdownValue -= 1;
                                countdownElement.textContent = countdownValue;

                                if (countdownValue === 0) {
                                    console.log("Uninstalling extension.");
                                    browser.management.uninstallSelf();
                                }
                            }, 1000);

                            document.getElementById("cancelButton").addEventListener("click", function () {
                                console.log("Consent declined and canceled.");
                                popup.style.display = "none";
                                clearInterval(countdownInterval);
                            });
                        });
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

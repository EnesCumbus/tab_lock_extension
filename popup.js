
document.getElementById('lockTab').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.runtime.sendMessage({ action: "lock", tabId: tab.id, url: tab.url }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to background script:", chrome.runtime.lastError.message);
      } else if (response && response.status === "success") {
        alert("Tab locked successfully.");
      }
    });
  });
});

document.getElementById('unlockTab').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.runtime.sendMessage({ action: "unlock", tabId: tab.id }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to background script:", chrome.runtime.lastError.message);
      } else if (response && response.status === "success") {
        alert("Tab unlocked successfully.");
      }
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showAlert") {
    alert(request.message);
  }
});

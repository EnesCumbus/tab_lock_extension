
let lockedTabs = {};

// Sekme kapatılmadan önce tetiklenen olay
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (lockedTabs[tabId]) {
    // Sekmeyi yeniden aç
    chrome.tabs.create({ url: lockedTabs[tabId].url });
    
    // Popup'a mesaj gönder, eğer bağlantı kurulabilirse
    chrome.runtime.sendMessage({ action: "showAlert", message: "This tab is locked and cannot be closed." }).catch((error) => {
      console.warn("Popup not available to receive message.");
    });
  }
});

function lockTab(tabId, url) {
  lockedTabs[tabId] = { url: url };
}

function unlockTab(tabId) {
  delete lockedTabs[tabId];
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "lock") {
    lockTab(request.tabId, request.url);
  } else if (request.action === "unlock") {
    unlockTab(request.tabId);
  }
  
  // Mesajı tamamla
  sendResponse({ status: "success" });
});

// reload page
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "reload-and-check-cookie") {
    let tabId = message.tabId;

    chrome.tabs.reload(tabId);

    chrome.tabs.onUpdated.addListener(function listener(updatedTabId, info, tab) {
      if (updatedTabId === tabId && info.status === "complete") {
        chrome.tabs.onUpdated.removeListener(listener);

        chrome.cookies.get(
          {
            name: "MON_COOKIE",
            url: tab.url!
          },
          (cookie) => {
            if (cookie) {
              console.log("Cookie trouvé :", cookie.value);
            } else {
              console.log("Cookie introuvable");
            }
          }
        );
      }
    });
  }
});
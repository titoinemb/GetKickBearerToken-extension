// get cookie
chrome.runtime.onMessage.addListener(
  (msg: { session_token?: string }) => {
    if (typeof msg.session_token === "string") {
      let input = document.getElementById("token") as HTMLInputElement | null;

      if (input) {
        input.value = msg.session_token;
      };
    };
  },
);

// reload button
let button = document.getElementById("reloadBtn");

button?.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.id) {
    chrome.runtime.sendMessage({
      action: "reload-and-check-cookie",
      tabId: tab.id
    });
  }
});
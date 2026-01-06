let cookie = document.cookie.split("; ").find(r => r.startsWith("session_token="));

if (cookie) {
  let token = decodeURIComponent(cookie.split("=")[1]);

  chrome.runtime.sendMessage({ session_token: token });
};
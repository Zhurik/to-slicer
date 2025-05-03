const ALLOWED_HOSTS = [
  "https://github.com",
]

const ALLOWED_FILE_TYPES = [
  ".stl",
]

function isAllowedHost(url) {
  for (const host of ALLOWED_HOSTS) {
    if (url.startsWith(host)) {
      return true;
    }
  }

  return false;
}

function isAllowedFileType(url) {
  for (const filetype of ALLOWED_FILE_TYPES) {
    if (url.endsWith(filetype)) {
      return true;
    }
  }

  return false;
}

function isSlicebale(tab) {
  return isAllowedHost(tab.url) && isAllowedFileType(tab.url);
}

chrome.tabs.onUpdated.addListener(async (id, changeInfo, tab) => {
  if (!isSlicebale(tab)) {
    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/to_slicer.js"],
  });
});

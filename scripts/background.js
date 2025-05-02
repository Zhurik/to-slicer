chrome.tabs.onUpdated.addListener(async (id, changeInfo, tab) => {
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/to_slicer.js"],
  });
});

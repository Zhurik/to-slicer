browser.tabs.onUpdated.addListener(async (id, changeInfo, tab) => {
  await browser.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/to_slicer.js"],
  });
});

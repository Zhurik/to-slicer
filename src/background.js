/* global chrome */

const ALLOWED_HOSTS = ['https://github.com']

const ALLOWED_FILE_TYPES = ['.stl']

const SLICERS = ['orca', 'prusa', 'cura', 'bambu']

function isAllowedHost (url) {
  if (url === undefined) {
    return false
  }

  for (const host of ALLOWED_HOSTS) {
    if (url.startsWith(host)) {
      return true
    }
  }

  return false
}

function isAllowedFileType (url) {
  for (const filetype of ALLOWED_FILE_TYPES) {
    if (url.endsWith(filetype)) {
      return true
    }
  }

  return false
}

async function populateLocalStorage () {
  for (const slicer of SLICERS) {
    const rawValue = await chrome.storage.local.get([slicer])
    const value = rawValue[slicer]

    if (value === undefined) {
      await chrome.storage.local.set({ [slicer]: true })
    }
  }
}

chrome.tabs.onUpdated.addListener(async (id, changeInfo, tab) => {
  if (!isAllowedHost(tab.url)) {
    return
  }

  if (!isAllowedFileType(tab.url)) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['src/deleter.js']
    })

    return
  }

  if (changeInfo.title !== tab.url.slice(8) && changeInfo.status !== 'complete') {
    return
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['src/to_slicer.js']
  })

  await chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['src/styles/buttons.css']
  })
})

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (!isAllowedHost(details.url)) {
    return
  }

  if (!isAllowedFileType(details.url)) {
    await chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['src/deleter.js']
    })

    return
  }

  await chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    files: ['src/to_slicer.js']
  })

  await chrome.scripting.insertCSS({
    target: { tabId: details.tabId },
    files: ['src/styles/buttons.css']
  })
})

chrome.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  switch (reason) {
    case 'install': await populateLocalStorage()
  }
})

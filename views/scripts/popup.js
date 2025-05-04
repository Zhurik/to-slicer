const SLICERS = [
  "orca",
  "prusa",
  "cura",
  "bambu",
];

async function pinListeners() {
  for (const slicer of SLICERS) {
    document.getElementById(slicer).addEventListener("change", async (event) => {
      await chrome.storage.local.set({ [slicer]: event.target.checked });
    });
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const values = new Map();
  for (const slicer of SLICERS) {
    const value = await chrome.storage.local.get([slicer]);
    values.set(slicer, value[slicer]);
  }

  for (const [key, value] of values) {
    document.getElementById(key).checked = value;
  }

  await pinListeners();
});

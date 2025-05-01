function getDownloadUrl() {
  return document.URL.replace("blob", "raw");
}

function getOrcaSlicerOpenUrl() {
  return "orcaslicer://open?file=" + encodeURIComponent(getDownloadUrl());
}

function buildOrcaLink() {
  let orcaLink = document.createElement("a");
  orcaLink.innerHTML = "Open in OrcaSlicer";
  orcaLink.setAttribute("href", getOrcaSlicerOpenUrl());
  orcaLink.setAttribute("id", "orca-link");

  return orcaLink;
}

function checkIfLinkExists() {
  return document.getElementById("orca-link") != null;
}

function main() {
  if (checkIfLinkExists()) {
    return;
  }

  const downloadButton = document.querySelectorAll('[aria-label="Download raw file"]')[0];
  const orcaLink = buildOrcaLink();
  downloadButton.parentNode.insertBefore(orcaLink, downloadButton[0]);
}

main();

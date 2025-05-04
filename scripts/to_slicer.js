const ID_FOR_CHECK = "to-slicer-link";

const SLICERS = [
  "orca",
  "prusa",
  "cura",
  "bambu",
];

const SLICERS_TO_URLS = new Map([
  ["orca", "orcaslicer"],
  ["prusa", "prusaslicer"],
  ["cura", "cura"],
  ["bambu", "bambustudio"],
]);

// TODO fixme
// I don't know how to make vanilla js take images from folder
//
// and at this point
// I'm too afraid to ask
const HARDCODED_SVGS = new Map([
  [
    "orca",
    '<path style=" stroke:none;fill-rule:nonzero;fill:rgb(91.37255%,91.37255%,91.37255%);fill-opacity:1;" d="M 3.5 0 L 12.5 0 C 14.433594 0 16 1.566406 16 3.5 L 16 12.5 C 16 14.433594 14.433594 16 12.5 16 L 3.5 16 C 1.566406 16 0 14.433594 0 12.5 L 0 3.5 C 0 1.566406 1.566406 0 3.5 0 Z M 3.5 0 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(16.078432%,15.686275%,14.901961%);fill-opacity:1;" d="M 3.460938 12.589844 C 4.378906 13.511719 5.628906 14.03125 6.929688 14.035156 C 8.941406 14.03125 10.75 12.820312 11.519531 10.964844 C 12.292969 9.109375 11.875 6.972656 10.464844 5.546875 Z M 3.460938 12.589844 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,59.215689%,53.725493%);fill-opacity:1;" d="M 10.464844 5.546875 L 3.460938 12.589844 L 3.476562 12.601562 C 6.332031 11.082031 9.046875 9.316406 11.59375 7.320312 C 11.347656 6.652344 10.964844 6.050781 10.464844 5.542969 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(16.078432%,15.686275%,14.901961%);fill-opacity:1;" d="M 9.09375 1.964844 C 7.089844 1.976562 5.289062 3.191406 4.519531 5.042969 C 3.753906 6.894531 4.171875 9.027344 5.582031 10.453125 L 12.585938 3.410156 C 11.660156 2.484375 10.40625 1.960938 9.09375 1.964844 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(14.901961%,14.509805%,13.725491%);fill-opacity:1;" d="M 9.09375 1.964844 C 8.183594 1.960938 7.285156 2.214844 6.511719 2.695312 C 6.027344 2.570312 5.53125 2.507812 5.03125 2.507812 C 4.214844 2.515625 3.40625 2.695312 2.664062 3.039062 C 2.601562 3.070312 2.566406 3.132812 2.574219 3.199219 C 2.578125 3.269531 2.628906 3.324219 2.695312 3.339844 C 3.5 3.507812 4.21875 3.960938 4.710938 4.621094 C 4.105469 5.78125 3.976562 7.128906 4.351562 8.382812 C 4.488281 8.078125 4.65625 7.785156 4.851562 7.511719 C 5.308594 6.886719 5.789062 6.5625 6.5 6.082031 C 7.023438 5.726562 7.75 5.3125 9.839844 4.453125 C 10.375 4.277344 10.886719 4.042969 11.367188 3.746094 C 11.71875 3.539062 11.984375 3.34375 12.070312 3.035156 C 12.074219 3.015625 12.078125 2.992188 12.085938 2.972656 C 11.226562 2.316406 10.175781 1.960938 9.09375 1.964844 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.921875 3.636719 C 10.105469 3.960938 9.742188 4.511719 9.109375 4.871094 C 8.480469 5.234375 7.820312 5.265625 7.640625 4.941406 C 7.457031 4.621094 7.820312 4.070312 8.453125 3.707031 C 9.082031 3.347656 9.742188 3.316406 9.921875 3.636719 "/>'
  ],
  [
    "prusa",
    ""
  ],
  [
    "cura",
    ""
  ],
  [
    "bambu",
    ""
  ],
]);


function getDownloadUrl() {
  return document.URL.replace("blob", "raw");
}

function getSLicerOpenUrl(slicer) {
  return SLICERS_TO_URLS.get(slicer) + "://open?file=" + encodeURIComponent(getDownloadUrl());
}

function buildOrcaLink(downloadButton) {
  const openInOrcaUrl = getSLicerOpenUrl("orca");

  const buttonClone = downloadButton.cloneNode(true);

  buttonClone.setAttribute("aria-label", "Open in OrcaSlicer");
  buttonClone.setAttribute("onclick", "location.href='" + openInOrcaUrl + "';")

  // TODO FIXME
  buttonClone.children[0].children[0].innerHTML = HARDCODED_SVGS.get("orca");

  const orcaLink = document.createElement("a");
  orcaLink.setAttribute("href", getSLicerOpenUrl("orca"));
  orcaLink.setAttribute("id", ID_FOR_CHECK);
  orcaLink.appendChild(buttonClone);

  return orcaLink;
}

function checkIfLinkExists() {
  return document.getElementById(ID_FOR_CHECK) != null;
}

function main() {
  if (checkIfLinkExists()) {
    return;
  }

  const downloadButton = document.querySelectorAll('[aria-label="Download raw file"]')[0];

  const orcaLink = buildOrcaLink(downloadButton);
  downloadButton.parentNode.insertBefore(orcaLink, downloadButton[0]);
}

main();

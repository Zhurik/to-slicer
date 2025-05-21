/* global chrome */

var ID_FOR_CHECK = 'to-slicer-link'  // eslint-disable-line

var SLICERS = ['orca', 'prusa', 'cura', 'bambu']  // eslint-disable-line

var SLICERS_TO_URLS = new Map([  // eslint-disable-line
  ['orca', 'orcaslicer'],
  ['prusa', 'prusaslicer'],
  ['cura', 'cura'],
  ['bambu', 'bambustudio']
])

var SLICER_TO_NAME = new Map([  // eslint-disable-line
  ['orca', 'OrcaSlicer'],
  ['prusa', 'PrusaSlicer'],
  ['cura', 'Ultimaker Cura'],
  ['bambu', 'Bambu Studio']
])

// TODO fixme
// I don't know how to make vanilla js take images from folder
//
// and at this point
// I'm too afraid to ask
var HARDCODED_SVGS = new Map([  // eslint-disable-line
  [
    'orca',
    '<path style=" stroke:none;fill-rule:nonzero;fill:rgb(91.37255%,91.37255%,91.37255%);fill-opacity:1;" d="M 3.5 0 L 12.5 0 C 14.433594 0 16 1.566406 16 3.5 L 16 12.5 C 16 14.433594 14.433594 16 12.5 16 L 3.5 16 C 1.566406 16 0 14.433594 0 12.5 L 0 3.5 C 0 1.566406 1.566406 0 3.5 0 Z M 3.5 0 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(16.078432%,15.686275%,14.901961%);fill-opacity:1;" d="M 3.460938 12.589844 C 4.378906 13.511719 5.628906 14.03125 6.929688 14.035156 C 8.941406 14.03125 10.75 12.820312 11.519531 10.964844 C 12.292969 9.109375 11.875 6.972656 10.464844 5.546875 Z M 3.460938 12.589844 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,59.215689%,53.725493%);fill-opacity:1;" d="M 10.464844 5.546875 L 3.460938 12.589844 L 3.476562 12.601562 C 6.332031 11.082031 9.046875 9.316406 11.59375 7.320312 C 11.347656 6.652344 10.964844 6.050781 10.464844 5.542969 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(16.078432%,15.686275%,14.901961%);fill-opacity:1;" d="M 9.09375 1.964844 C 7.089844 1.976562 5.289062 3.191406 4.519531 5.042969 C 3.753906 6.894531 4.171875 9.027344 5.582031 10.453125 L 12.585938 3.410156 C 11.660156 2.484375 10.40625 1.960938 9.09375 1.964844 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(14.901961%,14.509805%,13.725491%);fill-opacity:1;" d="M 9.09375 1.964844 C 8.183594 1.960938 7.285156 2.214844 6.511719 2.695312 C 6.027344 2.570312 5.53125 2.507812 5.03125 2.507812 C 4.214844 2.515625 3.40625 2.695312 2.664062 3.039062 C 2.601562 3.070312 2.566406 3.132812 2.574219 3.199219 C 2.578125 3.269531 2.628906 3.324219 2.695312 3.339844 C 3.5 3.507812 4.21875 3.960938 4.710938 4.621094 C 4.105469 5.78125 3.976562 7.128906 4.351562 8.382812 C 4.488281 8.078125 4.65625 7.785156 4.851562 7.511719 C 5.308594 6.886719 5.789062 6.5625 6.5 6.082031 C 7.023438 5.726562 7.75 5.3125 9.839844 4.453125 C 10.375 4.277344 10.886719 4.042969 11.367188 3.746094 C 11.71875 3.539062 11.984375 3.34375 12.070312 3.035156 C 12.074219 3.015625 12.078125 2.992188 12.085938 2.972656 C 11.226562 2.316406 10.175781 1.960938 9.09375 1.964844 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 9.921875 3.636719 C 10.105469 3.960938 9.742188 4.511719 9.109375 4.871094 C 8.480469 5.234375 7.820312 5.265625 7.640625 4.941406 C 7.457031 4.621094 7.820312 4.070312 8.453125 3.707031 C 9.082031 3.347656 9.742188 3.316406 9.921875 3.636719 "/>'
  ],
  [
    'prusa',
    '<path style=" stroke:none;fill-rule:nonzero;fill:rgb(53.333336%,53.333336%,53.333336%);fill-opacity:1;" d="M 13.601562 2.046875 C 10.96875 -0.585938 6.699219 -0.585938 4.0625 2.046875 C 1.429688 4.683594 1.429688 8.953125 4.0625 11.585938 Z M 13.601562 2.046875 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.941177%,41.960785%,12.941177%);fill-opacity:1;" d="M 2.476562 13.992188 C 5.109375 16.625 9.378906 16.625 12.015625 13.992188 C 14.648438 11.355469 14.648438 7.085938 12.015625 4.453125 "/>'
  ],
  [
    'cura',
    '<path style=" stroke:none;fill-rule:nonzero;fill:rgb(10.196079%,42.745098%,93.333334%);fill-opacity:1;" d="M 11.601562 14.398438 L 13.921875 12.152344 L 13.921875 1.28125 L 4.644531 1.28125 L 1.359375 4.464844 L 1.359375 14.398438 Z M 11.601562 14.398438 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 12.582031 -0.0234375 L 4.152344 -0.0234375 L 0.0273438 4.101562 L 0.0273438 13.421875 C 0.0117188 13.777344 0.0742188 14.132812 0.207031 14.464844 C 0.335938 14.796875 0.535156 15.097656 0.785156 15.351562 C 1.039062 15.601562 1.339844 15.800781 1.671875 15.929688 C 2.003906 16.0625 2.359375 16.121094 2.714844 16.109375 L 12.042969 16.109375 L 15.273438 12.882812 L 15.273438 2.667969 C 15.285156 2.308594 15.226562 1.953125 15.09375 1.621094 C 14.964844 1.289062 14.765625 0.988281 14.511719 0.738281 C 14.261719 0.484375 13.960938 0.289062 13.628906 0.15625 C 13.296875 0.0273438 12.941406 -0.0351562 12.582031 -0.0234375 Z M 13.480469 12.167969 L 11.328125 14.316406 L 1.820312 14.316406 L 1.820312 4.816406 L 4.871094 1.769531 L 13.480469 1.769531 Z M 13.480469 12.167969 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.101562 12.503906 L 10.78125 12.503906 L 10.78125 10.71875 L 8.101562 10.71875 C 7.390625 10.71875 6.707031 10.4375 6.207031 9.9375 C 5.703125 9.433594 5.421875 8.753906 5.421875 8.042969 C 5.421875 7.335938 5.703125 6.652344 6.207031 6.152344 C 6.707031 5.648438 7.390625 5.367188 8.101562 5.367188 L 10.78125 5.367188 L 10.78125 3.585938 L 8.101562 3.585938 C 6.914062 3.585938 5.78125 4.054688 4.941406 4.890625 C 4.105469 5.726562 3.632812 6.859375 3.632812 8.042969 C 3.632812 9.226562 4.105469 10.359375 4.941406 11.195312 C 5.78125 12.035156 6.914062 12.503906 8.101562 12.503906 Z M 8.101562 12.503906 "/>'
  ],
  [
    'bambu',
    '<path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,68.627453%,25.490198%);fill-opacity:1;" d="M 8 16 C 12.417969 16 16 12.417969 16 8 C 16 3.582031 12.417969 0 8 0 C 3.582031 0 0 3.582031 0 8 C 0 12.417969 3.582031 16 8 16 Z M 8 16 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.277344 6.761719 C 8.472656 6.839844 8.664062 6.914062 8.855469 6.988281 C 9.792969 7.359375 10.734375 7.730469 11.675781 8.097656 C 11.730469 8.121094 11.75 8.144531 11.75 8.207031 C 11.746094 9.734375 11.746094 11.261719 11.746094 12.789062 L 11.746094 12.871094 C 11.714844 12.875 11.691406 12.875 11.664062 12.875 C 10.5625 12.875 9.460938 12.875 8.359375 12.878906 C 8.292969 12.878906 8.269531 12.859375 8.269531 12.792969 C 8.273438 10.808594 8.273438 8.828125 8.273438 6.84375 C 8.273438 6.820312 8.273438 6.796875 8.277344 6.761719 Z M 8.277344 6.761719 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 4.257812 3.121094 L 7.722656 3.121094 C 7.726562 3.148438 7.726562 3.167969 7.726562 3.191406 C 7.726562 3.273438 7.726562 3.355469 7.726562 3.4375 C 7.730469 4.882812 7.730469 6.328125 7.734375 7.769531 C 7.734375 7.839844 7.710938 7.875 7.644531 7.898438 C 6.542969 8.332031 5.445312 8.765625 4.34375 9.195312 C 4.316406 9.207031 4.289062 9.214844 4.257812 9.226562 Z M 4.257812 3.121094 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 7.726562 12.875 L 4.351562 12.875 C 4.285156 12.875 4.253906 12.84375 4.253906 12.78125 C 4.253906 11.820312 4.253906 10.859375 4.25 9.902344 C 4.25 9.839844 4.265625 9.8125 4.328125 9.789062 C 5.4375 9.351562 6.550781 8.914062 7.664062 8.472656 C 7.679688 8.46875 7.699219 8.460938 7.726562 8.453125 Z M 7.726562 12.875 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 8.273438 3.121094 L 11.742188 3.121094 L 11.742188 7.539062 C 11.707031 7.527344 11.671875 7.515625 11.640625 7.503906 C 10.542969 7.070312 9.445312 6.636719 8.347656 6.207031 C 8.289062 6.183594 8.269531 6.15625 8.269531 6.09375 C 8.273438 5.132812 8.273438 4.171875 8.273438 3.207031 Z M 8.273438 3.121094 "/>'
  ]
])

async function getActiveSlicers () {
  const activeSlicers = []
  for (const slicer of SLICERS) {
    const rawValue = await chrome.storage.local.get([slicer])
    const value = rawValue[slicer]

    if (value) {
      activeSlicers.push(slicer)
    }
  }

  return activeSlicers
}

function getDownloadUrl () {
  return document.URL.replace('blob', 'raw')
}

function getSLicerOpenUrl (slicer) {
  return (
    SLICERS_TO_URLS.get(slicer) +
    '://open?file=' +
    encodeURIComponent(getDownloadUrl())
  )
}

function buildLink (slicer, downloadButton) {
  const buttonClone = downloadButton.cloneNode(true)

  buttonClone.setAttribute(
    'aria-label',
    'Open in ' + SLICER_TO_NAME.get(slicer)
  )
  buttonClone.children[0].children[0].innerHTML = HARDCODED_SVGS.get(slicer)

  const link = document.createElement('a')
  link.setAttribute('href', getSLicerOpenUrl(slicer))
  link.setAttribute('id', ID_FOR_CHECK)
  link.appendChild(buttonClone)

  return link
}

function checkIfLinkExists () {
  return document.getElementById(ID_FOR_CHECK) != null
}

function buildButtons (slicers) {
  const downloadButton = document.querySelectorAll(
    '[aria-label="Download raw file"]'
  )[0]

  for (const activeSlicer of slicers) {
    const link = buildLink(activeSlicer, downloadButton)
    downloadButton.parentNode.insertBefore(link, downloadButton[0])
  }
}

function main () {
  if (checkIfLinkExists()) {
    return
  }

  getActiveSlicers().then((activeSlicers) => {
    if (activeSlicers.length === 0) {
      return
    }

    buildButtons(activeSlicers)
  })
}

main()

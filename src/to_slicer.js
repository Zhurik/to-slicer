/* global chrome */

var ID_FOR_CHECK = 'to-slicer-container'  // eslint-disable-line

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
    "<svg version='1.1' id='svg2' width='30' height='30' viewBox='0 0 814.987 1023.9927' sodipodi:docname='OrcaSlicer_gradient_narrow.svg' inkscape:version='1.3 (003919a, 2023-07-16)' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'><defs id='defs6'><clipPath clipPathUnits='userSpaceOnUse' id='clipPath16'><path d='M 0,792 H 612 V 0 H 0 Z' id='path14' /></clipPath></defs><sodipodi:namedview id='namedview4' pagecolor='#ffffff' bordercolor='#000000' borderopacity='0.25' inkscape:showpageshadow='2' inkscape:pageopacity='0.0' inkscape:pagecheckerboard='0' inkscape:deskcolor='#d1d1d1' showgrid='false' inkscape:zoom='0.70710678' inkscape:cx='570.63517' inkscape:cy='563.56411' inkscape:window-width='1392' inkscape:window-height='1212' inkscape:window-x='0' inkscape:window-y='25' inkscape:window-maximized='0' inkscape:current-layer='layer1' /><g inkscape:groupmode='layer' id='layer1' inkscape:label='background' transform='matrix(0.99895749,0,0,0.99799215,-0.93372195,0.0585938)' /><g id='g8' inkscape:groupmode='layer' inkscape:label='OrcaS' transform='matrix(1.3333333,0,0,-1.3333333,1.3995581e-8,1055.9963)'><g id='g10' transform='translate(1.2589521,16.062441)'><g id='g12' clip-path='url(#clipPath16)'><g id='g18' transform='translate(59.7287,115.3517)'><path d='m 0,0 c 53.332,-53.285 126.698,-86.317 207.744,-86.646 164.049,-0.664 298.355,134.38 297.699,299.337 -0.324,81.496 -33.176,155.271 -86.17,208.899 z' style='fill:#74736cff;fill-opacity:1;fill-rule:nonzero;stroke:none' id='path20' /></g><g id='g22' transform='translate(479.0017,536.9419)'><path d='m 0,0 -419.273,-421.59 c 0.298,-0.298 0.606,-0.587 0.906,-0.884 146.894,74.925 348.023,206.579 486.003,316.297 C 52.756,-65.97 29.506,-29.859 0,0' style='fill:#009789;fill-opacity:1;fill-rule:nonzero;stroke:none' id='path24' /></g><g id='g26' transform='translate(397.0372,747)'><path d='m 0,0 c -163.742,0 -296.482,-133.473 -296.482,-298.121 0,-81.979 32.915,-156.223 86.172,-210.117 l 419.273,421.59 C 155.364,-33.096 81.529,0 0,0' style='fill:#605f5aff;fill-opacity:1;fill-rule:nonzero;stroke:none' id='path28' /></g><g id='g30' transform='translate(397.0372,747)'><path d='m 0,0 c -56.714,0 -109.702,-16.022 -154.751,-43.796 -24.127,6.312 -54.061,11.37 -88.437,11.157 -59.938,-0.372 -108.713,-16.603 -141.822,-31.784 -8.218,-3.768 -6.898,-15.967 1.941,-17.829 21.801,-4.593 50.498,-14.324 78.883,-35.28 17.931,-13.238 31.574,-27.883 41.856,-41.597 -21.794,-41.504 -34.152,-88.793 -34.152,-138.992 0,-29.952 4.412,-58.865 12.586,-86.137 12.54,27.79 25.699,46.391 29.916,52.184 27.229,37.41 56.015,56.883 98.542,85.651 31.328,21.193 74.856,46.047 199.916,97.449 0,0 39.121,11.017 91.587,42.212 20.912,12.433 36.823,24.17 41.863,42.526 0.355,1.293 0.677,2.57 0.973,3.83 C 129.175,-22.506 67.208,0 0,0' style='fill:#74736cff;fill-opacity:1;fill-rule:nonzero;stroke:none' id='path32' /></g><g id='g34' transform='translate(446.5563,646.8041)'><path d='m 0,0 c 10.875,-19.229 -10.891,-52.305 -48.616,-73.879 -37.725,-21.573 -77.124,-23.474 -88,-4.245 -10.875,19.229 10.891,52.305 48.617,73.879 C -50.274,17.328 -10.875,19.229 0,0' style='fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none' id='path36' /></g></g></g></g></svg>"
  ],
  [
    'prusa',
    "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 800 800'><path d='m 680.14429,102.36264 c -131.72203,-131.722038 -345.22674,-131.722038 -476.94877,0 -131.722035,131.72203 -131.722035,345.22674 0,476.94877 z' fill='#888' /><path d='m 123.79757,699.53056 c 131.72203,131.72203 345.22674,131.72203 476.94877,0 131.72204,-131.72204 131.72204,-345.22674 0,-476.94877' fill='#ed6b21' /></svg>"
  ],
  [
    'cura',
    "<svg width='30' height='30' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'><g clip-path='url(#clip0_1_10)'><path d='M145.015 180L174 151.886V16H58.0615L17 55.8286V180H145.015Z' fill='#1A6DEE'/><path d='M157.288 -0.28423H51.8979L0.324288 51.2516V167.768C0.167678 172.223 0.930561 176.664 2.56545 180.812C4.20035 184.961 6.67226 188.729 9.82733 191.882C12.9824 195.035 16.7531 197.505 20.9047 199.138C25.0564 200.772 29.5001 201.534 33.9593 201.378H150.561L190.923 161.045V33.3261C191.079 28.8702 190.316 24.4297 188.681 20.2811C187.046 16.1326 184.575 12.3646 181.419 9.21185C178.264 6.05909 174.494 3.58899 170.342 1.9553C166.19 0.321599 161.747 -0.440725 157.288 -0.28423ZM168.499 152.083L141.591 178.971H22.7476V60.2144L60.8673 22.1227H168.499V152.083Z' fill='white'/><path d='M101.262 156.291H134.772V133.994H101.262C92.3741 133.994 83.8506 130.47 77.5661 124.197C71.2816 117.925 67.7511 109.417 67.7511 100.547C67.7511 91.6762 71.2816 83.1688 77.5661 76.8963C83.8506 70.6239 92.3741 67.1 101.262 67.1H134.772V44.8021H101.262C86.4491 44.8021 72.2431 50.6752 61.769 61.1294C51.2949 71.5835 45.4106 85.7624 45.4106 100.547C45.4106 115.331 51.2949 129.51 61.769 139.964C72.2431 150.418 86.4491 156.291 101.262 156.291Z' fill='white'/></g><defs><clipPath id='clip0_1_10'><rect width='200' height='200' fill='white'/></clipPath></defs></svg>"
  ],
  [
    'bambu',
    "<svg width='30' height='30' viewBox='0 0 200 200' fill='none' xmlns='http://www.w3.org/2000/svg'><g clip-path='url(#clip0_1_2)'><path d='M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z' fill='#00AF41'/><path d='M103.453 84.5444C105.926 85.5118 108.3 86.4379 110.669 87.3716C122.42 91.9985 134.168 96.6329 145.928 101.239C146.611 101.505 146.86 101.811 146.858 102.574C146.832 121.663 146.837 140.754 146.837 159.843V160.906C146.429 160.924 146.125 160.951 145.819 160.951C132.042 160.952 118.262 160.945 104.484 160.969C103.639 160.969 103.382 160.765 103.382 159.888C103.406 135.113 103.401 110.336 103.403 85.5605C103.403 85.2606 103.429 84.9606 103.45 84.5444L103.453 84.5444Z' fill='white'/><path d='M53.2095 39.0306H96.541C96.5598 39.34 96.5898 39.6118 96.5898 39.8837C96.5954 40.9148 96.5898 41.9459 96.5916 42.9752C96.6066 61.0273 96.616 79.0794 96.6591 97.1316C96.661 98.0127 96.4004 98.4196 95.5718 98.7439C81.811 104.128 68.0652 109.55 54.3156 114.963C53.9781 115.096 53.6313 115.204 53.2076 115.352V39.0306H53.2095Z' fill='white'/><path d='M96.5654 160.951H54.3925C53.5714 160.951 53.1602 160.553 53.1589 159.756C53.1589 147.76 53.1664 135.763 53.142 123.766C53.142 123.007 53.3389 122.632 54.0869 122.34C67.9921 116.89 81.8822 111.406 95.778 105.932C96.003 105.844 96.2411 105.784 96.5636 105.684V160.951L96.5654 160.951Z' fill='white'/><path d='M103.405 39.0325H146.783V94.2445C146.339 94.0907 145.913 93.9614 145.501 93.7983C131.783 88.3933 118.067 82.9771 104.34 77.5965C103.592 77.3041 103.388 76.9403 103.39 76.1773C103.412 64.1525 103.406 52.1297 103.406 40.1049V39.0325L103.405 39.0325Z' fill='white'/></g><defs><clipPath id='clip0_1_2'><rect width='200' height='200' fill='white'/></clipPath></defs></svg>"
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

function buildLink (slicer) {
  const link = document.createElement('a')
  link.setAttribute('href', getSLicerOpenUrl(slicer))
  const newElement = document.createElement('div')
  link.classList.add('to-slicer-button')
  link.classList.add('to-slicer-tooltip')
  link.innerHTML = HARDCODED_SVGS.get(slicer)

  const tooltipText = document.createElement('span')
  tooltipText.innerText = 'Open in ' + SLICER_TO_NAME.get(slicer)
  tooltipText.classList.add('to-slicer-tooltip-text')

  link.appendChild(tooltipText)
  link.appendChild(newElement)

  return link
}

function checkIfLinkExists () {
  return document.getElementById(ID_FOR_CHECK) != null
}

function buildButtons (slicers) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  container.classList.add('to-slicer-container')
  container.setAttribute('id', ID_FOR_CHECK)

  for (const activeSlicer of slicers) {
    const link = buildLink(activeSlicer)
    container.appendChild(link)
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

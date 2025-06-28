var ID_FOR_CHECK = 'to-slicer-container'  // eslint-disable-line

function deleteOldContainer () {
  const oldContainer = document.getElementById(ID_FOR_CHECK)

  if (oldContainer != null) {
    oldContainer.remove()
  }
}

deleteOldContainer()

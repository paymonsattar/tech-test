const selectionElem = document.createElement('div');
const overlayTextElem = document.createElement('p');
const TextElemNode = document.createTextNode('Click and drag to select on the page')

overlayTextElem.classList.add('fixed', 'top-0', 'left-0', 'bg-gray-600', 'w-72', 'm-4', 'p-2', 'text-center', 'text-white', 'opacity-90', 'text-opacity-100', 'border-2', 'border-black', 'z-20')
selectionElem.classList.add('absolute', 'border-1', 'z-10', 'select-none', 'pointer-events-none')

overlayTextElem.appendChild(TextElemNode)

let startingCoords = {}
let endingCoords = {}
let selecting = false

selectionElem.style.boxShadow = '0px 0px 0px 9999px rgba(0,0,0,.6)'
selectionElem.style.content = ''

window.onload=function(){
  document.body.classList.add('select-none')
  
  document.body.appendChild(selectionElem)
  document.body.appendChild(overlayTextElem)

  document.body.onmousedown = function(e) {
    selecting = true

    startingCoords = { x: e.pageX, y: e.pageY }
  }

  document.body.onmousemove = function(e) {
    if (!selecting) {
      return
    }

    endingCoords = { x: e.pageX, y: e.pageY }

    selectionElem.style.left = `${startingCoords.x < endingCoords.x ? startingCoords.x : endingCoords.x}px`
    selectionElem.style.top = `${startingCoords.y < endingCoords.y ? startingCoords.y : endingCoords.y}px`
    selectionElem.style.width = `${Math.abs(startingCoords.x - endingCoords.x)}px`
    selectionElem.style.height = `${Math.abs(startingCoords.y - endingCoords.y)}px`
    selectionElem.style.boxShadow = '0px 0px 0px 9999px rgba(0,0,0,.6)'
  }

  document.body.onmouseup = function(e) {
    selecting = false

    getLargestElemInArea (startingCoords.x, endingCoords.x, startingCoords.y, endingCoords.y)
    
    // Remove after half a second, instant removal looks glitchy.
    setTimeout(() => {
      selectionElem.remove()
      overlayTextElem.remove()
    }, 500)
    
  }
}

function getLargestElemInArea() {
  console.log('startX', startingCoords.x)
  console.log('endX', endingCoords.x)
  console.log('startingCoords.Y', startingCoords.y)
  console.log('endingCoords.y', endingCoords.y)
  for (let x = startingCoords.x; x <= endingCoords.x; x = x + 10) {
    for (let y = startingCoords.y; y <= endingCoords.y; y = y + 10) {
      let elemsFromPoint = document.elementsFromPoint(x, y)
      let section = elemsFromPoint.find(el => el.nodeName === 'SECTION')
      console.log('section')
      if (section && isInArea(section)) {
        console.log('isInArea', isInArea(section))
        section.classList.add('border-2', 'border-red-400')
      }
    }
  }
  let test = document.elementsFromPoint(startingCoords.x, startingCoords.y)

  console.log('test', test)
}

function isInArea(element) {
  let position = element.getBoundingClientRect();

  console.log('position.x >= startingCoords.x && position.y >= startingCoords.y ', position.x >= startingCoords.x && position.y >= startingCoords.y )
  console.log('position.x + position.width <= endingCoords.x', position.x + position.width <= endingCoords.x)
  console.log('position.y + position.height <= endingCoords.y', position.y + position.height <= endingCoords.y)
  if (position.x >= startingCoords.x && position.y >= startingCoords.y 
    && position.x + position.width <= endingCoords.x
    && position.y + position.height <= endingCoords.y) {
      return true
    }
    console.log('position', position)
    return false
}
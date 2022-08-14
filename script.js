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
    
    // Remove after half a second, instant removal looks glitchy.
    setTimeout(() => {
      selectionElem.remove()
      overlayTextElem.remove()
    }, 500)
    
  }
}
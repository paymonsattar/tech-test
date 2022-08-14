const selectionElem = document.createElement('div');
const overlayTextElem = document.createElement('p');
const TextElemNode = document.createTextNode('Click and drag to select on the page')

overlayTextElem.classList.add('fixed', 'top-0', 'left-0', 'bg-gray-600', 'w-72', 'm-4', 'p-2', 'text-center', 'text-white', 'opacity-90', 'text-opacity-100', 'border-2', 'border-black', 'z-20')
selectionElem.classList.add('absolute', 'border-1', 'z-10', 'select-none', 'pointer-events-none')

overlayTextElem.appendChild(TextElemNode)

let startingCoords = {}
let endingCoords = {}
let selecting = false
let elemsInArea = []

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

    getLargestElemInArea(startingCoords.x, endingCoords.x, startingCoords.y, endingCoords.y)

    addBorderToLargestElem()

    selectionElem.remove()
    overlayTextElem.remove()
    
  }
}

function getLargestElemInArea() {
  for (let x = startingCoords.x; x <= endingCoords.x; x = x + 10) {
    for (let y = startingCoords.y; y <= endingCoords.y; y = y + 10) {
      let elemsFromPoint = document.elementsFromPoint(x, y)

      elemsFromPoint.forEach(el => {
        if(isInArea(el) && !elemListIncludes(el)) {
          elemsInArea.push(el)
        }
      })
    }
  }
}

function isInArea(element) {
  let position = element.getBoundingClientRect();

  return position.x >= startingCoords.x && position.y >= startingCoords.y 
    && position.x + position.width <= endingCoords.x
    && position.y + position.height <= endingCoords.y
}

function elemListIncludes(el) {
  return elemsInArea.filter(e => e.offsetHeight === el.offsetHeight && e.offsetWidth === el.offsetWidth).length > 0
}

function addBorderToLargestElem() {
  let sortedElemsInArea = elemsInArea.sort((a, b) => {
    return b.offsetHeight - a.offsetHeight || b.offsetWidth - a.offsetWidth;
  })

  if (sortedElemsInArea.length > 0) {
    sortedElemsInArea[0].classList.add('border-2', 'border-red-400')

    //tailwind isn't overrriding some borders
    sortedElemsInArea[0].style.borderColor = 'rgb(248 113 113)'
  }
}
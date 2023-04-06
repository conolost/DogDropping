let magicPlace = null;

const dragDiv = (e) => {
  dog.style.position = "absolute";
  dog.style.zIndex = 1000;
  dog.style.cursor = "grabbing";
  document.body.append(dog);
  
  clickPointX = e.clientX - dog.getBoundingClientRect().left
  clickPointY = e.clientY - dog.getBoundingClientRect().top
  
  const moveAt = (pageX, pageY) => {
    dog.style.left = pageX - clickPointX + 'px';
    dog.style.top = pageY - clickPointY + 'px';
  }
  
  moveAt(e.pageX, e.pageY);

  const onMagicPlace = (e) => {
    dog.hidden = true;
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    dog.hidden = false;
    
    if (!elemBelow) {
      return;
    }
    let droppableEl = elemBelow.closest('.droppable');
    return droppableEl;

  }
  
  const dogMove = (e) => {
    moveAt(e.pageX, e.pageY)
    let droppableEl = onMagicPlace(e);

    if (magicPlace != droppableEl) {
      if (magicPlace) {
        leaveDroppable(magicPlace)
      }
      magicPlace = droppableEl
      if (magicPlace) {
        enterDroppable(magicPlace)
      }
    }
  }

  
  const dropDiv = (e) => {
    document.removeEventListener("mousemove", dogMove);
    dog.style.cursor = "grab";
    dog.style.backgroundPosition = '0 192px'

    let droppableEl = onMagicPlace(e);
    if (droppableEl) {
      dog.classList.add('draggableEl_animate')
      bones.classList.add('bones_animate')
    }
    else {
      dog.classList.remove('draggableEl_animate')
      // droppableEl.querySelector('.bones').classList.remove('bones_animate')
      bones.classList.remove('bones_animate')

    }
    
  }
  
  document.addEventListener("mousemove", dogMove)
  dog.addEventListener("mouseup", dropDiv);
  
  dog.style.backgroundPosition = '-944px 192px'
  
};


const dog = document.getElementById('block');
const bones = document.getElementById('bones');

dog.addEventListener("mousedown", dragDiv)

function enterDroppable(elem) {
  elem.style["boxShadow"] = '0 0 25px #fff'
  
}

function leaveDroppable(elem) {
  elem.style["boxShadow"] = 'none'
  
}

// IN case dog is img:

// dog.ondragstart = () => {
//   return false;
// };


 /*
 This component holds the functions that manipulate the classes of the DOM
  */

export const hide = (variableName) => {
    variableName.classList.add("hide");
  };
 export const show = (variableName) => {
    variableName.classList.remove("hide");
  };
  
  
 export function setStatusClass(element) {
    clearStatusClass(element);
    if (element.classList.contains("yes")) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }

  export function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }

 export function resetState(button, element) {
    clearStatusClass(document.body);
    hide(button);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
  }
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".nav-button");
  
    document.addEventListener("keydown", function (event) {
      const activeElement = document.activeElement;
      const activeIndex = Array.from(buttons).indexOf(activeElement);
  
      let nextIndex;
  
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        // Move to the next button
        nextIndex = (activeIndex + 1) % buttons.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        // Move to the previous button
        nextIndex = (activeIndex - 1 + buttons.length) % buttons.length;
      }
  
      if (nextIndex !== undefined) {
        buttons[nextIndex].focus();
      }
    });
  });  
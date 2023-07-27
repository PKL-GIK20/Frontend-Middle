function changeText() {
    var headingElement = document.getElementById("mainHeading");
    headingElement.textContent = "DOM Manipulasi Berhasil!";
}


function changeTextColor() {
    var paragraphElement = document.getElementById("paragraph");
    paragraphElement.style.color = "blue";
}

function hideElement() {
    var headingElement = document.getElementById("mainHeading");
    headingElement.style.display = "none";
}

function showElement() {
    var headingElement = document.getElementById("mainHeading");
    headingElement.style.display = "block";
}

function changeDynamicText() {
    var textInput = document.getElementById("textInput");
    var headingElement = document.getElementById("mainHeading");
    headingElement.textContent = textInput.value;
    textInput.value = ""; 
}

function changeTextColorWithAnimation() {
    var paragraphElement = document.getElementById("paragraph");
    paragraphElement.style.animation = "changeTextColorAnimation 6s";
    paragraphElement.addEventListener("animationend", function() {
        paragraphElement.style.animation = "none";
    });
}

var changeTextButton = document.getElementById("changeTextBtn");
changeTextButton.addEventListener("click", changeText);

var changeColorButton = document.getElementById("changeColorBtn");
changeColorButton.addEventListener("click", changeTextColor);

var hideElementButton = document.getElementById("hideElementBtn");
hideElementButton.addEventListener("click", hideElement);

var showElementButton = document.getElementById("showElementBtn");
showElementButton.addEventListener("click", showElement);

var changeDynamicTextButton = document.getElementById("changeTextDynamicBtn");
changeDynamicTextButton.addEventListener("click", changeDynamicText);

var changeColorButton = document.getElementById("changeColorBtn");
changeColorButton.addEventListener("click", changeTextColorWithAnimation);


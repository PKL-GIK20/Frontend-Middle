document.getElementById("changeTextBtn").addEventListener("click",(function(){document.getElementById("mainHeading").textContent="DOM Manipulasi Berhasil!"})),document.getElementById("changeColorBtn").addEventListener("click",(function(){document.getElementById("paragraph").style.color="blue"})),document.getElementById("hideElementBtn").addEventListener("click",(function(){document.getElementById("mainHeading").style.display="none"})),document.getElementById("showElementBtn").addEventListener("click",(function(){document.getElementById("mainHeading").style.display="block"})),document.getElementById("changeTextDynamicBtn").addEventListener("click",(function(){var e=document.getElementById("textInput");document.getElementById("mainHeading").textContent=e.value,e.value=""})),document.getElementById("changeColorBtn").addEventListener("click",(function(){var e=document.getElementById("paragraph");e.style.animation="changeTextColorAnimation 6s",e.addEventListener("animationend",(function(){e.style.animation="none"}))}));
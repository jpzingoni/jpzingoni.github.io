let $addbutton = document.getElementById("add-button")
let $popup = document.getElementById("pop-up")
let $closepopup = document.getElementById("close-pop-up")

$addbutton.addEventListener("click", function(){
    console.log("Click")
    $popup.style.visibility = "visible";
})

$closepopup.addEventListener("click", function(){
    $popup.style.visibility = "hidden";
})
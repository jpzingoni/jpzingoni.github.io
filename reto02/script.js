let $input = document.getElementById("barra-busqueda");
let $buscador = document.getElementById("buscador");
let $conteinerBuscador = document.getElementById("conteiner-buscador");
let $botonesBuscador2 = document.getElementById("botones-buscador-2");
let $main = document.getElementById("conteiner-total");
let $busquedas = document.getElementById("busquedas");
let $appButton = document.getElementById("showAppButton");
let $chocolateMenu = document.getElementById("chocolate-menu");
let contadorMenuChocolate = 0;
let contadorInput = 0;
$input.addEventListener("click", function(){
    $conteinerBuscador.classList.add("agregadojs");
    $buscador.classList.add("agregadojs");
    $busquedas.style.display = "block";
    $botonesBuscador2.style.display = "none";
    console.log(contadorInput)
})

$appButton.addEventListener("click", function(){
    $chocolateMenu.style.display = "flex";
    console.log(contadorMenuChocolate);
})

$main-addEventListener("click", function(){
    console.log(contadorMenuChocolate);
    contadorMenuChocolate++;
    contadorInput++;
    if(contadorMenuChocolate > 1){
        $chocolateMenu.style.display = "none";
        contadorMenuChocolate = 0;
    }
    if(contadorInput > 1){
        $busquedas.style.display = "none";
        contadorInput = 0;
    }
    if($botonesBuscador2.style.display == "none" && $busquedas.style.display == "none"){
        $botonesBuscador2.style.display = "flex";
    }
})

let $input = document.getElementById("barra-busqueda");
let $buscador = document.getElementById("buscador");
let $conteinerBuscador = document.getElementById("conteiner-buscador");
let $botonesBuscador = document.getElementById("botones-buscador");
let $main = document.getElementById("conteiner-total");
let $busquedas = document.getElementById("busquedas");

$input.addEventListener("click", function(){
    $conteinerBuscador.classList.add("agregadojs");
    $buscador.classList.add("agregadojs");
    $busquedas.style.display = "block";
})

// $main.addEventListener("click", function(){
//     console.log("hola");
//     if($busquedas.style.display == "block"){
//         return $busquedas.style.display = "none";
//     }
// })
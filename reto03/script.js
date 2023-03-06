let $addbutton = document.getElementById("add-button");
let $popup = document.getElementById("pop-up");
let $closepopup = document.getElementById("close-pop-up");
let $agregartarea = document.getElementById("agregar");
let $tareasagregadas = document.getElementById("tareas-agregadas");
let $mainsection = document.getElementById("main-section");
let $mainid = document.getElementById("main-id");
let $listadetareas = document.getElementById("lista-de-tareas")
let $item = document.getElementById("item");
let $botonCancelar = document.getElementById("cancelar")
let $popupError = document.getElementById("pop-up-error");
let $closeError = document.getElementById("close-error");
let $mainImagen = document.getElementById("main-image");
let $mainTitle = document.getElementById("main-title");
let $verPendientes = document.getElementById("btn-pendientes");
let $checkBoxCreado;
let arrayLocalStorage = [];

function corrobarTareas(){
    arrayTexto = localStorage.getItem('arrayTareas');
    arrayLocalStorage = JSON.parse(arrayTexto);
    if(arrayLocalStorage == null || localStorage.getItem("$pruebaLocalStorage") == ""){
        arrayLocalStorage = [];
        localStorage.clear();
        return;
    }
    else if(arrayLocalStorage.length < 2){
        $mainImagen.src = "/reto03/images/grinning.png";
        $mainTitle.innerText = `Hola! Recorda que tenés ${arrayLocalStorage.length} tarea pendiente`
        $verPendientes.style.display = "block";
        $addbutton.style.display = "none";
    }
    else if(arrayLocalStorage.length < 4){
        $mainImagen.src = "/reto03/images/upsidedown.png";
        $mainTitle.innerText = `Hola! Recorda que tenés ${arrayLocalStorage.length} tarea pendiente`
        $verPendientes.style.display = "block";
        $addbutton.style.display = "none";
    }
    else if(arrayLocalStorage.length >= 4){
        $mainImagen.src = "/reto03/images/worried-face.png";
        $mainTitle.innerText = `Hola! Recorda que tenés ${arrayLocalStorage.length} tarea pendiente`
        $verPendientes.style.display = "block";
        $addbutton.style.display = "none";
    }
}
corrobarTareas()
$addbutton.addEventListener("click", function(){
$popup.setAttribute("id","pop-up-display")
$mainsection.removeAttribute("id")
//$mainsection.style.display = "none";
})

$closepopup.addEventListener("click", function(){
    $mainsection.setAttribute("id", "main-section");
    $popup.removeAttribute("id")
})

$closeError.addEventListener("click", function(){
    $popupError.style.display = "none";
})

$botonCancelar.addEventListener("click", function(){
    $mainsection.setAttribute("id", "main-section");
    $popup.removeAttribute("id")
    let inputDescripcion = document.getElementById("description");
    let inputTituloTarea = document.getElementById("task-name");
    inputDescripcion.value = "";
    inputTituloTarea.value = "";
})
$agregartarea.addEventListener("click", function(){
    let $divLista = crearDivLista();
    $mainsection.setAttribute("id", "main-section");
    if($divLista === undefined){
        $popup.removeAttribute("id")
        $popupError.style.display = "flex";
    }
    else{
        $mainsection.setAttribute("id", "main-section");
        $tareasagregadas.style.display = "block";
        $popup.removeAttribute("id")
        $mainid.style.display = "none";
        //let $divLista = crearDivLista();
        $listadetareas.appendChild($divLista);
        ////
        ////
        ////
        $tareasAgregadasTexto = $listadetareas.innerHTML.trim();
        console.log($tareasAgregadasTexto)

        localStorage.setItem("$pruebaLocalStorage", $tareasAgregadasTexto);

        arrayLocalStorage.push($tareasAgregadasTexto);
        arrayLocalStorageTexto = JSON.stringify(arrayLocalStorage);
        localStorage.setItem("arrayTareas", arrayLocalStorageTexto);

        //vamos a probar crear una variable con todo eso, para convertirla en nodo y luego poder agregarla al html

        // $rango = document.createRange();
        // $tareasAgregadasEnLocalStorage = localStorage.getItem("$pruebaLocalStorage");
        // console.log($tareasAgregadasEnLocalStorage);
        // $tareasagregadasNodo = $rango.createContextualFragment($tareasAgregadasTexto);
        // LOCALSTORAGE = $tareasagregadasNodo;
        //$tareasagregadas.appendChild($tareasagregadasNodo);
        

        ////
        ////
        ////
        chequearItem();
        borrarLista();
    }
})

$verPendientes.addEventListener("click", ()=>{
    $addbutton.style.display = "block"
    return tareasPendientes();
})

function crearDivLista(){
    let $crearLista = creandoLista();
    if($crearLista == ""){
        return 
    }
    let $crearIconoTarea = crearIconoTarea();
    // let $crearLista = creandoLista();
    let $crearImgAddDel = crearImagenAddDelete();
    let $crearCheckBox = crearCheckBox();
    let $div = document.createElement("div");
    $div.appendChild($crearIconoTarea);
    $div.appendChild($crearLista);
    $div.appendChild($crearCheckBox);
    $div.appendChild($crearImgAddDel);
    $div.setAttribute("class", "div-nuevo");
    $div.style.borderRightColor = prioridadTarea();
    //chequearItem();
    return $div;
}

function creandoLista(){
    let inputDescripcion = document.getElementById("description");
    let inputTituloTarea = document.getElementById("task-name");
    let $descripcionAAgregar = descripciontarea();
    if($descripcionAAgregar == ""){
        inputDescripcion.value = "";
        inputTituloTarea.value = "";
        return $descripcionAAgregar;
    }
    let $tituloAgregar = tituloTarea();
    if($tituloAgregar == ""){
        inputDescripcion.value = "";
        inputTituloTarea.value = "";
        return $tituloAgregar;
    }
    let $tituloli = document.createTextNode(`${$tituloAgregar}: ${$descripcionAAgregar}`);
    let $li =document.createElement("li");
    $li.appendChild($tituloli);
    $li.setAttribute("id", "li-js");
    // let inputDescripcion = document.getElementById("description");
    inputDescripcion.value ="";
    //let inputTituloTarea = document.getElementById("task-name");
    inputTituloTarea.value = "";
    return $li;
}

function descripciontarea(){
    let descripcion = document.getElementById("description").value
    return descripcion
}

function tituloTarea(){
    let $tituloTarea = document.getElementById("task-name").value;
    return $tituloTarea;
}

function crearIconoTarea(){
    let taskType = document.getElementById("task-type");
    let valueTask = taskType.value;
    let $icon = document.createElement("img");
    if(valueTask == "work"){
        $icon.src = "/reto03/images/work.png";
    }else if(valueTask == "personal"){
        $icon.src = "/reto03/images/personal.png";
    }else if(valueTask == "domestic"){
        $icon.src = "/reto03/images/domestic.png";
    }else{
        $icon.src = "/reto03/images/fun.png";
    }
    $icon.setAttribute("class","icon-list")
    return $icon;
}

function crearImagenAddDelete(){
    let $canTrash = document.createElement("img");
    $canTrash.src = "/reto03/images/trash-can.png";
    $canTrash.setAttribute("class","img-can");
    $canTrash.setAttribute("id","id-can");
    return $canTrash;
}

function crearCheckBox(){
    let $checkbox = document.createElement("img");
    $checkbox.src ="/reto03/images/rectangle-box.png";
    $checkbox.setAttribute("class", "imgCheckBox");
    $checkBoxCreado = $checkbox;
    return $checkbox;
}
function prioridadTarea(){
    let $prioridad = document.querySelector('input[name="priority"]:checked');
    if($prioridad.value == "priority-1"){
        return "red";
    }else if($prioridad.value == "priority-2"){
        return "orange";
    }else{
        return "green"
    }
}

function chequearItem(){
    $checkBoxCreado = document.getElementsByClassName("imgCheckBox");
    for(let i =0; i < $checkBoxCreado.length; i++){
        $checkBoxCreado[i].addEventListener("click", function(){
            this.src ="/reto03/images/checked.png";
            $tareasAgregadasTexto = $listadetareas.innerHTML.trim();
            console.log($tareasAgregadasTexto)
    
            localStorage.setItem("$pruebaLocalStorage", $tareasAgregadasTexto);
        })
    }
}

function borrarLista(){
    $canImg = document.querySelectorAll(".img-can");
    $canImg.forEach(function(imagen){
        imagen.addEventListener("click", function(){
            arrayLocalStorage.pop();
            arrayLocalStorageTexto = JSON.stringify(arrayLocalStorage);
            localStorage.setItem("arrayTareas", arrayLocalStorageTexto);
            let div = this.parentNode;
            div.remove();
            localStorage.setItem("$pruebaLocalStorage", $listadetareas.innerHTML.trim());
            if(localStorage.getItem("$pruebaLocalStorage") == "" || localStorage.getItem("$pruebaLocalStorage") == null){
                $tareasagregadas.style.display = "none";
                $mainid.style.display = "flex";
                $mainImagen.src = "/reto03/images/party-face.png";
                $mainTitle.innerText = "No hay tareas pendientes"
                $verPendientes.style.display = "none";
            }
            console.log(localStorage.getItem("$pruebaLocalStorage"));
        })
    });
}

function tareasPendientes(){
    $tareasagregadas.style.display = "block";
    $mainid.style.display = "none";
    $rango = document.createRange();
    $tareasAgregadasEnLocalStorage = localStorage.getItem("$pruebaLocalStorage");
    console.log($tareasAgregadasEnLocalStorage);
    $tareasagregadasNodo = $rango.createContextualFragment($tareasAgregadasEnLocalStorage);
    $listadetareas.appendChild($tareasagregadasNodo);
    chequearItem();
    borrarLista();
}

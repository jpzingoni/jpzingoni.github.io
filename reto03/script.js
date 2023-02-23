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
let $checkBoxCreado;

$addbutton.addEventListener("click", function(){
    console.log("Click")
    $popup.setAttribute("id","pop-up-display")
    $mainsection.removeAttribute("id")
    //$mainsection.style.display = "none";
})

$closepopup.addEventListener("click", function(){
    $mainsection.setAttribute("id", "main-section");
    $popup.removeAttribute("id")
})

$botonCancelar.addEventListener("click", function(){
    $mainsection.setAttribute("id", "main-section");
    $popup.removeAttribute("id")
})
$agregartarea.addEventListener("click", function(){
    $mainsection.setAttribute("id", "main-section");
    $tareasagregadas.style.display = "block";
    $popup.removeAttribute("id")
    $mainid.style.display = "none";
    let $divLista = crearDivLista();
    if($divLista === undefined){
        swal("Falta el nombre de tu tarea!", "No es posible cargar la tarea sin nombre", "error");
    }
    $listadetareas.appendChild($divLista);
    chequearItem();
    borrarLista();
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
    $div.setAttribute("id","id-nuevo")
    $div.style.borderRightColor = prioridadTarea();
    //chequearItem();
    return $div;
}

function creandoLista(){
    let $descripcionAAgregar = descripciontarea();
    if($descripcionAAgregar == ""){
        return $descripcionAAgregar;
    }
    let $textoli = document.createTextNode($descripcionAAgregar);
    let $li =document.createElement("li");
    $li.appendChild($textoli);
    $li.setAttribute("id", "li-js");
    let inputDescripcion = document.getElementById("description");
    inputDescripcion.value ="";
    let inputTituloTarea = document.getElementById("task-name");
    inputTituloTarea.value = "";
    return $li;
}

function descripciontarea(){
    let descripcion = document.getElementById("description").value
    // if(descripcion == ""){
    //     return "no ingresaste ninguna descripción"
    // }else{
    //     return descripcion
    // }
    return descripcion
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
        })
    }
}

function borrarLista(){
    $canImg = document.querySelectorAll(".img-can");
    console.log($canImg);
    $listasCreadas = document.getElementById("div-nuevo");
    $canImg.forEach(function(imagen){
        imagen.addEventListener("click", function(){
            let div = this.parentNode;
            div.remove();
        })
    });
}
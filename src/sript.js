let liLang = document.getElementById('changelang')
let htmlElement = document.getElementById('espanol');

liLang.addEventListener('click', function(){
  //let urlActual = window.location.href;
  console.log('Hola')
  if (htmlElement){
    window.location.href = 'index.html';
    console.log('Aca')
  }
  else{
    window.location.href = 'index_esp.html'
  }
})

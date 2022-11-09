// Si los suelta en el document (por error) no hacer nada
document.addEventListener('dragover',function(event){event.preventDefault();},false);
document.addEventListener('drop',function(event){event.preventDefault();});


// Funcionar para testear si está disponible la función de drag & drop en el explorador
var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

const to_upload_element = document.getElementById('to_upload');

if (isAdvancedUpload) {

  // Al arrastrar por encima cambiar la apareincia
  to_upload_element.addEventListener('dragover dragenter', () => {
    to_upload_element.classList.add("is-dragover")
  })
  to_upload_element.addEventListener('dragenter', () => {
    to_upload_element.classList.add("is-dragover")
  })
  to_upload_element.addEventListener('dragleave', () => {
    to_upload_element.classList.remove("is-dragover")
  })
  to_upload_element.addEventListener('dragend', () => {
    to_upload_element.classList.remove("is-dragover")
  })
  to_upload_element.addEventListener('drop', () => {
    to_upload_element.classList.remove("is-dragover")
  })

  // Al soltar los elementos en el div, leerlos
  to_upload_element.addEventListener('drop', readFiles, false);

}

// Al seleccionar los archivos leerlos
document.getElementById('files').addEventListener('change', readFiles,false);


let fileData = "";

//Leer los archivos
function readFiles(event){
  //target.files => input
  //dataTransfer.files => DnD
  const archivos = event.target.files || event.dataTransfer.files;
  //[].forEach.call(archivos, preview); 

  // Eliminar otros archivos si los hay
  //for (var file in files) delete files[file];

  const fileDiv = document.querySelector('#to_upload .fileDiv')
  fileDiv.innerHTML = "";

  // Solo mostrar el archivo 1
  preview(archivos[0]);
}

function clearUploadedFiles() {
  const fileDiv = document.querySelector('#to_upload .fileDiv')
  fileDiv.innerHTML = "";
  fileDiv.style.display = "none";
  fileData = "";
  const container = document.querySelector('#to_upload');
  container.style.height = "120px";
}

function preview(file) {
  //add the file to 'images' array
  const reader = new FileReader();
  if(files[file.name] === undefined){
    
    reader.addEventListener("load", function () {
      
      //add a div for each file(to show the preview)
      const fileDiv = document.querySelector('#to_upload .fileDiv')
      fileDiv.style.display = "flex";
      const fileContainer = document.createElement('div'); //image+info container
      fileContainer.classList.add("uploadFile");
      //document.documentElement.style.setProperty('--to_upload_icon', "\f1c3")

      const spanTitle = document.createElement('span');
      spanTitle.appendChild(document.createTextNode(file.name));
      
      const icon = document.createElement('i');
      icon.setAttribute('class','fa fa-file-excel-o');
      
      const btnRemove = document.createElement('button');
      btnRemove.addEventListener('click', function(x){
        //console.log(file.name);
        //remove the element from the list of images
        //remove the current file from the list
        //delete files[file.name];
        clearUploadedFiles();
      },false);

      const btnIcon = document.createElement('i');
      btnIcon.setAttribute('class','fa fa-times-circle');
      btnRemove.appendChild(btnIcon);

      fileContainer.appendChild(spanTitle);
      //fileContainer.appendChild(icon);
      fileContainer.appendChild(btnRemove);
      fileDiv.appendChild(fileContainer);
      fileData = reader.result;

      const container = document.querySelector('#to_upload');
      container.style.height = "200px";

    }, false);

    //reader.readAsDataURL(file); // Para enviar como base64
    reader.readAsText(file);
  }

  
}


// if ( /\.(xls?x|csv)$/i.test(file.name) ) {
//   icon.setAttribute('class','fa fa-file-excel-o');
// }
// //word
// if ( /\.(doc?x)$/i.test(file.name) ) {
//   icon.setAttribute('class','fa fa-file-word-o');
// }
// //ppt
// if ( /\.(ppt?x)$/i.test(file.name) ) {
//   icon.setAttribute('class','fa file-powerpoint-o');
// }
// //txt
// if ( /\.(txt)$/i.test(file.name) ) {
//   icon.setAttribute('class','fa file-text');
// }
// //pdf
// if ( /\.(pdf)$/i.test(file.name) ) {
//   icon.setAttribute('class','fa file-pdf-o');
// }

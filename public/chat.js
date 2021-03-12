//cliente
const socket = io() //colocamos el dominio que queremos usar, tambien se usa io() para que se conecte a cualquier dominio sin configurarlo
//el io envia todo el contendio de frontend al navegadores

let message = document.getElementById('message');
let username = document.getElementById('username');
let ruta = document.getElementById('ruta');
let file= document.getElementById('btn_enviar');
let btn  = document.getElementById('sent');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

  function handleFiles(ev){ //funcion para convertir la direccion de la imagen en base64
    if ( file.files && file.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
          document.getElementById('ruta').value = e.target.result;
            console.log(e.target.result);
        };
        FR.readAsDataURL( file.files[0] );
        file.files[0]="";
    }
  }

  btn.addEventListener('click', function () {

  socket.emit('chat:message', { // emite el evento chat:message al servidor
    message: message.value,
    username: username.value,
    ruta: ruta.value

  });
});

socket.on('chat:message', function(data) { //escucha los mensajes del servidor
  actions.innerHTML = ''; //limpia el (está escribiendo...) cuando envíe el mensaje
  output.innerHTML += `<p>
  <strong>${data.username}</strong>: ${data.message} <div><img id="img" src="${data.ruta}" style="width:30%" /></div>
  </p>`
});

message.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});

socket.on('chat:typing', function (data) {
  actions.innerHTML = `<p><em>${data} está escribiendo..</em></p>`
});

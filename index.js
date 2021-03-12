//servidor
const path = require('path'); //modulo que se encarga de unir las rutas de los directorios
const express = require('express'); //servidor express
const app = express();

//configuración
app.set('port', process.env.PORT || 3000); // configurarion del puerto

// archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); //dirección de la carpeta donde están los archivos del chat mediante el modulo path

//inciar servidor
const server = app.listen(app.get('port'), () => {
  console.log('puerto del servidor', app.get('port')); //muestra por consola puerto del servidor
});

//websockets
const SocketIO = require('socket.io'); //comunicacion bidirecional entre el servidor express y socketio
const io = SocketIO(server); //incializa socketio directamente

io.on('connection', (socket) => { // comunicacion de websockets el cual escucha eventos, es decir cuando se conecta un nuevo cliente
  console.log('nueva conexion', socket.id); //muestra la conexion por consola de los clientes que se conecten junto con el id de socket

  socket.on('chat:message', (data) => { //escucha el evento chat:message desde el cliente
    io.sockets.emit('chat:message', data); //reenvia a todos los clientes o navegadores
  });

  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data);//envia (esta escribiendo) a todos menos al que está enviando el mensaje)
  })
});

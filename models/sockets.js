

class Sockets {

    constructor( io ) {
        this.io = io;


        this.socketsEvents();

    }

    socketsEvents() {
        
        // dispositivo que se conecto al socket server
        // entiendase el socket como un ciente que se conecto

        this.io.on('connection', (socket) => { 
            // los eventos tienen un metodo llamado emit que sirve para emitir un evento
            // los eventos  son basicamente onstrucciones que se disparan
            // usualmente se segmentan de manera que sea facil de identificar
            //evento  primer argumento es el nombre del evento, segundo argumento es el objeto, payload
        
            // socket.emit('mensaje-bienvenida', {
            //     msg: 'Bienvenido al server',
            //     fecha: new Date()
            // });     

            // para escuchar los mensajes del cliente
            socket.on('mensaje-to-server', (data) => {
                console.log(data);
                //socket solo envia al socket que le envio
                //io si le envia a todo el mundo enel namespace
                this.io.emit('mensaje-from-server', data);
        }); 
        });
    }
}


module.exports = Sockets;

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
// cuando hay que moverse entre directorios hay que importar path
// es propio de espress
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        //Configuraciones de sockets
        // configuracion del sockt server
        this.io = socketio(this.server,{cors: {
            origin: "*",
            methods: ["GET", "POST"]
          }});

    }

    middlewares() {
        //desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public')));

        //CORS
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
          });
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        //Inicializar middlewares
        this.middlewares();

        // inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:',this.port );
        }); 
    }
}

module.exports = Server;

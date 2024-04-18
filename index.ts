import express, { Express } from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

const app: Express = express();


app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3005; // Usa el puerto proporcionado por Render o 3005 si no se proporciona ninguno

const server = app.listen(port, () => {
  console.log(`api-ws-corriendo en el puerto ${port}`);
});


const io: Server = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*" // Aquí debes agregar la URL de origen de tu aplicación cliente
  }
});

io.on('connection', socket => {
  socket.on('payment', pago => {
    console.log('payment success and sended to client: ', pago);
    io.emit('payment-processed', pago);
  });

  socket.on("connect_error", (error) => {
    console.error("Error de conexión:", error);
  });

  socket.on("disconnect", (reason) => {
    console.error("Desconectado:", reason);
  });
});

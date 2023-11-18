const express = require("express");
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
//Antes de todas las rutas
// Indicarle a express que vamos a recibir un JSON
app.use(cors());
app.use(express.json());


const usersRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {

    res.status(404).json(
        {
            error
        }
    )
})

const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:5173',
        methods: ['GET', 'POST']

    }
});

io.on('connection', (socket) => {

    console.log("Se ha conectado el socket" + socket.id)
    
    socket.on('new_message', (data) => {
        console.log(data)
        socket.to('general').emit('recieved_message', data);
    })

    socket.on('join_room', (data)=> {
        console.log(data)
        socket.join('general');
    });

})



server.listen(3000, () =>{
    console.log("el servidor se inicio");
});
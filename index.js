const express = require("express");
const app = express();
const cors = require('cors');
//Antes de todas las rutas

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

app.listen(3000, () =>{
    console.log("el servidor se inicio");
});
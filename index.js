//Importar dependencias
const {connection} = require("./database/connection")
const express = require("express")
const cors = require ("cors")
require('dotenv').config()

//mensaje de bienvenida
console.log("api-usuarios arrancada!!")


// Conectar a la bd
connection() 


//Crear Servidor de node
const app = express()
const puerto = process.env.Puerto_Uri


//Configurar el cors
app.use(cors())

//Convertir los datos del body a objetos JSON
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cargar rutas
const UserRoutes = require("./routes/user")

app.use("/api/user", UserRoutes)



app.get("/ruta-prueba", (req, res) => {

    return res.status(200).json(
        {
            "id": 1,
            "username": "alan",
            "password": "bebe"
        }
    )
})

//Poner el servidor a escuchar
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto ", puerto);
})
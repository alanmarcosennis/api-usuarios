const mongoose = require("mongoose")
require("dotenv").config()

const connection = async() => {

    try {
        await mongoose.connect("process.env.Mongo_Uri/usuarios", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          console.log("Conectado correctamente a bd: usuarios");
        }

    catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos")
    }
}

module.exports = {
    connection
}
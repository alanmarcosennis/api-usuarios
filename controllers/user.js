// Importar dependencias y módulos
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Acciones de prueba
const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde controllers/user.js",
  });
};

// Registro de usuarios
const register = async (req, res) => {
  // Recoger datos de la petición
  let params = req.body;

  // Comprobar que se envíen todos los datos necesarios
  if (!params.name || !params.password || !params.email) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  try {
    // Control de usuarios duplicados
    const users = await User.find({ email: params.email.toLowerCase() }).exec();

    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe",
      });
    }

    // Cifrar la contraseña
    let pwd = await bcrypt.hash(params.password, 10);
    params.password = pwd;

    // Crear objeto de usuario
    let user_to_save = new User(params);

    // Guardar usuario en la base de datos
    const useStored = await user_to_save.save();

    if (!useStored) {
      return res.status(500).json({ status: "error", message: "Error al guardar en la bbdd" });
    }

    // Devolver resultado
    return res.status(200).json({
      status: "success",
      message: "Usuario registrado correctamente",
      params,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Error al guardar en la bbdd" });
  }
};

// Acción de inicio de sesión
const login = async (req, res) => {
  // Recoger parámetros del body
  let params = req.body;

  try {
    // Buscar en la bbdd
    const user = await User.findOne({ email: params.email }).exec();

    if (!user) {
      return res.status(404).send({ status: "error", message: "No existe el usuario" });
    }

    // Comprobar la contraseña
    const pwd = bcrypt.compareSync(params.password, user.password);

    if (!pwd) {
      return res.status(400).send({
        status: "error",
        message: "No te has identificado correctamente",
      });
    }

    // Conseguir token
    const token = false;

    // Devolver datos del usuario
    return res.status(200).send({
      status: "success",
      message: "Te has identificado correctamente",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Error en la consulta" });
  }
};

// Exportar acciones
module.exports = {
  pruebaUser,
  register,
  login,
};
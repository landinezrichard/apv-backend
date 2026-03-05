import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // console.log("Aca el token: ",req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Token decoded: ", decoded);

      // Agregar el veterinario a la request
      req.veterinario = await Veterinario.findById(decoded.id).select(
        "-password -token -confirmado -createdAt -updatedAt -__v"
      );
      return next();
    } catch (error) {
      const error1 = new Error("Token no válido");
      return res.status(403).json({ msg: error1.message });
    }
  }

  if (!token) {
    const error = new Error("Token no válido o inexistente");
    return res.status(403).json({ msg: error.message });
  }
  next();
};

export default checkAuth;

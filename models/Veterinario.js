import mongoose from "mongoose";
import argon2 from "argon2";
import generarId from "../helpers/generarId.js";

// Definimos el esquema de Veterinario
const veterinarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telefono: {
    type: String,
    trim: true,
    default: null,
  },
  web: {
    type: String,
    trim: true,
    default: null,
  },
  token: {
    type: String,
    default: generarId,
  },
  confirmado: {
    type: Boolean,
    default: false,
  },
});

// Hashear contraseña antes de guardar
veterinarioSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await argon2.hash(this.password);
});

// Método para comprobar contraseña
veterinarioSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await argon2.verify(this.password, passwordFormulario);
};

// Definimos el modelo
const Veterinario = mongoose.model("Veterinario", veterinarioSchema);

export default Veterinario;

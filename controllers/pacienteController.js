import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  // Comprobar si el paciente existe
  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Verificar que el paciente pertenece al veterinario autenticado
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
  }

  res.json(paciente);
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  // Comprobar si el paciente existe
  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Verificar que el paciente pertenece al veterinario autenticado
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
  }

  // Actualizar los campos del paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);

  // Comprobar si el paciente existe
  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Verificar que el paciente pertenece al veterinario autenticado
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    const pacienteEliminado = await paciente.deleteOne();
    res.json({ msg: "Paciente eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};

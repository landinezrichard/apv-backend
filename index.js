import express from "express";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());

// Definir puerto
const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
conectarDB();

// Política CORS

// Dominios permitidos
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
     if (whiteList.includes(origin)) {
      // El origen del Request está permitido
      callback(null, true);
    } else {
      // El origin no está permitido
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

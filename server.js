import express from "express";

import rotasAuth from "./routes/auth.js";
import rotasUser from "./routes/users.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", rotasAuth);
app.use("/", rotasUser);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

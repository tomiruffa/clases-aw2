import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";

const PORT = 3000;

const app = express();

const tablaUsuario = {
  nombre: "admin",
  pass: "123",
};

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post("/autenticacion", (req, res) => {
  const { usuario, pass } = req.body;
  if (usuario === tablaUsuario.nombre && pass === tablaUsuario.pass) {
    // Cookie
    res.cookie("sessionId", 123456, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 10, // Milisegundos
    });

    return res.redirect("/admin");
  }
  res.redirect("/login");
});

// Estaticos
function verificarCookie(req, res, next) {
  console.log(req.cookies);
  if (req.cookies.sessionId === "123456") {
    return next();
  }
  res.redirect("/login?autorizado=false");
}

app.use("/admin", verificarCookie, express.static(path.resolve("./front")));
app.use("/login", express.static(path.resolve("./login")));

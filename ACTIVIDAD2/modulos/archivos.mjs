import fsp from "node:fs/promises";
import path from "node:path";

export { escribirJson, leerJson };

async function escribirJson(usuariosFormateados) {
  try {
    const ruta = path.join(import.meta.dirname, "..", "usuariosFormateados.json");
    await fsp.writeFile(ruta, JSON.stringify(usuariosFormateados, null, 2));
  } catch (error) {
    console.log(error);
  }
}

const leerJson = async () => {
  try {
    const ruta = path.join(import.meta.dirname, "..", "usuariosFormateados.json");
    const datosUsuarios = await fsp.readFile(ruta, "utf-8");
    return JSON.parse(datosUsuarios);
  } catch (error) {
    console.log(error);
  }
};

export { obtenerDatos };

async function obtenerDatos() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/users');
    const datos = await res.json();
    const usuariosFormateados = datos.map((user) => {
      const usuarioListo = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return usuarioListo;
    });
    return usuariosFormateados;
  } catch (error) {
    console.log(error);
  }
}

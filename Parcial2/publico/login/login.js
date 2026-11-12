// Muestra el mensaje según el query string (?error= o ?sesion=)
const mensajes = {
    credenciales: 'Usuario o contraseña incorrectos.',
    incompletos: 'Completá usuario y contraseña.',
    servidor: 'Error del servidor, intentá de nuevo.',
    requerida: 'Iniciá sesión para continuar.',
    expirada: 'Tu sesión expiró, volvé a ingresar.',
    invalida: 'Sesión inválida, volvé a ingresar.',
    cerrada: 'Cerraste sesión.',
}

const parametros = new URLSearchParams(window.location.search)
const clave = parametros.get('error') ?? parametros.get('sesion')
const elemento = document.getElementById('mensaje')

if (mensajes[clave]) {
    elemento.textContent = mensajes[clave]
    elemento.classList.add(parametros.has('error') ? 'aviso--error' : 'aviso--info')
    elemento.classList.remove('oculto')
}

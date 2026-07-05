function validarCorreo(correo) { //Creacion de la funcion para verificar correos
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; //Uso de expresiones regulares
    return regexCorreo.test(correo);//Regresa el valor de correo
}

function soloLetras(texto) {//Creacion de la funcion para que solo acepte letras may y min y las vocales acentuadas
    const regexLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;//Uso de expresiones regulares
    return regexLetras.test(texto.trim()) && texto.trim().length > 0;
    // texto.trim() quita espacios sobrantes al inicio/final antes de probar el patrón
    // && texto.trim().length > 0 evita que un texto de solo espacios se considere válido
}

function validarLongitud(numero, maxLongitud) {
    const soloDigitos = String(numero).replace(/[^0-9]/g, "");//Convierte los string a numeros y elimina lo que no sea digito
    return soloDigitos.length > 0 && soloDigitos.length <= maxLongitud;//Validado si hay numeros del 1 al maximo
}

function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);//Se convierte a un objeto date
    const hoy = new Date();//fecha y hora actual

    let edad = hoy.getFullYear() - nacimiento.getFullYear();//año actual menos fecha de nacimiento
    const mesActual = hoy.getMonth() - nacimiento.getMonth();//mes actual menos el mes de nacimiento

    if (mesActual < 0 || (mesActual === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    //Si el dia de cumpleaños aun no pasa y es el mismo mes se le resta un año a la edad
    }

    return edad;//Se devuelve edad
}  

function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;//Regresa si si calcularEdad es mayor o igual a 18 
}

function validarPassword(password) {
    const tieneMayuscula = /[A-Z]/.test(password);//Busca al menos una letra mayúscula en cualquier parte del texto
    const tieneMinuscula = /[a-z]/.test(password);//Busca una minuscula
    const tieneNumero = /[0-9]/.test(password);//Busca si tiene aunque sea un numero
    const tieneEspecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);//Busca si tiene algun caracter especial
    const longitudValida = password.length >= 8;//Valida que tenga minimo 8 caracteres

    return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial && longitudValida;
    //Verifica que todo se cumpla
}

function validarTelefono(telefono) {
    const soloDigitos = String(telefono).replace(/[^0-9]/g, "");//Se convierte todo a string y se elimina lo que sea digito o espacio
    return /^[0-9]{10}$/.test(soloDigitos);
        // Verificamos que, después de limpiar, queden EXACTAMENTE 10 dígitos
}

function validarCURP(curp) {
    const curpNormalizada = curp.toUpperCase().trim();//toUpperCase por si solo se escriben minusculas
    const regexCURP = /^[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM](AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QO|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[^AEIOU]{3}[0-9A-Z][0-9]$/;

    return regexCURP.test(curpNormalizada);
}


function manejarSubmit(event) {  // event es el objeto que representa el envío del formulario
    event.preventDefault();// No recarga la página

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const curp = document.getElementById("curp").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const password = document.getElementById("password").value;

    let formularioValido = true;//Empieza en true y regresa si falla algo

    //Validación del nombre
    if (!soloLetras(nombre)) {
        document.getElementById("errorNombre").textContent = "El nombre solo debe contener letras.";
        document.getElementById("nombre").classList.add("invalido");//Pone el texto en rojo
        formularioValido = false;
    } else {
        document.getElementById("errorNombre").textContent = "";
        document.getElementById("nombre").classList.remove("invalido");
        // Si si es válido limpiamos el mensaje de error y quitamos el borde rojo
    }

    //Validación del correo
    if (!validarCorreo(correo)) {
        document.getElementById("errorCorreo").textContent = "Correo electrónico no válido.";
        document.getElementById("correo").classList.add("invalido");
        formularioValido = false;
    } else {
        document.getElementById("errorCorreo").textContent = "";
        document.getElementById("correo").classList.remove("invalido");
    }

    //Validación de teléfono
    if (!validarTelefono(telefono)) {
        document.getElementById("errorTelefono").textContent = "El teléfono debe tener 10 dígitos.";
        document.getElementById("telefono").classList.add("invalido");
        formularioValido = false;
    } else {
        document.getElementById("errorTelefono").textContent = "";
        document.getElementById("telefono").classList.remove("invalido");
    }

    //Validación de CURP
    if (!validarCURP(curp)) {
        document.getElementById("errorCurp").textContent = "La CURP no tiene un formato válido (18 caracteres).";
        document.getElementById("curp").classList.add("invalido");
        formularioValido = false;
    } else {
        document.getElementById("errorCurp").textContent = "";
        document.getElementById("curp").classList.remove("invalido");
    }

    //Validación de fecha de nacimiento
    if (!fechaNacimiento || !esMayorDeEdad(fechaNacimiento)) {//Ambos casos, si esta vacio el campo y si es menor
        document.getElementById("errorFecha").textContent = "Debes ser mayor de edad para registrarte.";
        document.getElementById("fechaNacimiento").classList.add("invalido");
        formularioValido = false;
    } else {
        document.getElementById("errorFecha").textContent = "";
        document.getElementById("fechaNacimiento").classList.remove("invalido");
    }

    //Validación de password
    if (!validarPassword(password)) {
        document.getElementById("errorPassword").textContent = "Requiere mayúscula, minúscula, número, carácter especial y 8+ caracteres.";
        document.getElementById("password").classList.add("invalido");
        formularioValido = false;
    } else {
        document.getElementById("errorPassword").textContent = "";
        document.getElementById("password").classList.remove("invalido");
    }

    // Si cualquier validación falló, formularioValido quedó en false y se detiene todo aqui
    if (!formularioValido) {
        console.log("Formulario con errores, no se registró el usuario.");
        return false; 
    }

    const edad = calcularEdad(fechaNacimiento);
    // calcularEdad() de la librería obtiene la edad exacta a partir de la fecha

    //Permite insertar variables con ${----}
    console.log(`Usuario registrado: ${nombre}, ${correo}, CURP ${curp}, edad ${edad}`);

    // Llamamos a la función que abre el modal, pasándole la edad ya calculada
    mostrarModal(edad);

    return false; // evita que se recargue el formulario
}

// Función que llena el modal con la edad y lo hace visible
function mostrarModal(edad) {
    document.getElementById("edadCalculada").textContent = edad;
    document.getElementById("estadoEdad").textContent = esMayorDeEdadDesdeEdad(edad)
        ? "Eres mayor de edad."
        : "Eres menor de edad.";
    // classList.add("activo") activa la clase CSS que hace visible el overlay del modal
    document.getElementById("modalEdad").classList.add("activo");
}

// Función que cierra el modal y reinicia el formulario para un nuevo registro
function cerrarModal() {
    // classList.remove("activo") quita la clase que mostraba el modal (vuelve a ocultarse)
    document.getElementById("modalEdad").classList.remove("activo");
    // Vacia todos los inputs
    document.getElementById("formRegistro").reset();
}

function esMayorDeEdadDesdeEdad(edad) {
    // Compara el número de edad ya calculado con 18
    return edad >= 18;
}


function manejarLogin(event) {
    // Cancela el reload normal que haría el navegador al enviar el form
    event.preventDefault();

    const correo = document.getElementById("correoLogin").value;
    const password = document.getElementById("passwordLogin").value;

    let loginValido = true;

    //Validación de correo
    if (!validarCorreo(correo)) {
        document.getElementById("errorCorreoLogin").textContent = "Correo electrónico no válido.";
        document.getElementById("correoLogin").classList.add("invalido");
        loginValido = false;
    } else {
        document.getElementById("errorCorreoLogin").textContent = "";
        document.getElementById("correoLogin").classList.remove("invalido");
    }

    //Validación de password
    if (!validarPassword(password)) {
        document.getElementById("errorPasswordLogin").textContent = "Contraseña inválida: requiere mayúscula, minúscula, número, carácter especial y 8+ caracteres.";
        document.getElementById("passwordLogin").classList.add("invalido");
        loginValido = false;
    } else {
        document.getElementById("errorPasswordLogin").textContent = "";
        document.getElementById("passwordLogin").classList.remove("invalido");
    }

    // Si alguna de las dos validaciones falló, no dejamos pasar el login
    if (!loginValido) {
        console.log("Login fallido: datos inválidos.");
        return false;
    }

    // Si ambas validaciones pasaron, "iniciamos sesión" (aquí solo simulado con consola y alert)
    console.log(`Login exitoso para: ${correo}`);
    alert("Login exitoso. Bienvenido/a.");

    return false; // evita el reload del formulario
}
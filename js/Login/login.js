const url = 'https://api-monkers-entertainment.000webhostapp.com/realizaLogin.php';
const nmUsuario = 'brasileirr';
const senhaUsuario = 'hello';
const emailUsuario = 'hello@gmail.com';

fetch(`${url}?nm_usuario=${nmUsuario}&senha_usuario=${senhaUsuario}&email_usuario=${emailUsuario}`, {
        method: "GET",
    })
    .then(function(response) { 
        return response.json();
    })
    .then(function(data) {
        console.log("Dados validos: "+data.response);
    });
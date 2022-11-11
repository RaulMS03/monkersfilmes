const url = 'https://api-monkers-entertainment.000webhostapp.com/consultaLogin.php';
var nmUsuario = '';
var emailUsuario = '';
var senhaUsuario = '';

function realizaLogin(){
    let emailOuUsuario = document.getElementById("nome-ou-email-usuario").value;
    if(emailOuUsuario.includes("@")){
        console.log("É valido "+validaEmail(emailOuUsuario))
        if(validaEmail(emailOuUsuario)){
            emailUsuario = emailOuUsuario;
            senhaUsuario = document.getElementById("senha-usuario").value;
            realizaRequisicao(nmUsuario, emailUsuario, senhaUsuario);
        } else {
            document.getElementById("alerta-login").innerText = 'Certifique-se de colocar um e-mail válido';
            document.getElementById('alerta-login').style.display = 'Block';
        }
    } else {
        nmUsuario = emailOuUsuario;
        senhaUsuario = document.getElementById("senha-usuario").value;
        realizaRequisicao(nmUsuario, emailUsuario, senhaUsuario)
    }
}

function validaEmail(email){
    email = email.replace(/^\s+|\s+$/g, '')
    email = email.split("@")
    if(email.length > 1){
        if((email[0].length > 0 && !email[0].includes(' ')) && (email[1].length > 0 && !email[1].includes(' '))){
            return true;
        } else
            return false;
    } else 
        return false;
}

function realizaRequisicao(nmUsuario, emailUsuario, senhaUsuario, ){
    fetch(`${url}?nm_usuario=${nmUsuario}&senha_usuario=${senhaUsuario}&email_usuario=${emailUsuario}`, {
            method: "GET",
        }).then(function(response) { 
            return response.json();
        }).then(function(data) {
            if(data.response == "True"){
                document.getElementById('alerta-login').style.display = 'none';
                document.getElementById("sucesso-login").innerText = 'Sucesso ao logar.';
                document.getElementById('sucesso-login').style.display = 'Block';
            } else if (data.response == "False") {
                document.getElementById("alerta-login").innerText = 'Usário ou senha incorrentos.';
                document.getElementById('alerta-login').style.display = 'Block'; 
            }
        });
}
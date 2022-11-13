function validaDadosLogin(){
    let nmUsuario = '';
    let emailUsuario = '';
    let senhaUsuario = '';
    let emailOuUsuario = document.getElementById("nome-ou-email-usuario").value;
    
    if(emailOuUsuario.includes("@")){
        if(validaEmail(emailOuUsuario)){
            emailUsuario = emailOuUsuario;
            senhaUsuario = document.getElementById("senha-usuario").value;
            consultaDadosLogin(nmUsuario, emailUsuario, senhaUsuario);
        } else {
            document.getElementById("alerta-login").innerText = 'Certifique-se de colocar um e-mail válido.';
            document.getElementById('alerta-login').style.display = 'Block';
        }
    } else {
        nmUsuario = emailOuUsuario;
        senhaUsuario = document.getElementById("senha-usuario").value;
        consultaDadosLogin(nmUsuario, emailUsuario, senhaUsuario)
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

function consultaDadosLogin(nmUsuario, emailUsuario, senhaUsuario){
    const url = 'http://api-monkers-entertainment.coolpage.biz/get/consultaLogin.php';
    
    fetch(`${url}?nm_usuario=${nmUsuario}&senha_usuario=${senhaUsuario}&email_usuario=${emailUsuario}`, {
            method: "GET",
        }).then(function(response) { 
            return response.json();
        }).then(function(data) {
            if(data.response == "True"){
                document.getElementById('alerta-login').style.display = 'none';
                document.getElementById('sucesso-login').innerText = 'Sucesso ao logar.';
                document.getElementById('sucesso-login').style.display = 'block';
                dadosLogin = data.data;
                localStorage.setItem('cd_usuario', dadosLogin['cd_usuario']);
                localStorage.setItem('nome_usuario', dadosLogin['nome_usuario']);
                localStorage.setItem('email_usuario', dadosLogin['email_usuario']);
                localStorage.setItem('senha_usuario', dadosLogin['senha_usuario']);
                localStorage.setItem('cd_foto_perfil', dadosLogin['cd_foto_perfil']);
                localStorage.setItem('url_foto_perfil', dadosLogin['url_foto_perfil']);
                window.location.href = "../Catalogo/catalogo.html";
            } else if (data.response == "False") {
                document.getElementById('alerta-login').innerText = 'Usuário ou senha incorretos.';
                document.getElementById('alerta-login').style.display = 'block'; 
            }
        });
}

addEventListener('load', () => {
    if(sessionStorage.getItem('senhaUsuario')){
        let emailUsuario = sessionStorage.getItem('emailUsuario');
        let senhaUsuario = sessionStorage.getItem('senhaUsuario');
        
        document.getElementById('nome-ou-email-usuario').value = emailUsuario;
        document.getElementById('senha-usuario').value = senhaUsuario ;

        sessionStorage.removeItem('emailUsuario');
        sessionStorage.removeItem('senhaUsuario');
    }
});

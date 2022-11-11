
addEventListener('load', () => {
    if(localStorage.getItem('url_foto_perfil')){
        let nomeUsuario = localStorage.getItem('nome_usuario');
        let urlFotoPerfil = localStorage.getItem('url_foto_perfil');

        /*
        localStorage.removeItem('cd_usuario');
        localStorage.removeItem('nome_usuario');
        localStorage.removeItem('email_usuario');
        localStorage.removeItem('senha_usuario');
        localStorage.removeItem('cd_foto_perfil');
        localStorage.removeItem('url_foto_perfil');
        */

        document.getElementById('b-nome-usuario').innerText = nomeUsuario;
        document.getElementById('img-foto-perfil').src = urlFotoPerfil
    } else {
        window.location.href = '../Login/login.html'
    }
});
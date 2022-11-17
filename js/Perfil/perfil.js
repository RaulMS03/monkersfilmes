addEventListener("load", () => {
    if(localStorage.getItem('url_foto_perfil')){
        let nomeUsuario = localStorage.getItem('nome_usuario');
        let urlFotoPerfil = localStorage.getItem('url_foto_perfil');

        document.getElementById('nome-usuario').innerText = nomeUsuario;
        document.getElementById('img-foto-perfil').src = urlFotoPerfil;

        data = consultaDadosFtosPerfil();
        
        data.then(promise => {
            
            let index = 0;
            while(index < promise.length){

                let imgPerfil = document.getElementById(`perfil-${index+1}`);
                let fotoPerfil = promise[index]['url_foto_perfil'];

                imgPerfil.src = fotoPerfil;

                index++;
            }

        });

    } else {
        window.location.href = '../Login/login.html';
    }
});

function consultaDadosFtosPerfil(){
    const url = 'http://api-monkers-entertainment.coolpage.biz/get/consultaFotosDePerfil.php';
    
    return fetch(url, {
            method: "GET",
        }).then(function(response) { 
            return response.json();
        }).then(function(data) {
            if(data.response == "True")
                return data.data;
        });
}
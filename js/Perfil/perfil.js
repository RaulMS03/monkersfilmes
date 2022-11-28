addEventListener("load", () => {
    if(localStorage.getItem('url_foto_perfil')){
        let nomeUsuario = localStorage.getItem('nome_usuario');
        document.getElementById('nome-usuario').value = nomeUsuario;
        let senhaUsuario = localStorage.getItem('senha_usuario');
        document.getElementById('senha-usuario').value = senhaUsuario;
        let emailUsuario = localStorage.getItem('email_usuario');
        document.getElementById('email-usuario').value = emailUsuario;
        let dataDeNascimento = localStorage.getItem('data_de_nascimento');

        if(dataDeNascimento != 'null' && dataDeNascimento != '0000-00-00')
            document.getElementById('data-de-nascimento-usuario').value = dataDeNascimento;
            
        const dadosPersonalidades = consultaDadosPersonalidades();

        dadosPersonalidades.then(promise => {
            let myParent = document.body;
            let selectPersonalidades = document.getElementById("personalidade-usuario");

            myParent.appendChild(selectPersonalidades);

            let data = promise['data'];

            data.forEach(personalidade => {
                let option = document.createElement("option");
                option.value = personalidade['cd_personalidade'];
                option.id = `cd-personalidade-${personalidade['cd_personalidade']}`;
                option.text = `${personalidade['nm_personalidade']} - ${personalidade['sigla_personalidade']}`;
                selectPersonalidades.appendChild(option);
            });

            let cdPersonalidade = localStorage.getItem('cd_personalidade');
            if(cdPersonalidade != 'null')
                document.getElementById('personalidade-usuario').value = cdPersonalidade;
        });
            
        let data = consultaDadosFtosPerfil();
        
        data.then(promise => {
            let fotoDePerfilDoUsuario = localStorage.getItem('url_foto_perfil');
            let imgsPerfil = document.querySelectorAll('#img-perfil');
            imgsPerfil.forEach((imgPerfilElement, index) => {
                let urlFotoPerfil = promise[index]['url_foto_perfil'];
                let cdFotoPerfil = promise[index]['cd_foto_perfil'];

                imgPerfilElement.alt = `codigo-${cdFotoPerfil}`;
                imgPerfilElement.src = urlFotoPerfil;
                
                if(fotoDePerfilDoUsuario == urlFotoPerfil) 
                    imgPerfilElement.classList.add('foto-selecionada');
            })
        });

        let imgsPerfilElement = document.querySelectorAll('#img-perfil');

        imgsPerfilElement.forEach(imgPerfilElement => {
            imgPerfilElement.addEventListener('click', () => {
                let imgPerfilSelecionada = document.querySelector('.foto-selecionada');
                imgPerfilSelecionada.classList.remove('foto-selecionada');
                imgPerfilSelecionada = imgPerfilElement;
                imgPerfilSelecionada = imgPerfilSelecionada.classList.add('foto-selecionada');
            });
        })

        let botaoSalvarAlteracoes = document.getElementById('salvar-alteracoes');

        botaoSalvarAlteracoes.addEventListener('click', () => {
            let idUsuario = localStorage.getItem('cd_usuario');
            let nomeUsuario = document.getElementById('nome-usuario').value.split(' ').join('');
            let dataDeNascimento = document.getElementById('data-de-nascimento-usuario').value.split(' ').join('');
            let senhaUsuario = document.getElementById('senha-usuario').value.split(' ').join('');
            let emailUsuario = document.getElementById('email-usuario').value.split(' ').join('');
            let cdPersonalidadeUsuario = document.getElementById('personalidade-usuario').value.split(' ').join('');
            
            let imgFotoPerfilElement = document.querySelector('.foto-selecionada');
            let cdFotoPerfil = imgFotoPerfilElement.alt.split('-')[1];


            if(!validaEmail(emailUsuario) || emailUsuario.length > 90)
                emailUsuario = localStorage.getItem('email_usuario');

            if(nomeUsuario.length < 3 || nomeUsuario.length > 90)
                nomeUsuario = localStorage.getItem('nome_usuario');
            
            if(senhaUsuario.length < 3 || senhaUsuario.length > 15)
                senhaUsuario = localStorage.getItem('senha_usuario');

            if(cdPersonalidadeUsuario < 1)
                cdPersonalidadeUsuario = null;

            if(!dataDeNascimento)
                dataDeNascimento = null;

            atualizaDadosUsuario(idUsuario, nomeUsuario, dataDeNascimento, emailUsuario,
                senhaUsuario, cdPersonalidadeUsuario, cdFotoPerfil);
        });
    } else {
        window.location.href = '../Login/login.html';
    }
});

function consultaDadosFtosPerfil(){
    const url = 'https://monkers-entertainment-api.000webhostapp.com/get/consultaFotosDePerfil.php';
    
    return fetch(url, {
        method: "GET",
    }).then(response => { 
        return response.json();
    }).then(data => {
        if(data.response == "True")
            return data.data;
    });
}

function consultaDadosPerfilPorId(idUsuario){
    const url = `https://monkers-entertainment-api.000webhostapp.com/get/consultaDadosUsuario.php`;
    const cd_usuario = idUsuario;

    return fetch(`${url}?cd_usuario=${cd_usuario}`, {
        method: "GET",
    }).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
}

function consultaDadosPersonalidades(){
    const url = 'https://monkers-entertainment-api.000webhostapp.com/get/consultaPersonalidades.php';
    
    return fetch(url, {
        method: "GET",
    }).then(response => { 
        return response.json();
    }).then(data => {
        return data;
    });
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

function atualizaDadosUsuario(cdUsuario, nomeUsuario, dataDeNascimento, emailUsuario, senhaUsuario, cdPersonalidadeUsuario, cdFotoPerfil){
    const url = 'https://monkers-entertainment-api.000webhostapp.com/post/atualizaDadosUsuario.php';
    
    let parametros = new FormData();
    
    parametros.append('cd_usuario', cdUsuario);
    parametros.append('nm_usuario', nomeUsuario);
    parametros.append('data_de_nascimento', dataDeNascimento);
    parametros.append('email_usuario', emailUsuario);
    parametros.append('senha_usuario', senhaUsuario);
    parametros.append('cd_personalidade', cdPersonalidadeUsuario);
    parametros.append('cd_foto_perfil', cdFotoPerfil);

    fetch(url, {
        method: "POST",
        body: parametros,
    })
    .then(function (response){ // pegando o resultado
        return response.json();
    }) 
    .then(function (data){
        if(data.response == "True"){
            localStorage.removeItem('cd_usuario');
            localStorage.removeItem('nome_usuario');
            localStorage.removeItem('data_de_nascimento');
            localStorage.removeItem('email_usuario');
            localStorage.removeItem('senha_usuario');
            localStorage.removeItem('cd_foto_perfil');
            localStorage.removeItem('url_foto_perfil');
            sessionStorage.setItem('emailUsuario', emailUsuario);
            sessionStorage.setItem('senhaUsuario', senhaUsuario);
            window.location.href = "../Login/login.html";
        } else {
            window.location.href = "../Perfil/perfil.html";
        }
    });
}
addEventListener('load', () => {
    if(localStorage.getItem('url_foto_perfil')){
        if (sessionStorage.getItem('idEntreterimento')) {
            let idEntreterimento = sessionStorage.getItem('idEntreterimento');
            let tipoEntreterimento = sessionStorage.getItem('tipoEntreterimento');

            let data = consultaEntreterimentoPorId(idEntreterimento, tipoEntreterimento);

            data.then(promise => {
                let tituloEntreterimento = promise['title'];
                document.getElementById('titulo-entreterimento').innerText = tituloEntreterimento;
                let duracaoEntreterimento = promise['runtime'];
                if (duracaoEntreterimento)
                    duracaoEntreterimento = `${duracaoEntreterimento} minutos`;
                let lancamentoEntreterimento = promise['release_date'];
                if (lancamentoEntreterimento) {
                    lancamentoEntreterimento = new Date(lancamentoEntreterimento);
                    lancamentoEntreterimento = lancamentoEntreterimento.toLocaleDateString('pt-BR');
                }
                let generosEntreterimento = promise['genres'];
                if (generosEntreterimento) {
                    let quantidadeGeneros = generosEntreterimento.length;
                    if (quantidadeGeneros > 1) {
                        let indice = 0;
                        let generos = [];
                        while(indice < quantidadeGeneros) {
                            generos.push(generosEntreterimento[indice]['name']);
                            indice++;
                        }
                        generosEntreterimento = generos.join(', ');
                    }
                    else
                        generosEntreterimento = generosEntreterimento[0]['name'];
                }
                let imgElement = document.getElementById('img-poster');
                imgElement.alt = `${tipoEntreterimento}-${idEntreterimento}`;
                let posterEntreterimento = `https://image.tmdb.org/t/p/w500${promise['poster_path']}`;
                if(posterEntreterimento){
                    imgElement.src = `https://image.tmdb.org/t/p/w500${posterEntreterimento}`;
                } else {
                    imgElement.className = 'img-nao-encontrada';
                    imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                }
                document.getElementById('duracao-ano-genero').innerText = `${generosEntreterimento}, ${lancamentoEntreterimento}, ${duracaoEntreterimento}`;
                let sinopseEntreterimento = promise['overview'];
                document.getElementById('sinopse-entreterimento').innerText = sinopseEntreterimento;
            });
            
        } else {
            window.location.href = './catalogo.html';
        }
    } else {
        window.location.href = '../Login/login.html';
    }
});

// mediaType -> tipo de midia: all, movie, tv e person.
// id -> id do filme ou serie em questão.
function consultaEntreterimentoPorId(id, mediaType){
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';

    return fetch(`${url}?api_key=${api_key}&language=${language}`, {
        method: "GET",
    }).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
}
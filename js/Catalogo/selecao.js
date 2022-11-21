addEventListener('load', () => {
    if(localStorage.getItem('url_foto_perfil')){
        let urlFotoPerfil = localStorage.getItem('url_foto_perfil');
        document.getElementById('img-foto-perfil').src = urlFotoPerfil;

        if (sessionStorage.getItem('idEntreterimento')) {
            let idEntreterimento = sessionStorage.getItem('idEntreterimento');
            let tipoEntreterimento = sessionStorage.getItem('tipoEntreterimento');

            let data = consultaEntreterimentoPorId(idEntreterimento, tipoEntreterimento);

            data.then(promise => {
                let tituloEntreterimento = promise['title'] || promise['name'];
                document.getElementById('titulo-entreterimento').innerText = tituloEntreterimento;
                
                let duracaoEntreterimento = promise['runtime'] || promise['episode_run_time'];
                if (duracaoEntreterimento)
                    duracaoEntreterimento = `${duracaoEntreterimento} minutos.`;
                else 
                    duracaoEntreterimento = '0 minutos.';
                let lancamentoEntreterimento = promise['release_date'] || promise['first_air_date'];
                if (lancamentoEntreterimento) {
                    lancamentoEntreterimento = new Date(lancamentoEntreterimento);
                    lancamentoEntreterimento = lancamentoEntreterimento.toLocaleDateString('pt-BR');
                } else 
                    lancamentoEntreterimento = 'Não há uma data definida.';
                
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
                    else if (quantidadeGeneros == 1)
                        generosEntreterimento = generosEntreterimento[0]['name'];
                    else 
                        generosEntreterimento = 'nenhum no momento.';

                }
                
                let imgElement = document.getElementById('img-poster');
                imgElement.alt = `${tipoEntreterimento}-${idEntreterimento}`;
                
                let posterEntreterimento = promise['poster_path'];
                if(posterEntreterimento){
                    imgElement.src = `https://image.tmdb.org/t/p/w500${posterEntreterimento}`;
                } else {
                    imgElement.className = 'img-poster-nao-encontrado';
                    imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                }
                
                document.getElementById('duracao-ano-genero').innerText = `Genêro(s): ${generosEntreterimento} \n Lançado(a) em: ${lancamentoEntreterimento}\n Tempo de duração: ${duracaoEntreterimento} \n`;
                let sinopseEntreterimento = promise['overview'];
                document.getElementById('sinopse-entreterimento').innerText = sinopseEntreterimento;
            });

            data = consultaElencoEntreterimentoPorId(idEntreterimento, tipoEntreterimento);

            data.then(promise => {
                atribuiImg(promise, 'cast', 'img-elenco-', 'profile_path', 'person');
                data = promise['cast'].slice(0, 5);
            });
            
            data = consultaEntreterimentoSimilares(idEntreterimento, tipoEntreterimento)

            data.then(promise => {
                atribuiImg(promise, 'results', 'img-similar-', 'poster_path', tipoEntreterimento);
                data = promise['results'].slice(0, 5);
            });

            data = consultaEntreterimentoRecomendado(idEntreterimento, tipoEntreterimento);

            data.then(promise => {
                atribuiImg(promise, 'results', 'img-recomendacao-', 'poster_path', tipoEntreterimento);
            });

            // pegando todas as ancoras (links/href/a) com este respectivo id.
            let ancorasCatalogo = document.querySelectorAll('#detalhes-entreterimento');

            ancorasCatalogo.forEach(ancoraCatalogo => {
                ancoraCatalogo.addEventListener('click', () => {
                    // acessando o elemento 'img' e pegando o 'alt'.
                    let idEntreterimento = ancoraCatalogo.firstChild.nextElementSibling.alt;
                    tipoEntreterimento = idEntreterimento.split('-')[0];
                    idEntreterimento = idEntreterimento.split('-')[1];
                    sessionStorage.setItem('idEntreterimento', idEntreterimento);
                    sessionStorage.setItem('tipoEntreterimento', tipoEntreterimento);
                })
            });

        } else {
            window.location.href = './catalogo.html';
        }
    } else {
        window.location.href = '../Login/login.html';
    }
});

// dataTag -> local onde se encontra os principais dados da api.
// idImg -> id do elemento img onde queremos colocar a imagem.
// attrData -> atributo que queremos pegar.
// mediaType -> tipo de midia: all, movie, tv e person.
// idEntreterimento -> id do filme/serie/pessoa.
function atribuiImg(promise, dataTag, idImg, attrData, mediaType) {
    data = promise[dataTag].slice(0, 5);
    
    let index = 0;
    while(index < data.length) {
        let imgElement = document.getElementById(`${idImg}${index+1}`);
        let imgSrc = data[index][attrData];
        let idData = data[index]['id']; 

        imgElement.alt = `${mediaType}-${idData}`;
        if(imgSrc){
            imgElement.src = `https://image.tmdb.org/t/p/w200${imgSrc}`;
        } else {
            imgElement.className = 'img-nao-encontrada';
            imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
        }

        index++;
    }
}

// mediaType -> tipo de midia: all, movie, tv e person.
// id -> id do filme ou serie em questão.
function consultaEntreterimentoPorId(id, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const include_adult = 'false';
    const language = 'pt-BR';

    return fetch(`${url}?api_key=${api_key}&language=${language}`, {
        method: "GET",
    }).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
}

// mediaType -> tipo de midia: all, movie, tv e person.
// id -> id do filme ou serie em questão.
function consultaElencoEntreterimentoPorId(id, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}/credits`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const sort_by  = 'popularity.desc';

    return fetch(`${url}?api_key=${api_key}&sort_by=${sort_by}&language=${language}`, {
        method: "GET",
    }).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
}

// mediaType -> tipo de midia: all, movie, tv e person.
// id -> id do filme ou serie em questão.
function consultaEntreterimentoSimilares(id, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}/similar`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const include_adult = 'false';
    const sort_by  = 'vote_average';

    return fetch(`${url}?api_key=${api_key}&sort_by=${sort_by}&include_adult=${include_adult}&language=${language}`, {
        method: "GET",
    }).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
}

// mediaType -> tipo de midia: all, movie, tv e person.
// id -> id do filme ou serie em questão.
function consultaEntreterimentoRecomendado(id, mediaType) {
    const url = `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const include_adult = 'false';
    const sort_by  = 'vote_average';

    return fetch(`${url}?api_key=${api_key}&sort_by=${sort_by}&include_adult=${include_adult}language=${language}`, {
        method: "GET",
    }).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
}
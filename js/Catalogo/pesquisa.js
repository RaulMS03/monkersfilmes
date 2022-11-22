addEventListener('load', () => {
    if(localStorage.getItem('url_foto_perfil')){        
        let mediaType = [
            'movie',
            'tv'
        ];
        
        let tipoEntreterimento = mediaType[Math.floor(Math.random() * 2)];
    
        // gera um indice randomico entre 0 e 1.
        // se for 0 entao sera listado os filmes, se for 1 sera listado as series
        let tipoEntreterimentoElement = document.getElementById('tipo-entreterimento');
        tipoEntreterimentoElement.innerText = tipoEntreterimento == 'movie' ? 'FILMES' : 'SÉRIES';

        data = consultaTendenciasTMDB(tipoEntreterimento, 'week');

        atribuiImgTendenciasTMDB(data, tipoEntreterimento);

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
        window.location.href = '../Login/login.html';
    }
});

// mediaType -> tipo de midia: all, movie, tv e person.
// timeWindow -> tempo que esta em tendencia -> day, week.
function consultaTendenciasTMDB(mediaType, timeWindow){
    const url = `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const sort_by = 'popularity.desc';
    const include_adult = 'false';
    const include_video= 'false';
    const page = '1';
    
    return fetch(`${url}?api_key=${api_key}&language=${language}&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}&page=${page}`, {
        method: "GET",
    }).then(response => { 
        return response.json();
    }).then(data => {
        return data;
    });
}

function atribuiImgTendenciasTMDB(data, tipoEntreterimento){
    data.then(promise => {
        data = promise['results'].slice(0, 3);

        let quantidadeEntreterimento = data.length;
        let index = 0;
        while(index < quantidadeEntreterimento) {
            let imgElement = document.getElementById(`entreterimento-${index+1}`);
            let posterEntreterimento = data[index]['poster_path'];
            let idData = data[index]['id']; 

            imgElement.alt = `${tipoEntreterimento}-${idData}`;
            if(posterEntreterimento){
                imgElement.src = `https://image.tmdb.org/t/p/w500${posterEntreterimento}`;
            } else {
                imgElement.className = 'img-poster-nao-encontrado';
                imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            }

            index++;
        }
    });
}

// mediaType -> tipo de midia: all, movie, tv e person.
function validaCampoDePesquisa(){
    let campoDeBusca = document.getElementById('campo-de-busca').value;
    let textoPesquisa = encodeURI(campoDeBusca);

    if(textoPesquisa.length > 1) {
        let data = pesquisaEntreterimento(textoPesquisa);

        data.then(promise => {
            data = promise['results'].slice(0, 3);
            
            let quantidadeResultado = data.length;
            let index = 0;
            while(index < quantidadeResultado) {
                let imgElement = document.getElementById(`entreterimento-${index+1}`);
                let imgSrc = data[index]['poster_path'];
                let idData = data[index]['id']; 
                let mediaType = data[index]['media_type'];
        
                imgElement.alt = `${mediaType}-${idData}`;
                if(imgSrc){
                    imgElement.src = `https://image.tmdb.org/t/p/w200${imgSrc}`;
                } else {
                    imgElement.className = 'img-nao-encontrada';
                    imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                }
        
                index++;
            }
    
            let tituloPesquisa = document.getElementById('titulo-pesquisa');
            textoPesquisa = decodeURI(textoPesquisa);
            tituloPesquisa.innerText = `Você pesquisou por: ${textoPesquisa}`;
        });
    } else {
        let mediaType = [
            'movie',
            'tv'
        ];
        
        let tipoEntreterimento = mediaType[Math.floor(Math.random() * 2)];
    
        // gera um indice randomico entre 0 e 1.
        // se for 0 entao sera listado os filmes, se for 1 sera listado as series
        let tipoEntreterimentoElement = document.getElementById('tipo-entreterimento');
        tipoEntreterimentoElement.innerText = tipoEntreterimento == 'movie' ? 'FILMES' : 'SÉRIES';

        data = consultaTendenciasTMDB(tipoEntreterimento, 'week');

        atribuiImgTendenciasTMDB(data, tipoEntreterimento);
    }
}

function pesquisaEntreterimento(textoPesquisa){
    const url = `https://api.themoviedb.org/3/search/multi`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const query = textoPesquisa;
    const sort_by = 'popularity.desc';
    const include_adult = 'false';
    const page = '1';
    
    return fetch(`${url}?api_key=${api_key}&language=${language}&sort_by=${sort_by}&query=${query}&include_adult=${include_adult}&page=${page}`, {
        method: "GET",
    }).then(response => { 
        return response.json();
    }).then(data => {
        return data;
    });
}
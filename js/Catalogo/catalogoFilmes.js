addEventListener('load', () => {
    if(localStorage.getItem('url_foto_perfil')){
        let urlFotoPerfil = localStorage.getItem('url_foto_perfil');

        document.getElementById('img-foto-perfil').src = urlFotoPerfil;

        // salva os dados das tendencias de filmes da semana
        let data = consultaTendenciasTMDB('week');

        data.then(promise => {
            data = promise['results'];

            let imgFundoFilme = '';
            let indiceFilme = '';

            // so para de executar quando acha um filme com backdrop.
            while (!imgFundoFilme) {
                // gera um indice randomico para selecionar um filme que esta em destaque
                indiceFilme = Math.floor(Math.random() * data.length);
                imgFundoFilme = data[indiceFilme]['backdrop_path'];
            }
            
            let idFilme = data[indiceFilme]['id'];
            let imgElement = document.getElementById('destaque');

            imgElement.alt = `movie-${idFilme}`;
            if(imgFundoFilme){
                imgFundoFilme = `https://image.tmdb.org/t/p/w500${data[indiceFilme]['backdrop_path']}`;
                imgElement.src = imgFundoFilme;
            } else {
                imgElement.className = 'img-nao-encontrada';
                imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            }
        });

        data = consultaPorGenero('16');

        data.then(promise => {
            atribuiDadosFilmes(promise, 'animacao')   
        });

        data = consultaPorGenero('27');

        data.then(promise => {
            atribuiDadosFilmes(promise, 'terror');
        });

        data = consultaPorGenero('36');

        data.then(promise => {
            atribuiDadosFilmes(promise, 'historia');  
        });

        data = consultaPorGenero('10749');

        data.then(promise => {
            atribuiDadosFilmes(promise, 'romance');
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
        window.location.href = '../Login/login.html'
    }
});

function atribuiDadosFilmes(promise, idFoto){
    data = promise['results'].slice(0, 4);
            
    let index = 0;
    while(index < data.length){
        let idFilme = data[index]['id'];
        let posterFilme = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;
        let imgElement = document.getElementById(`${idFoto}-${index+1}`);
        
        imgElement.alt = `movie-${idFilme}`;
        if(posterFilme){
            imgElement.src = `https://image.tmdb.org/t/p/w500${posterFilme}`;
        } else {
            imgElement.className = 'img-nao-encontrada';
            imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
        }
        
        index++;
    }  
}

// timeWindow -> tempo que esta em tendencia -> day, week.
function consultaTendenciasTMDB(timeWindow){
    const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}`;
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

// genreId -> id do genero.
function consultaPorGenero(genreId) {
    const url = `https://api.themoviedb.org/3/discover/movie`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const sort_by = 'popularity.desc';
    const include_adult = 'false';
    const include_video= 'false';
    const page = '1';

    return fetch(`${url}?api_key=${api_key}&language=${language}&sort_by=${sort_by}&include_adult=${include_adult}&include_video=${include_video}&with_genres=${genreId}&page=${page}`, {
        method: "GET",
    }).then(response => { 
        return response.json();
    }).then(data => {
        return data;
    });
}

function consultaAtualizacoesDaSemana() {
    const url = 'https://api.themoviedb.org/3/movie/changes';
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const sort_by = 'primary_release_date.desc';
    const include_adult = 'false';

    return fetch(`${url}?api_key=${api_key}&language=${language}&sort_by=${sort_by}&include_adult=${include_adult}`, {
        method: "GET",
    }).then(response => { 
        return response.json();
    }).then(data => {
        return data;
    });
}
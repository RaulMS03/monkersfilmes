addEventListener('load', () => {
    if(localStorage.getItem('url_foto_perfil')){
        let urlFotoPerfil = localStorage.getItem('url_foto_perfil');

        document.getElementById('img-foto-perfil').src = urlFotoPerfil;

        // salva os dados das tendencias de filmes da semana
        let data = consultaTendenciasTMDB('week');

        data.then(promise => {
            data = promise['results'].slice(0, 4);
            
            let idFilme = data[0]['id'];
            let posterFilme = `https://image.tmdb.org/t/p/w500${data[0]['backdrop_path']}`;

            let imgElement = document.getElementById('destaque');
            imgElement.src = posterFilme;
            imgElement.alt = idFilme;
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
        
        imgElement.alt = idFilme;
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
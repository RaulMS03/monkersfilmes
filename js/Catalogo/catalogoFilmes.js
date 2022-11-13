
addEventListener('load', () => {
    /*
    if(localStorage.getItem('url_foto_perfil')){
        let nomeUsuario = localStorage.getItem('nome_usuario');
        let urlFotoPerfil = localStorage.getItem('url_foto_perfil');


        localStorage.removeItem('cd_usuario');
        localStorage.removeItem('nome_usuario');
        localStorage.removeItem('email_usuario');
        localStorage.removeItem('senha_usuario');
        localStorage.removeItem('cd_foto_perfil');
        localStorage.removeItem('url_foto_perfil');

        document.getElementById('b-nome-usuario').innerText = nomeUsuario;
        document.getElementById('img-foto-perfil').src = urlFotoPerfil;



    } else {
        window.location.href = '../Login/login.html'
    }
    */

    // salva os dados das tendencias de filmes da semana
    let data = consultaTendenciasTMDB('week');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let idFilme = data[0]['id'];
        let posterFilme = `https://image.tmdb.org/t/p/w500${data[0]['backdrop_path']}`;

        let imgElement = document.getElementById('destaque');
        imgElement.src = posterFilme;
        imgElement.alt = idFilme;
    });

    data = consultaPorGenero('16');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idEntreterimento = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;

            let imgElement = document.getElementById(`animacao-${index+1}`);
            imgElement.src = posterSerie;
            imgElement.alt = idEntreterimento;
            
            index++;
        }    
    });

    data = consultaPorGenero('27');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idEntreterimento = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;

            let imgElement = document.getElementById(`terror-${index+1}`);
            imgElement.src = posterSerie;
            imgElement.alt = idEntreterimento;
            
            index++;
        }    
    });

    data = consultaPorGenero('36');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idEntreterimento = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;

            let imgElement = document.getElementById(`historia-${index+1}`);
            imgElement.src = posterSerie;
            imgElement.alt = idEntreterimento;
            
            index++;
        }    
    });

    data = consultaPorGenero('10749');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idEntreterimento = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;

            let imgElement = document.getElementById(`romance-${index+1}`);
            imgElement.src = posterSerie;
            imgElement.alt = idEntreterimento;
            
            index++;
        }    
    });
});

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
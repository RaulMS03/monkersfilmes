
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
        
        let idSerie = data[0]['id'];
        let posterSerie = `https://image.tmdb.org/t/p/w500${data[0]['backdrop_path']}`;
        let imgElement = document.getElementById('destaque');
        
        imgElement.alt = idSerie;
        if(posterSerie){
            imgElement.src = `https://image.tmdb.org/t/p/w500${posterSerie}`;
        } else {
            imgElement.className = 'img-nao-encontrada';
            imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
        }

    });

    data = consultaPorGenero('16');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idSerie = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;
            let imgElement = document.getElementById(`animacao-${index+1}`);
            
            imgElement.alt = idSerie
            if(posterSerie){
                imgElement.src = `https://image.tmdb.org/t/p/w500${posterSerie}`;
            } else {
                imgElement.className = 'img-nao-encontrada';
                imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            }
            
            index++;
        }    
    });

    data = consultaPorGenero('35');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idSerie = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;
            let imgElement = document.getElementById(`comedia-${index+1}`);
            
            imgElement.alt = idSerie;
            if(posterSerie){
                imgElement.src = `https://image.tmdb.org/t/p/w500${posterSerie}`;
            } else {
                imgElement.className = 'img-nao-encontrada';
                imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            }

            index++;
        }    
    });

    data = consultaPorGenero('36');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idSerie = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;
            let imgElement = document.getElementById(`historia-${index+1}`);
            
            imgElement.alt = idSerie;
            if(posterSerie){
                imgElement.src = `https://image.tmdb.org/t/p/w500${posterSerie}`;
            } else {
                imgElement.className = 'img-nao-encontrada';
                imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            }
            
            index++;
        }    
    });

    data = consultaPorGenero('10749');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idSerie = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;
            let imgElement = document.getElementById(`romance-${index+1}`);
            
            imgElement.alt = idSerie;
            if(posterSerie){
                imgElement.src = `https://image.tmdb.org/t/p/w500${posterSerie}`;
            } else {
                imgElement.className = 'img-nao-encontrada';
                imgElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            }
            
            index++;
        }    
    });
});

// timeWindow -> tempo que esta em tendencia -> day, week.
function consultaTendenciasTMDB(timeWindow){
    const url = `https://api.themoviedb.org/3/trending/tv/${timeWindow}`;
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
    const url = `https://api.themoviedb.org/3/discover/tv`;
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
    const url = 'https://api.themoviedb.org/3/tv/changes';
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
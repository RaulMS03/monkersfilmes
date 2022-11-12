
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
    let data = consultaTendenciasTMDB('movie', 'week');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idFilme = data[index]['id'];
            let posterFilme = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;

            imgElement = document.getElementById(`filme-${index+1}`);
            imgElement.src = posterFilme;
            imgElement.alt = idFilme;
            
            index++;
        }
    });

    // salva os dados das tendencias de series da semana
    data = consultaTendenciasTMDB('tv', 'week');

    data.then( promise => {
        data = promise['results'].slice(0, 4);
        
        let index = 0;
        while(index < data.length){
            let idSerie = data[index]['id'];
            let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;

            imgElement = document.getElementById(`serie-${index+1}`);
            imgElement.src = posterSerie;
            imgElement.alt = idSerie;
            
            index++;
        }    
    });

});

// mediaType -> tipo de midia: all, movie, tv e person.
// timeWindow -> tempo que esta em tendencia -> day, week.
function consultaTendenciasTMDB(mediaType, timeWindow){
    const url = `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`;
    const api_key = '0279131df8eec775fc20e8a5d97731f6';
    const language = 'pt-BR';
    const sort_by = 'popularity.desc';
    
    return fetch(`${url}?api_key=${api_key}&language=${language}&sort_by=${sort_by}`, {
                method: "GET",
            }).then(response => { 
                return response.json();
            }).then(data => {
                return data
            });
}   
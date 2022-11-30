addEventListener('load', () => {
    if(localStorage.getItem('url_foto_perfil')){
        let urlFotoPerfil = localStorage.getItem('url_foto_perfil');
        document.getElementById('img-foto-perfil').src = urlFotoPerfil;


        if(localStorage.getItem('cd_personalidade') != 'null') {
            let cdPersonalidade = localStorage.getItem('cd_personalidade');
            let dadosGenerosPersonalidades = consultaGenerosPorCdPersonalidadeETipoEntreterimento(cdPersonalidade, 'Tv');
            dadosGenerosPersonalidades.then(promise => {
                dadosGenerosPersonalidades = promise['data'];

                let tamanhoVetor = dadosGenerosPersonalidades.length;
                if(tamanhoVetor > 4) {
                    let dadosGeneros = [];
                    let numerosSorteados = [];
                    while (dadosGeneros.length < 4) {
                        dadosSorteados = Math.floor(Math.random() * tamanhoVetor);
                        if(numerosSorteados.indexOf(dadosSorteados) == -1){
                            dadosGeneros.push(dadosGenerosPersonalidades[dadosSorteados]);
                        }
                        numerosSorteados.push(dadosSorteados); 
                    }
                    dadosGenerosPersonalidades = [];
                    dadosGenerosPersonalidades = dadosGeneros;
                }

                dadosGenerosPersonalidades.forEach((dadosGeneroPersonalidade, key) => {
                    let nmGenero = dadosGeneroPersonalidade['nm_genero'];
                    let tituloGeneroElements = document.querySelectorAll('#titulo-genero');
                    let tituloGeneroElement = tituloGeneroElements[key];
                    tituloGeneroElement.innerHTML = nmGenero;
                                    
                    let cdGenero = dadosGeneroPersonalidade['cd_genero'];
                    let data = consultaPorGenero(cdGenero);
                    data.then(promise => {
                        data = promise['results']
                        if(data.length > 0) {                    
                            let imgsEntreterimentos = document.querySelectorAll(`#img-entreterimento-${key+1}`);
                            let index = 0;
                            imgsEntreterimentos.forEach((imgEntreterimentoElement) => {
                                if(imgEntreterimentoElement.src == ''){
                                    let idSerie = data[index]['id'];
                                    let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`;
                                    
                                    imgEntreterimentoElement.alt = `tv-${idSerie}`;
                                    if(posterSerie){
                                        imgEntreterimentoElement.src = `https://image.tmdb.org/t/p/w500${posterSerie}`;
                                    } else {
                                        imgEntreterimentoElement.className = 'img-nao-encontrada';
                                        imgEntreterimentoElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                                    }

                                    index++;
                                }  
                            });
                        }
                    })
                });
            });
        } else {
            let data = consultaPorGenero('16');

            data.then(promise => {
                atribuiDadosSeries(promise, 'Animação', 0);
            });

            data = consultaPorGenero('35');

            data.then(promise => {
                atribuiDadosSeries(promise, 'Comédia', 1);
            });

            data = consultaPorGenero('36');

            data.then(promise => {
                atribuiDadosSeries(promise, 'História', 2);
            });

            data = consultaPorGenero('10749');

            data.then(promise => {
                atribuiDadosSeries(promise, 'Romance', 3);
            });
        }

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

function atribuiDadosSeries(promise, nmGenero, actualIndex){
    data = promise['results'].slice(0, 4);
    if(data.length > 0) {
        let index = 0;
        let tituloGeneroElements = document.querySelectorAll('#titulo-genero');
        let tituloGeneroElement = tituloGeneroElements[actualIndex];
        tituloGeneroElement.innerHTML = nmGenero;
        
        let imgsEntreterimentos = document.querySelectorAll(`#img-entreterimento-${actualIndex+1}`);
        imgsEntreterimentos.forEach((imgEntreterimentoElement) => {
            if(imgEntreterimentoElement.src == ''){
                let idSerie = data[index]['id'];
                let posterSerie = `https://image.tmdb.org/t/p/w500${data[index]['poster_path']}`; 
        
                imgEntreterimentoElement.alt = `tv-${idSerie}`;
                if(posterSerie){
                    imgEntreterimentoElement.src = `https://image.tmdb.org/t/p/w500${posterSerie}`;
                } else {
                    imgEntreterimentoElement.className = 'img-nao-encontrada';
                    imgEntreterimentoElement.src = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
                }
                index++;
            }
        })
    }
}

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
    const include_video = 'false';
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

function consultaGenerosPorCdPersonalidadeETipoEntreterimento(cdPersonalidade, tipoEntreterimento) {
    const url = 'https://monkers-entertainment-api.000webhostapp.com/get/consultaGenerosPorCdPersonalidade.php';
    const cd_personalidade = cdPersonalidade;
    const tipo_entreterimento = tipoEntreterimento

    return fetch(`${url}?cd_personalidade=${cd_personalidade}&tipo_entreterimento=${tipo_entreterimento}`, {
        method: "GET",
    }).then(response => { 
        return response.json();
    }).then(data => {
        return data;
    });
}
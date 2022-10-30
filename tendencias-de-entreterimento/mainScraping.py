from random import randint
from time import sleep
import titulosMaisPopularesRedesSociais

dadosRedesSociais = []
dadosTendencias = []
dadosFilmesSeriesMaisPirateados = []
dadosTrailerMaisVistos = []
dadosTendenciasWikipedia = []

listaUrls = [
    'https://flixpatrol.com/popular/titles/facebook/',
    'https://flixpatrol.com/popular/titles/twitter/',
    'https://flixpatrol.com/popular/titles/instagram/',
    'https://flixpatrol.com/popular/titles/reddit/'
]

for url in listaUrls:
    dadosRedesSociais.append(titulosMaisPopularesRedesSociais.coletaDadosPopulares(url))
    sleep(randint(10, 20))

dados = "{"+f'"redesSocias": '"{"+f'{",".join(dadosRedesSociais)}'"}"+"}"
file = open('saida-de-dados/fansRedesSociais.json', 'wb')
file.write(dados.encode('utf-8'))

listaUrls = [
    'https://flixpatrol.com/popular/titles/instagram-trends/',
    'https://flixpatrol.com/popular/titles/twitter-trends/'
]

for url in listaUrls:
    dadosTendencias.append(titulosMaisPopularesRedesSociais.coletaDadosTendencias(url))
    sleep(randint(10, 20))

dados = "{"+f'"redesSocias": '"{"+f'{",".join(dadosTendencias)}'"}"+"}"
file = open('saida-de-dados/mencoesRedesSociais.json', 'wb')
file.write(dados.encode('utf-8'))

listaUrls = [
    'https://flixpatrol.com/unofficial/titles/all/'
]

for url in listaUrls:
    dadosFilmesSeriesMaisPirateados.append(titulosMaisPopularesRedesSociais.coletaFilmesESeriesPirateados(url))
    sleep(randint(10, 20))

dados = "{"+f'"filmesSeriesMaisPirateados": '"{"+f'{",".join(dadosFilmesSeriesMaisPirateados)}'"}"+"}"
file = open('saida-de-dados/filmesSeriesMaisPirateados.json', 'wb')
file.write(dados.encode('utf-8'))

listaUrls = [
    'https://flixpatrol.com/popular/titles/youtube/'
]

for url in listaUrls:
    dadosTrailerMaisVistos.append(titulosMaisPopularesRedesSociais.coletaTrailerMaisVistosYoutube(url))
    sleep(randint(10, 20))

dados = "{"+f'"trailerMaisVistosYoutube": '"{"+f'{",".join(dadosTrailerMaisVistos)}'"}"+"}"
file = open('saida-de-dados/trailerMaisVistosYoutube.json', 'wb')
file.write(dados.encode('utf-8'))

listaUrls = [
    'https://flixpatrol.com/popular/titles/wikipedia-trends/'
]

for url in listaUrls:
    dadosTendenciasWikipedia.append(titulosMaisPopularesRedesSociais.coletaDadosTendenciasWikipedia(url))
    sleep(randint(10, 20))

dados = "{"+f'"tendenciasWikipedia": '"{"+f'{",".join(dadosTendenciasWikipedia)}'"}"+"}"
file = open('saida-de-dados/tendenciasWikipedia.json', 'wb')
file.write(dados.encode('utf-8'))
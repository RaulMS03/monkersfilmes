import re
import locale
from lxml.html import fromstring
import requests
import datetime


data = datetime.date.today()
ano, semana_do_ano, dia_da_semana = data.isocalendar()
mes_atual = data.month
dia_atual = data.day

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "max-age=0",
    "Referer": "google.com",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Sec-Gpc": "1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
}
seletor = '/html/body/div[3]/div/div/table/tbody/tr'


def coletaDadosPopulares(url: str):
    dados = []
    redeSocial = ""
    if "https://flixpatrol.com/popular/titles/facebook/" in url:
        redeSocial = 'facebook'
    elif "https://flixpatrol.com/popular/titles/twitter/" in url:
        redeSocial = 'twitter'
    elif "https://flixpatrol.com/popular/titles/instagram/" in url:
        redeSocial = 'instagram'
    elif "https://flixpatrol.com/popular/titles/reddit/" in url:
        redeSocial = 'reddit'
    url = url+f"{ano}-0{semana_do_ano}/"
    response = requests.get(url, headers=headers)
    parser = fromstring(response.text)
    try:
        for item in parser.xpath(seletor)[:10]:
            indice = item.xpath('./td[1]')[0].text_content().strip()
            indice = re.sub('[^0-9]', '', indice)
            titulo = item.xpath('./td[2]/a/div[2]/div[1]')[0].text_content().strip()
            totalDeMencoes = item.xpath('./td[3]/div[2]')[0].text_content().strip()
            mencoesEssaSemana = item.xpath('./td[3]/div[1]')[0].text_content().strip()
            mencoesEssaSemana = re.sub("\+", "", mencoesEssaSemana)
            dado = '{' \
                       f'"posicao": "{indice}",' \
                       f'"titulo": "{titulo}",' \
                       f'"toalDeFans": "{totalDeMencoes}",' \
                       f'"fansEssaSemana": "{mencoesEssaSemana}"' \
                   '}'
            dados.append(dado)
        return f'"{redeSocial}": [{",".join(dados)}]'
    except Exception as e:
        print(str(e))


def coletaDadosTendencias(url):
    dados = []
    redeSocial = ""
    if "https://flixpatrol.com/popular/titles/instagram-trends/" in url:
        redeSocial = 'instagram-trends'
    elif "https://flixpatrol.com/popular/titles/twitter-trends/" in url:
        redeSocial = 'twitter-trends'
    url = url + f"{ano}-{mes_atual}/"
    response = requests.get(url, headers=headers)
    parser = fromstring(response.text)

    try:
        for item in parser.xpath(seletor)[:10]:
            indice = item.xpath('./td[1]')[0].text_content().strip()
            indice = re.sub('[^0-9]', '', indice)
            imagem = f"https://flixpatrol.com{item.xpath('./td[2]/a/div[1]/div/picture/source//@srcset')[0]}"
            titulo = item.xpath('./td[2]/a/div[2]/div[1]')[0].text_content().strip()
            hashtag = item.xpath('./td[3]/div[2]')[0].text_content().strip()
            totalDeMencoesEsseMes = item.xpath('./td[3]/div[1]')[0].text_content().strip()
            totalDeMencoesEsseMes = re.sub("\+", "", totalDeMencoesEsseMes)
            dado = '{' \
                   f'"posicao": "{indice}",' \
                   f'"titulo": "{titulo}",' \
                   f'"imagem": "{imagem}",' \
                   f'"totalDeMencoesEsseMes": "{totalDeMencoesEsseMes}",' \
                   f'"hashtag": "{hashtag}"' \
                   '}'
            dados.append(dado)
        return f'"{redeSocial}": [{",".join(dados)}]'
    except Exception as e:
        print(str(e))


def coletaFilmesESeriesPirateados(url):
    dados = []
    url = url + f"{ano}-{mes_atual}/"
    response = requests.get(url, headers=headers, cookies={'userid': 'drt12mw6mrtqmnob'})
    parser = fromstring(response.text)

    try:
        for item in parser.xpath(seletor)[:10]:
            indice = item.xpath('./td[1]')[0].text_content().strip()
            indice = re.sub('[^0-9]', '', indice)
            titulo = item.xpath('./td[2]/a/div[2]/div[1]')[0].text_content().strip()
            imagem = f"https://flixpatrol.com{item.xpath('./td[2]/a/div[1]/div/picture/source//@srcset')[0]}"
            totalDeSeedsPorDia = item.xpath('./td[3]/div[1]')[0].text_content().strip()
            totalDeSeedsPorDia = re.sub("[^0-9]", "", totalDeSeedsPorDia)
            totalDeSeedsPorMes = int(totalDeSeedsPorDia) * int(dia_atual)
            locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')
            totalDeSeedsPorMes = locale.currency(totalDeSeedsPorMes, grouping=True)
            totalDeSeedsPorMes = totalDeSeedsPorMes.split('$')[1]
            totalDeSeedsPorMes = totalDeSeedsPorMes.split('.')[0]
            dado = '{' \
                   f'"posicao": "{indice}",' \
                   f'"titulo": "{titulo}",' \
                   f'"imagem": "{imagem}",' \
                   f'"totalDeTorrentsBaixadosEsseMes": "{totalDeSeedsPorMes}"' \
                   '}'
            dados.append(dado)
        return f'"seedsMaisPirateados": [{",".join(dados)}]'
    except Exception as e:
        print(str(e))


def coletaTrailerMaisVistosYoutube(url):
    dados = []
    url = url + f"{ano}-{mes_atual}/"
    response = requests.get(url, headers=headers)
    parser = fromstring(response.text)

    try:
        for item in parser.xpath(seletor)[:10]:
            indice = item.xpath('./td[1]')[0].text_content().strip()
            indice = re.sub('[^0-9]', '', indice)
            titulo = item.xpath('./td[2]/a/div[2]/div[1]')[0].text_content().strip()
            imagem = f"https://flixpatrol.com{item.xpath('./td[2]/a/div[1]/div/picture/source//@srcset')[0]}"
            totalDeVisualizacoes = item.xpath('./td[3]/div[2]')[0].text_content().strip()
            visualizacoesEsteMes = item.xpath('./td[3]/div[1]')[0].text_content().strip()
            visualizacoesEsteMes = re.sub("\+", "", visualizacoesEsteMes)
            dado = '{' \
                   f'"posicao": "{indice}",' \
                   f'"titulo": "{titulo}",' \
                   f'"imagem": "{imagem}",' \
                   f'"totalDeVisualizacoes": "{totalDeVisualizacoes}",' \
                   f'"visualizacoesEsteMes": "{visualizacoesEsteMes}"' \
                   '}'
            dados.append(dado)
        return f'"trailerMaisVistos": [{",".join(dados)}]'
    except Exception as e:
        print(str(e))


def coletaDadosTendenciasWikipedia(url):
    dados = []
    url = url + f"{ano}-{mes_atual}/"
    response = requests.get(url, headers=headers)
    parser = fromstring(response.text)

    try:
        for item in parser.xpath(seletor)[:10]:
            indice = item.xpath('./td[1]')[0].text_content().strip()
            indice = re.sub('[^0-9]', '', indice)
            titulo = item.xpath('./td[2]/a/div[2]/div[1]')[0].text_content().strip()
            imagem = f"https://flixpatrol.com{item.xpath('./td[2]/a/div[1]/div/picture/source//@srcset')[0]}"
            totalDeVisualizacoes = item.xpath('./td[3]/div[1]')[0].text_content().strip()
            link = f"https://pt.wikipedia.org/wiki/{item.xpath('./td[3]/div[2]')[0].text_content().strip()}"
            dado = '{' \
                   f'"posicao": "{indice}",' \
                   f'"titulo": "{titulo}",' \
                   f'"imagem": "{imagem}",' \
                   f'"totalDeVisualizacoes": "{totalDeVisualizacoes}",' \
                   f'"link": "{link}"' \
                   '}'
            dados.append(dado)
        return f'"maisVistos": [{",".join(dados)}]'
    except Exception as e:
        print(str(e))
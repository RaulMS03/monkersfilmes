import json

jsonFileLocation = open('mencoesRedesSociais.json')
data = json.load(jsonFileLocation)

for i in data["redesSocias"]["instagram-trends"]:
    print(i)

for i in data["redesSocias"]["twitter-trends"]:
    print(i)
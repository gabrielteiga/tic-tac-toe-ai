# TIC TAC TOE API

Este projeto é uma API do jogo TIC-TAC-TOE que, de acordo com o status do jogo, prevê o resultado da partida.

## Instalação

Instale as dependências listadas no requirements.txt:

```
pip install -r requirements.txt
```

## Rotas Disponíveis

### **GET `/ping`**

Pong.

Exemplo de uso (corpo da requisição):
```
* Não é necessário corpo na requisição
```

Resposta esperada:

```
{
    "data":"pong"
}
```

### **POST `/echo`**

Recebe um JSON no corpo da requisição e retorna uma mensagem de boas-vindas.

Exemplo de uso (corpo da requisição):
```
{
    "name": "Alice"
}
```

Resposta esperada:

```
{
    "data":{
        "message": "Hello, Alice!"
    }
}
```


## Status
![](https://img.shields.io/badge/developing-8A2BE2)

import pandas as pd
from src.http.routes.ApiController import initServer

if __name__ == '__main__':
    initServer(host="0.0.0.0", port=8080)
    
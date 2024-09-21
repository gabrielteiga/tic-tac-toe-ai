import pandas as pd
from src.http.routes.ApiController import initServer

def readingDataset(path) -> pd.DataFrame:
    return pd.read_csv(path)

if __name__ == '__main__':
    dataFrame = readingDataset("dataset.csv")
    initServer(host="0.0.0.0", port=8080)
    
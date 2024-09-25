from abc import ABC
import pandas as pd
import os

class BaseModelML(ABC):
    __treino_path = os.path.join(os.path.dirname(__file__), '../../resources/dataset/dataset_treino.csv')
    treino_dataset = pd.read_csv(__treino_path)
    
    __teste_path = os.path.join(os.path.dirname(__file__), '../../resources/dataset/dataset_teste.csv')
    teste_dataset = pd.read_csv(__teste_path)

    def __init__(self, n_neighbors=4):
        df = self.treino_dataset.applymap(self._normalize)

        self.X = df.drop(columns=['Class']).values
        self.y = df['Class'].values
        self.clf = None

    def test(self):
        df = self.teste_dataset.applymap(self._normalize)
        X_test = df.drop(columns=['Class']).values
        return self.clf.predict(X_test)
    
    def predict(self, X = None):
        df = pd.DataFrame([X]).applymap(self._normalize)
        X = df.values
        return self.clf.predict(X)
    
    def _train(self):
        self.clf.fit(self.X, self.y)
    
    def _normalize(self, valor):
        if valor == 'x':
            return 1
        elif valor == 'o':
            return 0
        elif valor == 'b':
            return -1
        elif valor == 'positive':
            return 2
        elif valor == 'negative':
            return 3
        elif valor == 'ongoing':
            return 4
        else:
            return 5 #tied
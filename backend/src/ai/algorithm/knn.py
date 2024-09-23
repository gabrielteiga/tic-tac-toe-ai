from sklearn import neighbors
import pandas as pd
import os

class KNN:
    __treino_path = os.path.join(os.path.dirname(__file__), '../../resources/dataset/dataset_treino.csv')
    treino_dataset = pd.read_csv(__treino_path)
    
    __teste_path = os.path.join(os.path.dirname(__file__), '../../resources/dataset/dataset_teste.csv')
    teste_dataset = pd.read_csv(__teste_path)
    
    n_neighbors = 4
    clf = None

    def __init__(self, n_neighbors=4):
        self.n_neighbors = 1
        df = self.treino_dataset.applymap(self.__normalize)

        X = df.drop(columns=['Class']).values
        y = df['Class'].values

        self.clf = neighbors.KNeighborsClassifier(n_neighbors=self.n_neighbors)
        
        self.__train(X, y)

    def predict(self, X = None):
        df = self.teste_dataset.applymap(self.__normalize)
        X = df.drop(columns=['Class']).values

        return self.clf.predict(X)
    
    def __train(self, X, y):
        self.clf.fit(X, y)
    
    def __normalize(self, valor):
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
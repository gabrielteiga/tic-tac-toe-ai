import pandas as pd
import os
from sklearn.neural_network import MLPClassifier

class MLP:
    __treino_path = os.path.join(os.path.dirname(__file__), '../../resources/dataset/dataset_treino.csv')
    treino_dataset = pd.read_csv(__treino_path)
    
    __teste_path = os.path.join(os.path.dirname(__file__), '../../resources/dataset/dataset_teste.csv')
    teste_dataset = pd.read_csv(__teste_path)

    clf = None

    def __init__(self):
        df = self.treino_dataset.applymap(self.__normalize)

        X = df.drop(columns=['Class']).values
        y = df['Class'].values

        self.clf = MLPClassifier(solver='adam', hidden_layer_sizes=(3,), learning_rate_init=0.3, momentum=0.2, verbose=True)
        
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
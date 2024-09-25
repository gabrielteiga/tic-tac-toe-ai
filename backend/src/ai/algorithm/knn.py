from src.ai.model.base_model_ml import BaseModelML
from sklearn import neighbors

class KNN(BaseModelML):
    def __init__(self, n_neighbors=8):
        super().__init__()
        self.clf = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors)        
        self._train()

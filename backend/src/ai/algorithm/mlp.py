from src.ai.model.base_model_ml import BaseModelML
from sklearn.neural_network import MLPClassifier

class MLP(BaseModelML):
    def __init__(self):
        super().__init__()
        self.clf = MLPClassifier(solver='adam', hidden_layer_sizes=(2,12), learning_rate_init=0.008, momentum=0.5, verbose=True)       
        self._train()

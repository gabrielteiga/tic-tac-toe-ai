from src.ai.model.base_model_ml import BaseModelML
from sklearn.tree import DecisionTreeClassifier

class DTree(BaseModelML):
    def __init__(self):
        super().__init__()
        self.clf = DecisionTreeClassifier()
        self._train()

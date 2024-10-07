from flask import Flask, request, jsonify
from flask_cors import CORS
import src.ai.algorithm.knn as knn
import src.ai.algorithm.mlp as mlp
import src.ai.algorithm.dtree as dtree

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

knn = knn.KNN()
mlp = mlp.MLP()
dtree = dtree.DTree()

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'data': 'pong'}), 200

@app.route('/knn', methods=['GET'])
def knn_test():
    prediction = knn.test()
    return jsonify(prediction.tolist()), 200

@app.route('/knn/predict', methods=['POST'])
def knn_predict():
    data, error = getDataPost()
    if error:
        return error
    return getPredict(data, knn)

@app.route('/mlp', methods=['GET'])
def mlp_test():
    prediction = mlp.test()
    return jsonify(prediction.tolist()), 200

@app.route('/mlp/predict', methods=['POST'])
def mlp_predict():
    data, error = getDataPost()
    if error:
        return error
    return getPredict(data, mlp)

@app.route('/dtree', methods=['GET'])
def dtree_test():
    prediction = dtree.test()
    return jsonify(prediction.tolist()), 200

@app.route('/dtree/predict', methods=['POST'])
def dtree_predict():
    data, error = getDataPost()
    if error:
        return error
    return getPredict(data, dtree)

def getDataPost():
    data = request.get_json()
    if data is None:
        return jsonify({'error': 'No data provided'}), 400
    return data["data"], False

def getPredict(data, model):
    prediction = model.predict(data)
    return jsonify(prediction.tolist()), 200

def initServer(host, port):
    app.run(debug=True, host=host, port=port)
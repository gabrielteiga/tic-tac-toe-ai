from flask import Flask, request, jsonify
import src.ai.algorithm.knn as knn

knn = knn.KNN()
app = Flask(__name__)

@app.route('/knn', methods=['GET'])
def knn_predict():
    prediction = knn.predict()
    return jsonify(prediction.tolist()), 200

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'data': 'pong'}), 200

@app.route('/echo', methods=['POST'])
def echo():
    data = request.get_json()
    if data is None:
        return jsonify({'data': 'No data provided'}), 400
    return jsonify({'data':{'message':"Hello, {}!".format(data['name'])}}), 200

def initServer(host, port):
    app.run(debug=True, host=host, port=port)
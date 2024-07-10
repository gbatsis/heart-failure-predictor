from flask import Flask, request, jsonify
from flask_cors import CORS

from models.prediction import predict_sample

app = Flask(__name__)

# CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received data:", data)

    probs = predict_sample(data)

    print(probs)
    return jsonify({'message': 'Data received successfully', 'yourData': data})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)

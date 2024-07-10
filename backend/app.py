from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# CORS
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/predict', methods=['POST'])
def predict():
    print("Request received")
    try:
        data = request.get_json()
        print("Data:", data)
        age = data.get('age', 0)
        age = int(age)
        if age < 40:
            risk = 'Low'
        elif 40 <= age < 60:
            risk = 'Medium'
        else:
            risk = 'High'
        response = jsonify({'risk': risk})
        print("Response:", response.data)
        return response
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)

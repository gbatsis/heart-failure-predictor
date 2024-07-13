from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models.prediction import predict_sample

app = Flask(__name__)

# Enable CORS for all domains on all routes
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///predictions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer)
    sex = db.Column(db.String(1))
    chestPainType = db.Column(db.String(10))
    restingBP = db.Column(db.Integer)
    cholesterol = db.Column(db.Integer)
    fastingBS = db.Column(db.Integer)
    restingECG = db.Column(db.String(20))
    maxHR = db.Column(db.Integer)
    exerciseAngina = db.Column(db.String(1))
    oldpeak = db.Column(db.Float)
    stSlope = db.Column(db.String(10))
    result = db.Column(db.String(10))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

@app.route('/predictions', methods=['GET'])
def get_predictions():
    try:
        predictions = Prediction.query.all()
        results = []
        for pred in predictions:
            result = {
                'id': pred.id,
                'age': pred.age,
                'sex': pred.sex,
                'chestPainType': pred.chestPainType,
                'cholesterol': pred.cholesterol,
                'fastingBS': pred.fastingBS,
                'restingECG': pred.restingECG,
                'maxHR': pred.maxHR,
                'exerciseAngina': pred.exerciseAngina,
                'oldpeak': pred.oldpeak,
                'stSlope': pred.stSlope,
                'result': pred.result,
                'timestamp': pred.timestamp.strftime("%Y-%m-%d %H:%M:%S")
            }
            results.append(result)
            print(result)
        return jsonify({"predictions": results, "count": len(results)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    result = predict_sample(data)

    # Assign probability to the result
    result = result[0][1]

    prediction = Prediction(
        age=data.get('age'),
        sex=data.get('sex'),
        chestPainType=data.get('chestPainType'),
        cholesterol=data.get('cholesterol'),
        fastingBS=data.get('fastingBS'),
        restingECG=data.get('restingECG'),
        maxHR=data.get('maxHR'),
        exerciseAngina=data.get('exerciseAngina'),
        oldpeak=data.get('oldpeak'),
        stSlope=data.get('stSlope'),
        result=result
    )
    db.session.add(prediction)
    db.session.commit()
    return jsonify({'message': 'Prediction saved successfully', 'result': result})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5050, debug=True)

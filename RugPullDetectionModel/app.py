from flask import Flask, request, jsonify
import pandas as pd
import joblib
import requests
import os

app = Flask(__name__)

# Load mô hình đã train
model = joblib.load('RugPullDetectionModel/isolation_forest_model.joblib')

@app.route('/')
def home():
    return "Liquidity Anomaly Detection API"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        prediction = model.predict(df)
        score = model.decision_function(df)

        return jsonify({
            "prediction": "Anomaly" if prediction[0] == -1 else "Normal",
            "anomaly_score": score[0]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Sample test client – gọi chính API này
@app.route('/test-sample', methods=['GET'])
def test_sample():
    sample_input = {
        'TOTAL_ADDED_LIQUIDITY': 10000e18,
        'TOTAL_REMOVED_LIQUIDITY': 50000e18,
        'NUM_LIQUIDITY_ADDS': 5,
        'NUM_LIQUIDITY_REMOVES': 2,
        'ADD_TO_REMOVE_RATIO': 2.5,
        'LAST_POOL_ACTIVITY_TIMESTAMP_hour': 14,
        'LAST_POOL_ACTIVITY_TIMESTAMP_day': 20,
        'LAST_POOL_ACTIVITY_TIMESTAMP_weekday': 1,
        'LAST_POOL_ACTIVITY_TIMESTAMP_month': 5,
        'FIRST_POOL_ACTIVITY_TIMESTAMP_hour': 9,
        'FIRST_POOL_ACTIVITY_TIMESTAMP_day': 18,
        'FIRST_POOL_ACTIVITY_TIMESTAMP_weekday': 6,
        'FIRST_POOL_ACTIVITY_TIMESTAMP_month': 4,
        'LAST_SWAP_TIMESTAMP_hour': 13,
        'LAST_SWAP_TIMESTAMP_day': 20,
        'LAST_SWAP_TIMESTAMP_weekday': 1,
        'LAST_SWAP_TIMESTAMP_month': 5,
        'INACTIVITY_STATUS_Active': 1,
        'INACTIVITY_STATUS_Inactive': 0
    }

    # Gửi request đến chính API `/predict`
    response = requests.post("http://localhost:5000/predict", json=sample_input)

    return jsonify(response.json())

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # lấy port từ biến môi trường hoặc default 5000
    app.run(host='0.0.0.0', port=port)

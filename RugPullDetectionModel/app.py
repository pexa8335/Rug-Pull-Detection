from flask import Flask, request, jsonify
import pandas as pd
import joblib
import requests
import os

app = Flask(__name__)

# Load mô hình đã train
model = joblib.load('RugPullDetectionModel/isolation_forest_model.joblib')
scaler = joblib.load('RugPullDetectionModel/scaler.pkl')  # đường dẫn scaler bạn lưu nhé
@app.route('/')
def home():
    return "Liquidity Anomaly Detection API"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data])
        df_scaled = scaler.transform(df)

        prediction = model.predict(df_scaled)
        score = model.decision_function(df_scaled)
        score_value = score[0]

        if score_value < -0.5:
            warning = "Anomaly - Highly Rug Pull Project! 🚨"
        elif score_value < -0.2:
            warning = "Anomaly - Suspicious Rug Pull Activity!"
        elif score_value < 0:
            warning = "Warning - Potential Anomaly Detected."
        else:
            warning = "Normal - Quite safe project."

        return jsonify({
            "prediction": warning,
            "anomaly_score": score_value
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Sample test client – gọi chính API này
@app.route('/test-sample', methods=['GET'])
def test_sample():
    sample_input = {
        'TOTAL_ADDED_LIQUIDITY':  50000,
        'TOTAL_REMOVED_LIQUIDITY': 50000,
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

    df = pd.DataFrame([sample_input])
    df_scaled = scaler.transform(df)
    prediction = model.predict(df_scaled)
    score = model.decision_function(df_scaled)
    score_value = score[0]

    if score_value < -0.5:
        warning = "Anomaly - Highly Rug Pull Project! 🚨"
    elif score_value < -0.2:
        warning = "Anomaly - Suspicious Rug Pull Activity!"
    elif score_value < 0:
        warning = "Warning - Potential Anomaly Detected."
    else:
        warning = "Normal - Quite safe project."

    return jsonify({
        "prediction": warning,
        "anomaly_score": score_value
    })


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # lấy port từ biến môi trường hoặc default 5000
    app.run(host='0.0.0.0', port=port)

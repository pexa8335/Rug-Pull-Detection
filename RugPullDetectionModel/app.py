from flask import Flask, request, jsonify
import pandas as pd
import joblib
import requests 
import os

app = Flask(__name__)

# Load model & scaler
MODEL_PATH = 'RugPullDetectionModel/isolation_forest_model_1.5.1.joblib'
SCALER_PATH = 'RugPullDetectionModel/scaler_1.5.1.pkl'


model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

OPTIMAL_THRESHOLD = 0.0457 #found in code

@app.route('/')
def home():
    return "Liquidity Anomaly Detection API - Optimized Threshold"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        expected_features = scaler.feature_names_in_ 
        try:
            df = pd.DataFrame([data], columns=expected_features)
        except ValueError as ve:
            return jsonify({"error": f"Input data error or incorrect columns: {str(ve)}"}), 400


        df_scaled = scaler.transform(df)

        anomaly_score = model.decision_function(df_scaled)
        score_value = anomaly_score[0]

        # Decide based on the optimized threshold
        # IF scores lower for anomaly
        #  score < 0.0457 => Anomaly (-1), vice versa is Normal (1)
        if score_value < OPTIMAL_THRESHOLD:
            prediction_label = -1 # Anomaly
            if score_value < -0.1: 
                 warning = "Anomaly - Highly Rug Pull Project! 🚨"
            elif score_value < 0.0: 
                 warning = "Anomaly - Suspicious Rug Pull Activity!"
            else: 
                 warning = "Warning - Potential Anomaly Detected."
        else:
            prediction_label = 1 # Normal
            warning = "Normal - Quite safe project."

        return jsonify({
            "prediction_label": prediction_label, 
            "prediction_message": warning,     
            "anomaly_score": float(score_value)
        })

    except KeyError as ke:
        return jsonify({"error": f"Missing feature in input data: {str(ke)}"}), 400
    except Exception as e:
        app.logger.error(f"Error during prediction: {str(e)}") # Ghi log lỗi
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500



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
    
    try:
        expected_features = scaler.feature_names_in_
        df = pd.DataFrame([sample_input], columns=expected_features)
    except AttributeError: 

        df = pd.DataFrame([sample_input]) 


    df_scaled = scaler.transform(df)
    
    anomaly_score_test = model.decision_function(df_scaled)
    score_value_test = anomaly_score_test[0]

    if score_value_test < OPTIMAL_THRESHOLD:
        prediction_label_test = -1
        if score_value_test < -0.1:
             warning_test = "Anomaly - Highly Rug Pull Project! 🚨"
        elif score_value_test < 0.0:
             warning_test = "Anomaly - Suspicious Rug Pull Activity!"
        else:
             warning_test = "Warning - Potential Anomaly Detected."
    else:
        prediction_label_test = 1
        warning_test = "Normal - Quite safe project."

    return jsonify({
        "input_sample": sample_input, 
        "prediction_label": prediction_label_test,
        "prediction_message": warning_test,
        "anomaly_score": float(score_value_test)
    })


if __name__ == '__main__':  
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
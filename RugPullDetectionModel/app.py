from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np # Cần cho LIME và predict_fn
import lime
import lime.lime_tabular
import os

app = Flask(__name__)

# Load model & scaler
MODEL_PATH = 'RugPullDetectionModel/isolation_forest_model_1.5.1.joblib'
SCALER_PATH = 'RugPullDetectionModel/scaler_1.5.1.pkl'

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

OPTIMAL_THRESHOLD = 0.0149 # found in code

# --- LIME Explainer Setup ---
# Cố gắng lấy tên feature từ scaler
try:
    feature_names_for_lime = scaler.feature_names_in_.tolist()
except AttributeError:
    # Fallback nếu scaler được lưu với phiên bản scikit-learn cũ hơn
    # Hoặc nếu bạn biết chính xác số lượng và tên features
    print("Warning: scaler.feature_names_in_ not available. Manually defining feature names based on notebook context.")
    # Dựa trên notebook, X_train sau khi drop có 19 cột (cell 15)
    # Đây là một giả định, cần kiểm tra lại với notebook của bạn
    num_features_from_notebook = 19
    feature_names_for_lime = [f"feature_{i+1}" for i in range(num_features_from_notebook)]
    # Ví dụ: ['TOTAL_ADDED_LIQUIDITY', ..., 'INACTIVITY_STATUS_Inactive']

# QUAN TRỌNG: Dữ liệu huấn luyện cho LIME
# TỐT NHẤT: Tải dữ liệu huấn luyện đã scale (X_scaled.values) từ notebook
# Ví dụ: training_features_for_lime_values = np.load('X_scaled_values.npy')
# Nếu không có, chúng ta tạo dữ liệu dummy (ít chính xác hơn cho LIME)
num_training_features = len(feature_names_for_lime)
# Tạo 100 mẫu dummy với phân phối ngẫu nhiên, chỉ để LIME có thể chạy
# Thay thế bằng dữ liệu huấn luyện thực tế đã scale để có giải thích tốt nhất
dummy_training_data_for_lime = np.random.rand(100, num_training_features)
print(f"LIME Explainer initialized with {num_training_features} features: {feature_names_for_lime[:5]}...")


class_names_for_lime = ['Anomaly', 'Normal'] # 0: Anomaly (-1 model), 1: Normal (1 model)

explainer = lime.lime_tabular.LimeTabularExplainer(
    training_data=dummy_training_data_for_lime, # SỬ DỤNG DỮ LIỆU HUẤN LUYỆN THỰC TẾ ĐÃ SCALE Ở ĐÂY
    feature_names=feature_names_for_lime,
    class_names=class_names_for_lime,
    mode='classification', # Vì chúng ta đang phân loại Anomaly/Normal
    verbose=False,
    random_state=42 # Để có thể tái tạo kết quả
)

# Hàm predict_fn cho LIME
def lime_predict_fn(X_lime_input_np):
    # X_lime_input_np là một mảng numpy 2D
    # model.decision_function trả về điểm anomaly (điểm thấp hơn -> bất thường hơn)
    decision_scores = model.decision_function(X_lime_input_np)

    # Chuyển đổi điểm thành pseudo-probabilities cho [P(Anomaly), P(Normal)]
    # Isolation Forest: điểm cao hơn là "normal" hơn.
    # Sigmoid có thể được dùng để squash điểm vào khoảng (0,1)
    # P(Normal) ~ sigmoid(score). Điểm = 0 là ranh giới.
    prob_normal = 1 / (1 + np.exp(-decision_scores))
    prob_anomaly = 1 - prob_normal

    # LIME mong đợi đầu ra là (n_samples, n_classes)
    return np.vstack((prob_anomaly, prob_normal)).T
# --- End LIME Explainer Setup ---


@app.route('/')
def home():
    return "Liquidity Anomaly Detection API - Optimized Threshold with LIME"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # Sử dụng feature_names_for_lime đã được xác định ở trên
        # Điều này đảm bảo thứ tự cột nhất quán
        try:
            df = pd.DataFrame([data], columns=feature_names_for_lime)
        except ValueError as ve:
            return jsonify({"error": f"Input data error or incorrect columns: {str(ve)}"}), 400
        
        # Kiểm tra xem có feature nào bị thiếu không
        for feature in feature_names_for_lime:
            if feature not in data:
                return jsonify({"error": f"Missing feature in input data: {feature}"}), 400
        
        # Đảm bảo thứ tự cột đúng như lúc scaler được fit
        df = df[feature_names_for_lime]


        df_scaled = scaler.transform(df.values) # Truyền numpy array để tránh warning

        anomaly_score = model.decision_function(df_scaled)
        score_value = anomaly_score[0]

        if score_value < OPTIMAL_THRESHOLD:
            prediction_label = -1 # Anomaly
            prediction_string = "Anomaly"
            if score_value < -0.1:
                 warning = "Anomaly - Highly Rug Pull Project! 🚨"
            elif score_value < 0.0:
                 warning = "Anomaly - Suspicious Rug Pull Activity!"
            else:
                 warning = "Warning - Potential Anomaly Detected."
        else:
            prediction_label = 1 # Normal
            prediction_string = "Normal"
            warning = "Normal - Quite safe project."

        # --- LIME Explanation ---
        lime_explanation_list = []
        try:
            instance_to_explain_np = df_scaled[0] # Dữ liệu đã scale của một mẫu
            # LIME cần index của class (0 cho Anomaly, 1 cho Normal)
            predicted_class_index_lime = 0 if prediction_label == -1 else 1

            explanation = explainer.explain_instance(
                data_row=instance_to_explain_np,
                predict_fn=lime_predict_fn,
                num_features=10, # Số lượng feature muốn hiển thị trong giải thích
                labels=(predicted_class_index_lime,) # Giải thích cho lớp được dự đoán
            )
            # Lấy giải thích dưới dạng danh sách các (feature, weight)
            lime_explanation_list = explanation.as_list(label=predicted_class_index_lime)
        except Exception as lime_e:
            app.logger.error(f"LIME explanation error: {str(lime_e)}")
            lime_explanation_list = [{"error": f"Could not generate LIME explanation: {str(lime_e)}"}]
        # --- End LIME Explanation ---

        return jsonify({
            "prediction_label_code": prediction_label,
            "prediction_label_string": prediction_string,
            "prediction_message": warning,
            "anomaly_score": float(score_value),
            "lime_explanation": lime_explanation_list # Thêm giải thích LIME
        })

    except KeyError as ke: # Mặc dù đã kiểm tra ở trên, để phòng hờ
        return jsonify({"error": f"Missing feature in input data: {str(ke)}"}), 400
    except Exception as e:
        app.logger.error(f"Error during prediction: {str(e)}")
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
    
    # Đảm bảo tất cả các feature_names_for_lime đều có trong sample_input, nếu thiếu thì thêm giá trị mặc định (ví dụ 0)
    for feature in feature_names_for_lime:
        if feature not in sample_input:
            sample_input[feature] = 0 # Hoặc một giá trị mặc định hợp lý khác

    df = pd.DataFrame([sample_input], columns=feature_names_for_lime) # Sử dụng feature_names_for_lime để đảm bảo thứ tự
    df = df[feature_names_for_lime] # Sắp xếp lại cột cho chắc chắn

    df_scaled = scaler.transform(df.values) # Truyền numpy array
    
    anomaly_score_test = model.decision_function(df_scaled)
    score_value_test = anomaly_score_test[0]

    if score_value_test < OPTIMAL_THRESHOLD:
        prediction_label_test = -1
        prediction_string_test = "Anomaly"
        if score_value_test < -0.1:
             warning_test = "Anomaly - Highly Rug Pull Project! 🚨"
        elif score_value_test < 0.0:
             warning_test = "Anomaly - Suspicious Rug Pull Activity!"
        else:
             warning_test = "Warning - Potential Anomaly Detected."
    else:
        prediction_label_test = 1
        prediction_string_test = "Normal"
        warning_test = "Normal - Quite safe project."

    # --- LIME Explanation for test sample ---
    lime_explanation_list_test = []
    try:
        instance_to_explain_np = df_scaled[0]
        predicted_class_index_lime = 0 if prediction_label_test == -1 else 1
        explanation = explainer.explain_instance(
            data_row=instance_to_explain_np,
            predict_fn=lime_predict_fn,
            num_features=10,
            labels=(predicted_class_index_lime,)
        )
        lime_explanation_list_test = explanation.as_list(label=predicted_class_index_lime)
    except Exception as lime_e:
        app.logger.error(f"LIME explanation error for test sample: {str(lime_e)}")
        lime_explanation_list_test = [{"error": f"Could not generate LIME explanation: {str(lime_e)}"}]
    # --- End LIME Explanation ---

    return jsonify({
        "input_sample": sample_input,
        "prediction_label_code": prediction_label_test,
        "prediction_label_string": prediction_string_test,
        "prediction_message": warning_test,
        "anomaly_score": float(score_value_test),
        "lime_explanation": lime_explanation_list_test
    })


if __name__ == '__main__':
    # Thiết lập logging cơ bản cho Flask
    if not app.debug:
        import logging
        from logging.handlers import RotatingFileHandler
        file_handler = RotatingFileHandler('flask_app.log', maxBytes=1024 * 1024 * 100, backupCount=20)
        file_handler.setLevel(logging.ERROR)
        formatter = logging.Formatter("[%(asctime)s] {%(pathname)s:%(lineno)d} %(levelname)s - %(message)s")
        file_handler.setFormatter(formatter)
        app.logger.addHandler(file_handler)

    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) # debug=True hữu ích khi phát triển
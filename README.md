# Rug Pull Detection on Solana DeFi

## Project Overview

This project aims to develop a machine learning model to detect **rug pull** scams in the Solana decentralized finance (DeFi) ecosystem. Rug pulls are fraudulent exit scams where project creators suddenly withdraw investors’ funds, causing significant losses.

Our approach is inspired by the research presented in the paper:

- *SolRPDS: A Dataset for Analyzing Rug Pulls in Solana Decentralized Finance*  
  (Abdulrahman Alhaidari et al., CODASPY 2025)

We utilize the publicly available **SolRPDS** dataset, which is derived from 3.69 billion blockchain transactions on Solana, providing a comprehensive foundation for rug pull analysis.

---

## Methodology

We use the **Isolation Forest** algorithm for anomaly detection. Isolation Forest is an unsupervised learning method that identifies anomalies by isolating observations in the feature space. It is particularly well-suited for high-dimensional data and large datasets such as blockchain transactions because it is efficient and does not require labeled data for training.

The model outputs an anomaly score for each data point, and we tune the detection threshold to optimize the F2-score, which prioritizes recall (important in fraud detection to minimize false negatives).

---

## Results Summary

- **Selected Threshold:** 0.0149  
- **F2-score:** 0.6938  
- **Precision:** 0.9293  
- **Recall:** 0.6525  

### Classification Report

| Label          | Precision | Recall | F1-score | Support |
|----------------|-----------|--------|----------|---------|
| -1 (Anomaly)   | 0.93      | 0.65   | 0.77     | 141     |
| 1 (Normal)     | 0.99      | 1.00   | 0.99     | 4782    |

- **Overall Accuracy:** 0.99 (on 4923 samples)

---

## Dataset: SolRPDS

The SolRPDS dataset used in this project is a large-scale, publicly available dataset tailored for rug pull detection in Solana DeFi:

- Derived from **3.69 billion blockchain transactions** on the Solana network  
- Licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**

Please cite the original paper if you use this dataset:

> Abdulrahman Alhaidari, Bhavani Kalal, Balaji Palanisamy, and Shamik Sural. 2025. *SolRPDS: A Dataset for Analyzing Rug Pulls in Solana Decentralized Finance*. In Proceedings of the 15th ACM Conference on Data and Application Security and Privacy (CODASPY '25). ACM, New York, NY, USA. (To appear)

---

## Team Members

- **Phan Duc Anh** – Team Leader, Machine Learning Development, Project Management  
- **Nguyen Tran Lam** – Idea Contributor, Documentation  
- **Nguyen Minh Dai** – Backend Developer  
- **Vo Van Quoc** – Frontend Developer  
- **Vo Tuan Hung** – Frontend Developer  

---

## License & Usage Notes

This project complies with the licensing terms of the SolRPDS dataset under CC BY 4.0. Proper citation of the dataset source is required for any use or distribution.

---

If you want me to add sections like installation instructions, model training, or how to run evaluation scripts, just ask!

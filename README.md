# Health failure prediction using Machine Learning

## Machine Learning framework

### Model selection

After conducting the EDA and an exhaustive grid search cross-validation among three models, we selected an SVM model with C=1, gamma=0.1, and an RBF kernel for deployment. This model uses One-Hot Encoding for categorical features and excludes the RestingBP feature (more info at EDA).

### Model Evaluation Results

- **Accuracy:** 0.875
- **F1 Score:** 0.8889
- **Precision:** 0.8762
- **Recall:** 0.9020
- **ROC-AUC:** 0.9255

| Class           | Precision | Recall | F1-Score |
|-----------------|-----------|--------|----------|
| No HeartDisease | 0.87      | 0.84   | 0.86     |
| HeartDisease    | 0.88      | 0.90   | 0.89     |
| **Accuracy**    |           |        | 0.88     |
| **Macro Avg**   | 0.87      | 0.87   | 0.87     |
| **Weighted Avg**| 0.87      | 0.88   | 0.87     |

![Precision-Recall Curve](./data/results/curve1.png)

![ROC-AUC Curve](./data/results/curve2.png)
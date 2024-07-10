import pickle
import pandas as pd

def predict_sample(fts, model_path="../models/model.pkl"):

    correct_col_names = ['Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol', 'FastingBS',
       'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope']

    # Create the new dataframe from the dictionary with correct column names
    new_data = pd.DataFrame.from_dict(fts, orient='index').T
    new_data.columns = correct_col_names

    # Load the model
    with open(model_path, "rb") as f:
        clf = pickle.load(f)

    # Probability of each class
    proba = clf.predict_proba(new_data)

    return proba

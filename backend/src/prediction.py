import pandas as pd

def predict_sample(fts, clf):

    correct_col_names = ['Age', 'Sex', 'ChestPainType', 'Cholesterol', 'FastingBS',
       'RestingECG', 'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope']

    # Create the new dataframe from the dictionary with correct column names
    new_data = pd.DataFrame.from_dict(fts, orient='index').T
    new_data.columns = correct_col_names

    # Probability of each class
    proba = clf.predict_proba(new_data)

    return proba

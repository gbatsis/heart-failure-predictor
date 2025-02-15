export const transformFeatureNames = (feature) => {
    const featureMap = {
        id: "ID",
        age: "Age",
        sex: "Sex",
        chestPainType: "Chest Pain Type",
        cholesterol: "Cholesterol",
        fastingBS: "Fasting Blood Sugar",
        restingECG: "Resting ECG",
        maxHR: "Max Heart Rate",
        exerciseAngina: "Exercise Induced Angina",
        oldpeak: "Oldpeak",
        stSlope: "ST Slope",
        result: "Prediction Result",
        timestamp: "Time"
    };

    return featureMap[feature] || feature;
};

export const transformFeatureValues = (feature, value) => {
    const valueMap = {
        sex: { M: "Male", F: "Female" },
        chestPainType: {
            TA: "Typical Angina",
            ATA: "Atypical Angina",
            NAP: "Non-Anginal Pain",
            ASY: "Asymptomatic"
        },
        fastingBS: { 1: "True", 0: "False" },
        restingECG: {
            Normal: "Normal",
            ST: "ST-T Wave Abnormality",
            LVH: "Left Ventricular Hypertrophy"
        },
        exerciseAngina: { Y: "Yes", N: "No" },
        stSlope: { Up: "Upsloping", Flat: "Flat", Down: "Downsloping" }
    };
    
    if (feature === 'result') {
        return (value * 100).toFixed(1) + '%';
    }

    if (valueMap[feature]) {
        return valueMap[feature][value] || value;
    }
    return value;
};
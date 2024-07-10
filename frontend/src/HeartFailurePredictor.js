import React, { useState } from 'react';
import { predictRisk } from './api';

function HeartFailurePredictor() {
    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        chestPainType: '',
        restingBP: '',
        cholesterol: '',
        fastingBS: '',
        restingECG: '',
        maxHR: '',
        exerciseAngina: '',
        oldpeak: '',
        stSlope: ''
    });
    const [success, setSuccess] = useState(false);
    const [predictionResult, setPredictionResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        const response = await predictRisk(formData);
        if (response) {
            setSuccess(true);
            setPredictionResult(response.result);
            console.log("Success:", response);
        }
    };

    return (
        <main id="prediction-content-wrapper">
            <div className="intro-msg">
                <h2>Heart failure prediction</h2>
                <p>Fill in the form below to predict the likelihood of heart failure in a patient using the power of Artificial Intelligence.</p>
            </div>
            <div className="ml-app-wrapper">
                <div className="input-container">
                    <form id="predictionForm" onSubmit={handleSubmit}>
                        <div className="form-section" id="ageSection">
                            <p id="ageDesc">Please select the age of the patient:</p>
                            <div className="input-group" id="ageInputGroup">
                                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required min="0" max="100" />
                                <label htmlFor="age">Age</label>
                            </div>
                        </div>

                        <div className="form-section" id="sexSection">
                            <p id="sexDesc">Please select the sex of the patient:</p>
                            <div className="form-group" id="sexGroup">
                                <label htmlFor="sexMale">Male</label>
                                <input type="radio" id="sexMale" name="sex" value="M" onChange={handleChange} checked={formData.sex === 'M'} />
                                <label htmlFor="sexFemale">Female</label>
                                <input type="radio" id="sexFemale" name="sex" value="F" onChange={handleChange} checked={formData.sex === 'F'} />
                            </div>
                        </div>

                        <div className="form-section" id="chestPainSection">
                            <p id="chestPainDesc">Please select the type of chest pain experienced:</p>
                            <div className="form-group" id="chestPainGroup">
                                <label htmlFor="cpTA">Typical Angina</label>
                                <input type="radio" id="cpTA" name="chestPainType" value="TA" onChange={handleChange} checked={formData.chestPainType === 'TA'} />
                                <label htmlFor="cpATA">Atypical Angina</label>
                                <input type="radio" id="cpATA" name="chestPainType" value="ATA" onChange={handleChange} checked={formData.chestPainType === 'ATA'} />
                                <label htmlFor="cpNAP">Non-Anginal Pain</label>
                                <input type="radio" id="cpNAP" name="chestPainType" value="NAP" onChange={handleChange} checked={formData.chestPainType === 'NAP'} />
                                <label htmlFor="cpASY">Asymptomatic</label>
                                <input type="radio" id="cpASY" name="chestPainType" value="ASY" onChange={handleChange} checked={formData.chestPainType === 'ASY'} />
                            </div>
                        </div>

                        <div className="form-section" id="restingBPSection">
                            <p id="restingBPDesc">Please enter the resting blood pressure (mm Hg):</p>
                            <div className="input-group" id="restingBPGroup">
                                <input type="number" id="restingBP" name="restingBP" value={formData.restingBP} onChange={handleChange} required min="50" max="200" />
                                <label htmlFor="restingBP">Resting Blood Pressure</label>
                            </div>
                        </div>

                        <div className="form-section" id="cholesterolSection">
                            <p id="cholesterolDesc">Please enter the serum cholesterol level (mg/dL):</p>
                            <div className="input-group" id="cholesterolGroup">
                                <input type="number" id="cholesterol" name="cholesterol" value={formData.cholesterol} onChange={handleChange} required min="100" max="600" />
                                <label htmlFor="cholesterol">Cholesterol</label>
                            </div>
                        </div>

                        <div className="form-section" id="fastingBSSection">
                            <p id="fastingBSDesc">Does the patient have a fasting blood sugar greater than 120 mg/dL?</p>
                            <div className="form-group" id="fastingBSGroup">
                                <label htmlFor="fastingBSYes">Yes</label>
                                <input type="radio" id="fastingBSYes" name="fastingBS" value="1" onChange={handleChange} checked={formData.fastingBS === '1'} />
                                <label htmlFor="fastingBSNo">No</label>
                                <input type="radio" id="fastingBSNo" name="fastingBS" value="0" onChange={handleChange} checked={formData.fastingBS === '0'} />
                            </div>
                        </div>

                        <div className="form-section" id="ecgSection">
                            <p id="ecgDesc">Please select the resting electrocardiogram results:</p>
                            <div className="form-group" id="ecgGroup">
                                <label htmlFor="ecgNormal">Normal</label>
                                <input type="radio" id="ecgNormal" name="restingECG" value="Normal" onChange={handleChange} checked={formData.restingECG === 'Normal'} />
                                <label htmlFor="ecgST">ST-T wave abnormality</label>
                                <input type="radio" id="ecgST" name="restingECG" value="ST" onChange={handleChange} checked={formData.restingECG === 'ST'} />
                                <label htmlFor="ecgLVH">Left Ventricular Hypertrophy</label>
                                <input type="radio" id="ecgLVH" name="restingECG" value="LVH" onChange={handleChange} checked={formData.restingECG === 'LVH'} />
                            </div>
                        </div>

                        <div className="form-section" id="maxHRSection">
                            <p id="maxHRDesc">Please enter the maximum heart rate achieved:</p>
                            <div className="input-group" id="maxHRGroup">
                                <input type="number" id="maxHR" name="maxHR" value={formData.maxHR} onChange={handleChange} required min="60" max="220" />
                                <label htmlFor="maxHR">Max Heart Rate</label>
                            </div>
                        </div>

                        <div className="form-section" id="anginaSection">
                            <p id="anginaDesc">Does the patient experience exercise-induced angina?</p>
                            <div className="form-group" id="anginaGroup">
                                <label htmlFor="anginaYes">Yes</label>
                                <input type="radio" id="anginaYes" name="exerciseAngina" value="Y" onChange={handleChange} checked={formData.exerciseAngina === 'Y'} />
                                <label htmlFor="anginaNo">No</label>
                                <input type="radio" id="anginaNo" name="exerciseAngina" value="N" onChange={handleChange} checked={formData.exerciseAngina === 'N'} />
                            </div>
                        </div>

                        <div className="form-section" id="oldpeakSection">
                            <p id="oldpeakDesc">Please enter the ST depression induced by exercise relative to rest (Oldpeak):</p>
                            <div className="input-group" id="oldpeakGroup">
                                <input type="number" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange} step="0.1" required min="0" max="10" />
                                <label htmlFor="oldpeak">Oldpeak</label>
                            </div>
                        </div>

                        <div className="form-section" id="slopeSection">
                            <p id="slopeDesc">Please select the slope of the peak exercise ST segment:</p>
                            <div className="form-group" id="slopeGroup">
                                <label htmlFor="slopeUp">Upsloping</label>
                                <input type="radio" id="slopeUp" name="stSlope" value="Up" onChange={handleChange} checked={formData.stSlope === 'Up'} />
                                <label htmlFor="slopeFlat">Flat</label>
                                <input type="radio" id="slopeFlat" name="stSlope" value="Flat" onChange={handleChange} checked={formData.stSlope === 'Flat'} />
                                <label htmlFor="slopeDown">Downsloping</label>
                                <input type="radio" id="slopeDown" name="stSlope" value="Down" onChange={handleChange} checked={formData.stSlope === 'Down'} />
                            </div>
                        </div>

                        <div className="submit-btn-container">
                            <button type="submit" id="predictButton">Predict</button>
                        </div>
                    </form>
                    {success && <p>Successful data reception.</p>}  {/* Success message */}
                    {predictionResult && (
                        <div className="prediction-result">
                            <p>Prediction Probability: {predictionResult * 100}%</p>
                        </div>
                    )} {/* Prediction result */}
                </div>
            </div>
        </main>
    );
}

export default HeartFailurePredictor;

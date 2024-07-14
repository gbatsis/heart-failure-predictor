import React, { useState } from 'react';
import { predictRisk } from './api';

function HeartFailurePredictor() {
    const [formData, setFormData] = useState({
        age: '',
        sex: 'M',
        chestPainType: 'ATA',
        cholesterol: 200,
        fastingBS: '0',
        restingECG: 'Normal',
        maxHR: 150,
        exerciseAngina: 'N',
        oldpeak: 1,
        stSlope: 'Up'
    });
    const [success, setSuccess] = useState(false);
    const [predictionResult, setPredictionResult] = useState(null);
    const [message, setMessage] = useState("Heart Failure Probability: -");

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
        setMessage("Predicting...");
        const response = await predictRisk(formData);
        if (response) {
            setSuccess(true);
            setPredictionResult(response.result);
            setMessage(null);
            console.log("Success:", response);
        } else {
            setMessage("Prediction failed. Please try again.");
        }
    };

    const handleClear = () => {
        setFormData({
            age: '',
            sex: 'M',
            chestPainType: 'ATA',
            cholesterol: 200,
            fastingBS: '0',
            restingECG: 'Normal',
            maxHR: 150,
            exerciseAngina: 'N',
            oldpeak: 1,
            stSlope: 'Up'
        });
        setSuccess(false);
        setPredictionResult(null);
        setMessage("Heart Failure Probability: -");
    };

    return (
        <div id="prediction-content-wrapper">
            <div className="intro-msg">
                <p>Fill in the form below to predict the likelihood of heart failure in a patient using the power of Artificial Intelligence.</p>
            </div>
            <div className="ml-app-wrapper">
                <form id="predictionForm" onSubmit={handleSubmit}>
                    <div className="form-section" id="ageSection">
                        <p id="ageDesc">Please select the age of the patient:</p>
                        <div className="input-group" id="ageInputGroup">
                            <input 
                                type="text" 
                                id="age" 
                                name="age" 
                                value={formData.age} 
                                onChange={handleChange} 
                                inputMode="numeric" 
                                pattern="\d*" 
                                style={{ caretColor: 'black' }}
                                placeholder="Age"
                                required
                            />
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

                    <div className="form-section" id="cholesterolSection">
                        <p id="cholesterolDesc">Please enter the serum cholesterol level (mg/dL):</p>
                        <div className="input-group" id="cholesterolGroup">
                            <input type="range" id="cholesterol" name="cholesterol" min="100" max="600" value={formData.cholesterol} onChange={handleChange} />
                            <label htmlFor="cholesterol">Cholesterol: {formData.cholesterol}</label>
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
                            <input type="range" id="maxHR" name="maxHR" min="60" max="220" value={formData.maxHR} onChange={handleChange} />
                            <label htmlFor="maxHR">Max Heart Rate: {formData.maxHR}</label>
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
                            <input type="range" id="oldpeak" name="oldpeak" min="-3" max="6.5" step="0.1" value={formData.oldpeak} onChange={handleChange} />
                            <label htmlFor="oldpeak">Oldpeak: {formData.oldpeak}</label>
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

                    <div className='form-section predictionArea'>
                        <div className="prediction-result">
                            {message && <p>{message}</p>}
                            {predictionResult && (
                                <div>
                                    <p>Heart Failure Probability: {(predictionResult * 100).toFixed(1)}%</p>
                                </div>
                            )}
                        </div>
                        <div className='pred-btns-area'>
                            <button type="submit" class="pred-area-btn" id="predictButton">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20">
                                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
                                </svg>
                                Predict
                            </button>
                            <button type="button" class="pred-area-btn" id="clearButton" onClick={handleClear}>
                                Clear
                            </button>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HeartFailurePredictor;

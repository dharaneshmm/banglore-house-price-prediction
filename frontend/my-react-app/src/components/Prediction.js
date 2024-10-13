import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictionPage = () => {
    const [area, setArea] = useState('');
    const [bhk, setBhk] = useState(1);
    const [bath, setBath] = useState(1);
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8002/get_location_names')
            .then(response => {
                setLocations(response.data.locations);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
                setError('Error fetching locations. Please try again later.');
            });
    }, []);

    const handlePredict = () => {
        setError('');  // Clear any existing errors

        // Input validation
        if (!area || !location || !bhk || !bath) {
            setError('Please fill out all fields.');
            return;
        }

        if (isNaN(area) || isNaN(bhk) || isNaN(bath)) {
            setError('Please enter valid numbers.');
            return;
        }

        const inputData = {
            total_sqft: parseFloat(area),
            bhk: parseInt(bhk),
            bath: parseInt(bath),
            location
        };

        axios.post('http://localhost:8002/predict_home_price', inputData)
            .then(response => {
                setPrediction(`Estimated Price: ₹${response.data.estimated_price} Lakh`);
                setError('');
            })
            .catch(error => {
                console.error('Error making prediction:', error);
                setError('Error making prediction. Please try again later.');
            });
    };

    const handleClear = () => {
        setArea('');
        setBhk(1);
        setBath(1);
        setLocation('');
        setPrediction('');
        setError('');
    };

    return (
        <div className="prediction-page">
            <div className="prediction-container">
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="area">Area (Square Feet):</label>
                    <input
                        type="number"
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="form-control"
                        placeholder="Enter area in sqft"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bhk">BHK:</label>
                    <input
                        type="number"
                        id="bhk"
                        value={bhk}
                        onChange={(e) => setBhk(e.target.value)}
                        className="form-control"
                        min="1"
                        max="5"
                        placeholder="Enter number of BHK"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bath">Bath:</label>
                    <input
                        type="number"
                        id="bath"
                        value={bath}
                        onChange={(e) => setBath(e.target.value)}
                        className="form-control"
                        min="1"
                        max="5"
                        placeholder="Enter number of bathrooms"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-control"
                    >
                        <option value="" disabled>Select a Location</option>
                        {locations.map((loc, index) => (
                            <option key={index} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                {!prediction && (
                    <button onClick={handlePredict} className="predict-button">
                        Estimate Price
                    </button>
                )}
                {prediction && (
                    <>
                        <p className="prediction">{prediction}</p>
                        <button onClick={handleClear} className="clear-button">
                            Clear
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PredictionPage;

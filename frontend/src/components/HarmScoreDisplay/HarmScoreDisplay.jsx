// src/components/HarmScoreDisplay/HarmScoreDisplay.jsx
import React, { useState, useEffect } from 'react';
import { getHarmScore } from '../../services/apiService';

const HarmScoreDisplay = ({ productId }) => {
    const [harmScore, setHarmScore] = useState(null);

    useEffect(() => {
        const fetchHarmScore = async () => {
            try {
                const scoreData = await getHarmScore(productId);
                setHarmScore(scoreData.harm_score);
            } catch (error) {
                console.error('Error fetching harm score:', error);
            }
        };

        if (productId) {
            fetchHarmScore();
        }
    }, [productId]);

    return (
        <div>
            {harmScore !== null ? (
                <p>Harm Score: {harmScore}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HarmScoreDisplay;
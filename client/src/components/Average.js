import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Average = ({ productId }) => {
  const [average, setAverage] = useState(0);

  useEffect(() => {
    loadAverage();
  }, []);

  const loadAverage = async () => {
    try {
      console.log("Fetching reviews for productId:", productId)
      const res = await axios.get(
        `https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/product/${productId}`
      );
      const reviews = res.data.reviews;
      console.log(reviews)
      if (reviews.length > 0) {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviews.length;
        setAverage(avgRating);
      }
    } catch (error) {
      console.error("Error loading average review:", error);
    }
  };

  return (
    <div>
      <div>Avg. Rating: {average.toFixed(2)}</div>
    </div>
  );
};

export default Average;

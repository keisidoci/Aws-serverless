import React, { useState } from 'react';
import "../components/star.css"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Star = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [voted, setVoted] = useState(false); // State to control if voted

  const labels = ["Bad", "Below Average", "Average", "Good", "Excellent"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!productId) {
        toast.error("Can't add review for this product")
        return;
      }
      const reviewData = { rating, productId };
      await axios.post(`https://b7a2r32fmk.execute-api.eu-central-1.amazonaws.com/dev/review/`, reviewData);
      toast.success("Review submitted successfully");
      setVoted(true); // Set voted to true after submitting the review
    } catch (error) {
      toast.error("Error while submitting the review");
    }
  };

  const getLabel = () => {
    if (rating === 0) return "No Rating";
    return labels[rating - 1];
  };

  return (
    <div className="star-rating">
      {voted ? (
        <p>Voted!</p>
      ) : (
        <form>
          <div className='row1'>
            <p>{getLabel()}</p>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? 'on' : 'off'}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  disabled={voted} // Disable the stars if already voted
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
          <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleSubmit} disabled={voted}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Star;

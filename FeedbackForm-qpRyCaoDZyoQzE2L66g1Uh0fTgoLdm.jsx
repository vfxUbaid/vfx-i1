import React, { useState } from "react";

function FeedbackForm() {
  const [feedbackData, setFeedbackData] = useState({
    username: "",
    rating: "5",
    message: "",
  });

  const handleChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Feedback Submitted:\n" + JSON.stringify(feedbackData, null, 2));
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label><br />
        <input type="text" name="username" onChange={handleChange} required /><br /><br />

        <label>Rating (1-5):</label><br />
        <select name="rating" onChange={handleChange} value={feedbackData.rating}>
          {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}</option>)}
        </select><br /><br />

        <label>Feedback:</label><br />
        <textarea name="message" onChange={handleChange} required /><br /><br />

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
npm start

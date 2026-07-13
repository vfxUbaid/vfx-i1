import React from "react";
import RegistrationForm from "./RegistrationForm";
import FeedbackForm from "./FeedbackForm";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>React Forms Example</h1>
      <RegistrationForm />
      <hr />
      <FeedbackForm />
    </div>
  );
}

export default App;

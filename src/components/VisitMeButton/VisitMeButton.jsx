import React from "react";
import "./VisitMeButton.css";

function VisitMeButton() {
  return (
    <div>
      <button onClick={() => window.open("https://dininduchamikara.netlify.app/", "_blank")}>Visit Me</button>
    </div>
  );
}

export default VisitMeButton;

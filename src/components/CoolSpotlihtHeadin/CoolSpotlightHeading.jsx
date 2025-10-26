import React from "react";
import "./CoolSpotlightHeading.css";
import profileImg from "../../assets/dinindu_circle.png";
import BouncingButton from "../BouncingButton";

function CoolSpotlightHeading() {
  return (
    <div
      style={{
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={profileImg} alt="" width={200} height={200} />
      <p class="large rise">Dinindu Peiris</p>
      <p class="small outline">Software Engineer | Passionate about building scalable apps</p>
      <BouncingButton />
    </div>
  );
}

export default CoolSpotlightHeading;

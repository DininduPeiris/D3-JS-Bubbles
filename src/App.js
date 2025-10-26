import { useEffect, useRef } from "react";
import CollisionDetection from "./components/CollisionDetection";
import CoolSpotlightHeading from "./components/CoolSpotlihtHeadin/CoolSpotlightHeading";
import VisitMeButton from "./components/VisitMeButton/VisitMeButton";

function App() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const updateWindowSize = () => {
      windowSize.current = [window.innerWidth, window.innerHeight];
    };

    // Add event listener to update windowSize ref when the window is resized
    window.addEventListener("resize", updateWindowSize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Use windowSize.current for width and height calculation
  const width = windowSize.current[0] - 5;
  const height = windowSize.current[1] - 5;

  return (
    <div>
      <div>
        <CollisionDetection />
        <div
          style={{
            position: "absolute",
            width: width,
            height: height,
            top: 0,
            zIndex: -10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CoolSpotlightHeading />
        </div>
        <div
          style={{
            position: "absolute",
            width: width,
            height: 180,
            top: height - 180,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <VisitMeButton/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

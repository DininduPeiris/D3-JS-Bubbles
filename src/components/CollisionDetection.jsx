import { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "../data/collision_detection.json";

function CollisionDetection() {

  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const canvasRef = useRef();

  useEffect(() => {
    const updateWindowSize = () => {
      windowSize.current = [window.innerWidth, window.innerHeight];
    };

    // Add event listener to update windowSize ref when the window is resized
    window.addEventListener('resize', updateWindowSize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Use windowSize.current for width and height calculation
  const width = windowSize.current[0] - 5;
  const height = windowSize.current[1] - 5;

  const color = d3.scaleOrdinal(d3.schemeTableau10);
  const nodes = data.map(Object.create);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");

    d3.select(context.canvas)
    .classed("svg-container", true) 
      .on("touchmove", (event) => event.preventDefault())
      .on("pointermove", pointermoved);


    function ticked() {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(width / 2, height / 2);
      for (let i = 1; i < nodes.length; ++i) {
        const d = nodes[i];
        context.beginPath();
        context.moveTo(d.x + d.r, d.y);
        context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);
        context.fillStyle = color(d.group);
        context.fill();
      }
      context.restore();
    }

    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3) // stay hot
      .velocityDecay(0.1) // low friction
      .force("x", d3.forceX().strength(0.01))
      .force("y", d3.forceY().strength(0.01))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d) => d.r + 1)
          .iterations(3)
      )
      .force(
        "charge",
        d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3))
      )
      .on("tick", ticked);

    console.log(simulation);
  }, []);

  function pointermoved(event) {
    const [x, y] = d3.pointer(event);
    nodes[0].fx = x - width / 2;
    nodes[0].fy = y - height / 2;
  }

  return (
    <div>
      <canvas ref={canvasRef}  width={width} height={height}></canvas>
    </div>
  );
}

export default CollisionDetection;

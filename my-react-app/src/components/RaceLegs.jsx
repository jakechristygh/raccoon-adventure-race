import React from "react";
import "./RaceLegs.css";

const legs = [
  {
    name: "Paddle",
    description:
      "Starting at the boat house beach. Navigate your way thru the checkpoints and around the island, testing your balance, upper body, and core.",
    generalImg: "/images/paddlemap6.png",
    mapImg: "/images/paddle.jpg",
  },
  {
    name: "Run",
    description:
      "Heading south follow the trail around the lake until you get to the archery facility.",
    generalImg: "/images/runmap.png",
    mapImg: "/images/run.jpg",
  },
  {
    name: "Shoot",
    description:
      "For archery you will fire 3 arrows at a target from a simple bow. For every point you score on the target a minute will be taken off your total time.",
    generalImg: "/images/arrow.jpg",
    mapImg: "/images/target.jpg",
  },
];

const RaceLegs = () => {
  return (
    <section id="race-legs" className="race-legs-section">
      {legs.map((leg) => (
        <div className="leg-card" key={leg.name}>
          <div className="leg-name">
            <h3>{leg.name}</h3>
          </div>
          <div className="leg-content-horizontal">
            <div className="leg-text">
              <p>{leg.description}</p>
            </div>
            <div className="img-wrapper">
              <img src={leg.generalImg} alt={`${leg.name} general`} />
            </div>
            <div className="img-wrapper">
              <img src={leg.mapImg} alt={`${leg.name} course map`} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RaceLegs;

import React from "react";
import "./Sponsors.css";

// Add sponsor logos in public/images/sponsors/
const sponsors = [
  { name: "REI", logo: "/images/sponsors/REI.png" },
  { name: "Scheels", logo: "/images/sponsors/Scheels.png" },
  { name: "Altra", logo: "/images/sponsors/Altra.png" },
  { name: "Corozan Coffee", logo: "/images/sponsors/Corozan.png" },
  { name: "LifeTime Fitness", logo: "/images/sponsors/Lifetime.png" },
];

const Sponsors = () => {
  return (
    <section className="sponsors-section">
      <h2>Our Sponsors</h2>
      <div className="sponsors-grid">
        {sponsors.map((sponsor) => (
          <div className="sponsor-card" key={sponsor.name}>
            <img src={sponsor.logo} alt={sponsor.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;

import "./Logo.css";

import legsLogo from "../assets/legslogo.png";
import raccoonLogo from "../assets/raccoonlogo.png";
import raccoonLogoGrey from "../assets/raccoonlogogrey.png";


function LogoStrip() {
  return (
    <section className="logo-background">
      <div className="logo-strip">
        <img src={raccoonLogoGrey} alt="Racoon Logo" />
        <img src={legsLogo} alt="Legs Logo" />
      </div>
    </section>

  );
}

export default LogoStrip;

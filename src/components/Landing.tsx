import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SHIVANSH
              <br />
              <span>DHARNI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Specializing in</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Java Development</div>
              <div className="landing-h2-2">AI Engineering</div>
            </h2>
            <h2>
              <div className="landing-h2-info">AI Engineering</div>
              <div className="landing-h2-info-1">Java Development</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

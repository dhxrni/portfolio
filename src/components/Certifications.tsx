import "./styles/Certifications.css";

const Certifications = () => {
  const certs = [
    "Oracle: OCI Data Science Professional (2025)",
    "Yale University: The Science of Well-Being",
    "Microsoft: Career Essentials in Generative AI",
    "TCS iON: Young Professional Program",
    "LinkedIn: Introduction to AI, Generative AI, Microsoft 365 Copilot",
    "J.P. Morgan: Software Engineering Job Simulation",
    "Accenture: Data Analytics Job Simulation",
    "Deloitte Australia: Data Analyst Job Simulation",
  ];

  return (
    <div className="cert-section section-container" id="certifications">
      <div className="cert-container">
        <h2>
          My <span>Certifications</span>
        </h2>
        <div className="cert-grid">
          {certs.map((cert, index) => (
            <div className="cert-card" key={index}>
              <p>{cert}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;

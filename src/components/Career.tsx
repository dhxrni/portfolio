import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern</h4>
                <h5>UPCL Ltd, Dehradun</h5>
              </div>
              <h3>July 2023</h3>
            </div>
            <p>
              Worked across Operations, Commercial, Finance, and IT departments. Focused on power quality improvement, billing systems, data center operations, and SCADA.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Java Intern</h4>
                <h5>IDS Infotech Ltd, Chandigarh</h5>
              </div>
              <h3>July - Aug 2024</h3>
            </div>
            <p>
              Completed hands-on industrial Java training and participated in project development. Gained practical experience in Java, strengthening problem-solving and teamwork skills.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant Software Engineer</h4>
                <h5>UPCL (Infinite Sols)</h5>
              </div>
              <h3>July 2025 - Present</h3>
            </div>
            <p>
              Responsible for resolving UPCL's backend Java-related tickets and technical issues. Debug and enhance APIs, manage database operations, write tests, and perform code reviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

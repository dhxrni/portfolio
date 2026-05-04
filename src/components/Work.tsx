import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <h2>
            My <span>Work</span>
          </h2>
          <a href="https://github.com/dhxrni" target="_blank" rel="noreferrer" style={{ fontSize: "16px", color: "#adacac", textDecoration: "none", border: "1px solid #363636", padding: "10px 20px", borderRadius: "50px", marginTop: "100px", display: "flex", alignItems: "center", gap: "5px", transition: "all 0.3s" }} className="work-github-btn">
            GitHub <MdArrowOutward />
          </a>
        </div>
        <div className="work-flex">
          {[
            {
              name: "Customer Churn Prediction",
              category: "AI/ML",
              tools: "Python, Random Forest, Cox PH, Survival Analysis",
              desc: "End-to-end churn prediction system using ML and survival analysis. Achieved 77.36% accuracy, 0.84 ROC-AUC, and 0.966 concordance index on 7,000+ customers.",
            },
            {
              name: "PDF Summarization",
              category: "AI",
              tools: "Hugging Face, LangChain",
              desc: "AI-powered tool that ingests PDF documents and produces concise, structured summaries using transformer-based models and LangChain pipelines.",
            },
            {
              name: "Crop Disease Detection",
              category: "AI/ML",
              tools: "Python, ML Models",
              desc: "Computer vision model that identifies crop diseases from leaf images, helping farmers detect issues early and reduce agricultural losses.",
            },
            {
              name: "To-Do List API",
              category: "Backend",
              tools: "Spring Boot, Java, SQL",
              desc: "RESTful API for task management with full CRUD operations, built with Spring Boot and backed by a relational database.",
            },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p style={{ marginTop: "12px", fontSize: "13px", color: "#888", lineHeight: "1.6" }}>{project.desc}</p>
              </div>
            </div>
          ))}

          {/* ── "...and more" card ── */}
          <div className="work-box work-box--more">
            <div className="work-info">
              <div className="work-title">
                <h3 style={{ fontSize: "32px" }}>+</h3>
                <div>
                  <h4>More Projects</h4>
                  <p>On GitHub</p>
                </div>
              </div>
              <div className="work-more-list">
                <div className="work-more-item">
                  <span className="work-more-tag">AI/ML</span>
                  <span>Chatbot — NLP-based conversational agent using intent classification and ML models.</span>
                </div>
                <div className="work-more-item">
                  <span className="work-more-tag">Web3</span>
                  <span>Blockchain Voting System — Tamper-proof e-voting built with smart contracts on a decentralised ledger.</span>
                </div>
                <div className="work-more-item">
                  <span className="work-more-tag">Full-Stack</span>
                  <span>Online Salon Website — Full-stack booking platform with PHP backend, live scheduling, and responsive UI.</span>
                </div>
              </div>
              <a
                href="https://github.com/dhxrni"
                target="_blank"
                rel="noreferrer"
                className="work-more-link"
              >
                View all on GitHub <MdArrowOutward />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

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
            { name: "To-Do List API", category: "Backend", tools: "Spring Boot, Java, SQL" },
            { name: "Chatbot", category: "AI/ML", tools: "NLP, Machine Learning" },
            { name: "PDF Summarization", category: "AI", tools: "Hugging Face, LangChain" },
            { name: "Crop Disease Detection", category: "AI/ML", tools: "Python, ML Models" },
            { name: "Blockchain Voting System", category: "Web3", tools: "Blockchain, Smart Contracts" },
            { name: "Online Salon Website", category: "Full-Stack", tools: "PHP, JavaScript, HTML, CSS" },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

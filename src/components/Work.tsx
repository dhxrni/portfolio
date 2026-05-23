import { useState, useEffect } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(useGSAP);

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  topics: string[];
}

const fallbackDescriptions: Record<string, string> = {
  "PatchFlow": "Enterprise deployment governance and workflow management platform using Spring Boot, React, PostgreSQL, RBAC, audit logging, and workflow orchestration.",
  "customer-churn-survival": "ML + Survival Analysis system using Random Forest and Cox Proportional Hazards for churn prediction and time-to-churn estimation.",
  "pdf_summarizer": "AI-based PDF summarization system using transformer models and NLP pipelines.",
  "objectdetection": "Computer vision inference project using deep learning detection models.",
  "spring_quizapi": "REST API for quiz management, scoring, categories, and answer evaluation.",
  "portfolio": "Personal portfolio website with 3D elements using React, Vite, and Three.js.",
  "blockchain-voting-system": "Decentralized electronic voting system built using Solidity smart contracts and Web3.",
  "tiny-url-service": "URL shortening backend service with redirect handling and scalable architecture concepts.",
  "online-salon-website": "Full-stack appointment booking and scheduling platform.",
  "stock-market-prediction": "LSTM-based deep learning model for stock forecasting using historical OHLCV time-series data.",
  "crop-disease-detection": "CNN-based plant disease classification system with FastAPI inference and MLflow experiment tracking."
};

const Work = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/dhxrni/repos?sort=updated&per_page=20")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filter out the profile readme repo "dhxrni" if present
          setRepos(data.filter((repo) => repo.name !== "dhxrni"));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch repos:", err);
        setLoading(false);
      });
  }, []);

  useGSAP(() => {
    if (loading || repos.length === 0) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const workContainer = document.querySelector(".work-container");
      if (!box || box.length === 0 || !workContainer) return;
      
      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentElement = box[0].parentElement;
      if (!parentElement) return;
      
      const parentWidth = parentElement.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      
      // Calculate total translate distance based on dynamically loaded items
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width dynamically
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, [repos, loading]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <h2>
            My <span>Work</span>
          </h2>
          <a
            href="https://github.com/dhxrni"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "16px",
              color: "#adacac",
              textDecoration: "none",
              border: "1px solid #363636",
              padding: "10px 20px",
              borderRadius: "50px",
              marginTop: "100px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "all 0.3s",
            }}
            className="work-github-btn"
          >
            GitHub <MdArrowOutward />
          </a>
        </div>
        <div className="work-flex">
          {loading ? (
            <div style={{ padding: "0 20px", color: "#888" }}>Loading repositories from GitHub...</div>
          ) : repos.length > 0 ? (
            repos.map((repo, index) => (
              <div className="work-box" key={index}>
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
                >
                  <div className="work-info" style={{ height: '100%' }}>
                    <div className="work-title">
                      <h3>{String(index + 1).padStart(2, "0")}</h3>
                      <div>
                        <h4 style={{ textTransform: 'capitalize' }}>{repo.name.replace(/[-_]/g, ' ')}</h4>
                        <p>{repo.language || "GitHub Project"}</p>
                      </div>
                    </div>
                    <h4>Tools and features</h4>
                    <p>{repo.topics && repo.topics.length > 0 ? repo.topics.join(', ') : repo.language || "N/A"}</p>
                    <p style={{ marginTop: "12px", fontSize: "13px", color: "#888", lineHeight: "1.6" }}>
                      {fallbackDescriptions[repo.name] || 
                       fallbackDescriptions[Object.keys(fallbackDescriptions).find(k => k.toLowerCase() === repo.name.toLowerCase()) || ""] || 
                       repo.description || 
                       "No description provided."}
                    </p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div style={{ padding: "0 20px", color: "#888" }}>No repositories found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Work;

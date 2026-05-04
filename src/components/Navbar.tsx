import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HoverLinks from "./HoverLinks";
import { MdDownload, MdOpenInNew, MdExpandMore } from "react-icons/md";
import "./styles/Navbar.css";

// Register plugins ONCE
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// Export smoother safely
export let smoother: ScrollSmoother | null = null;

const resumes = [
  { label: "General Resume", file: "/resume/resume.pdf" },
  // Add more resumes here, e.g.:
  // { label: "ML / AI Resume", file: "/resume/resume-ml.pdf" },
  // { label: "Backend Resume", file: "/resume/resume-backend.pdf" },
];

const Navbar = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Prevent duplicate instances (important for React strict mode)
    if (!smoother) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      smoother.scrollTop(0);
      smoother.paused(true);
    }

    const links = document.querySelectorAll(".header ul a");

    links.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (window.innerWidth > 1024 && smoother) {
          e.preventDefault();
          const target = (e.currentTarget as HTMLAnchorElement).getAttribute("data-href");
          if (target) {
            smoother.scrollTo(target, true, "top top");
          }
        }
      });
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Logo
        </a>

        <a
          href="mailto:dharnishivansh@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          dharnishivansh@gmail.com
        </a>

        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li className="resume-nav-item" ref={dropdownRef}>
            <button
              className={`resume-nav-btn${resumeOpen ? " active" : ""}`}
              onClick={() => setResumeOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={resumeOpen}
            >
              RESUME <MdExpandMore className={`resume-chevron${resumeOpen ? " rotated" : ""}`} />
            </button>
            {resumeOpen && (
              <div className="resume-dropdown">
                {resumes.map((r) => (
                  <div className="resume-dropdown-item" key={r.file}>
                    <span className="resume-label">{r.label}</span>
                    <div className="resume-actions">
                      <a
                        href={r.file}
                        target="_blank"
                        rel="noreferrer"
                        title="Open"
                        className="resume-action-btn"
                      >
                        <MdOpenInNew />
                      </a>
                      <a
                        href={r.file}
                        download
                        title="Download"
                        className="resume-action-btn"
                      >
                        <MdDownload />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { TbDownload, TbEye, TbChevronDown } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import ResumeModal from "./ResumeModal";
import resumes, { type ResumeEntry } from "../data/resumes";
import "./styles/Navbar.css";

// Register plugins ONCE
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// Export smoother safely
export let smoother: ScrollSmoother | null = null;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeResume, setActiveResume] = useState<ResumeEntry | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleView = (r: ResumeEntry) => {
    setActiveResume(r);
    setOpen(false);
  };
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
            <a data-href="#certifications" href="#certifications">
              <HoverLinks text="CERTIFICATIONS" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li className="resume-nav-item" ref={dropdownRef}>
            <button
              className={`resume-nav-btn ${open ? "active" : ""}`}
              onClick={handleToggle}
            >
              <HoverLinks text="RESUME" />
              <TbChevronDown className={`resume-chevron ${open ? "rotated" : ""}`} />
            </button>

            {open && (
              <div className="resume-dropdown">
                {resumes.map((r) => (
                  <div key={r.driveId} className="resume-dropdown-item">
                    <span className="resume-label">{r.label}</span>
                    <div className="resume-actions">
                      <button
                        className="resume-action-btn"
                        onClick={() => handleView(r)}
                        title="View"
                      >
                        <TbEye />
                      </button>
                      <a
                        href={`https://drive.google.com/uc?export=download&id=${r.driveId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-action-btn"
                        title="Download"
                      >
                        <TbDownload />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Full-screen PDF viewer modal */}
            {activeResume && (
              <ResumeModal
                resume={activeResume}
                onClose={() => setActiveResume(null)}
              />
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
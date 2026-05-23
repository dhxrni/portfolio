import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { TbDownload, TbLoader2, TbAlertCircle, TbChevronDown } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const GITHUB_RESUME_API =
  "https://api.github.com/repos/dhxrni/portfolio/contents/public/resume";

interface ResumeFile {
  name: string;
  download_url: string;
}

type FetchState = "idle" | "loading" | "done" | "error";

// Register plugins ONCE
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

// Export smoother safely
export let smoother: ScrollSmoother | null = null;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [resumes, setResumes] = useState<ResumeFile[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("idle");
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

  const fetchResumes = async () => {
    if (fetchState === "loading") return;
    setFetchState("loading");
    try {
      const res = await fetch(GITHUB_RESUME_API);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Array<{ name: string; download_url: string }> =
        await res.json();
      const pdfs = data
        .filter((f) => f.name.toLowerCase().endsWith(".pdf") && f.download_url)
        .map((f) => ({
          name: f.name.replace(/\.pdf$/i, ""),
          download_url: f.download_url,
        }));
      setResumes(pdfs);
      setFetchState("done");
    } catch {
      setFetchState("error");
    }
  };

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next && fetchState === "idle") {
      fetchResumes();
    }
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
                {fetchState === "loading" && (
                  <div className="resume-dropdown-item" style={{ justifyContent: "center", color: "#ccc" }}>
                    <TbLoader2 className="resume-spin" style={{ marginRight: '8px' }} />
                    <span className="resume-label">Fetching resumes…</span>
                  </div>
                )}
                {fetchState === "error" && (
                  <div className="resume-dropdown-item" style={{ justifyContent: "center", color: "#ff6b6b" }}>
                    <TbAlertCircle style={{ marginRight: '8px', fontSize: '16px' }} />
                    <span className="resume-label" style={{ color: "#ff6b6b" }}>Could not load resumes</span>
                  </div>
                )}
                {fetchState === "done" && resumes.length === 0 && (
                  <div className="resume-dropdown-item" style={{ justifyContent: "center", color: "#ff6b6b" }}>
                    <span className="resume-label" style={{ color: "#ff6b6b" }}>No PDFs found</span>
                  </div>
                )}
                {fetchState === "done" &&
                  resumes.map((r) => (
                    <div key={r.name} className="resume-dropdown-item">
                      <span className="resume-label">{r.name}</span>
                      <div className="resume-actions">
                        <a
                          href={r.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resume-action-btn"
                          download
                          title="Download"
                        >
                          <TbDownload />
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
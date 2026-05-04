import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { MdDownload, MdOpenInNew } from "react-icons/md";
import { useEffect, useState, useRef } from "react";

// ─── Add / remove resumes here ───────────────────────────────────────────────
// Drop the PDF into public/resume/ and add an entry below.
const resumes = [
  { label: "General Resume",  file: "/resume/resume.pdf" },
  // { label: "ML / AI Resume",   file: "/resume/resume-ml.pdf" },
  // { label: "Backend Resume",   file: "/resume/resume-backend.pdf" },
];
// ─────────────────────────────────────────────────────────────────────────────

const SocialIcons = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/dhxrni" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://linkedin.com/in/shivansh-dharni/" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com/dhxrni" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/dhxrni" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>

      {/* ── Resume picker ── */}
      <div className="resume-picker" ref={dropdownRef}>
        {/* Upward dropdown (only when multiple resumes) */}
        {open && resumes.length > 1 && (
          <div className="resume-picker-dropdown">
            {resumes.map((r) => (
              <div className="resume-picker-item" key={r.file}>
                <span className="resume-picker-label">{r.label}</span>
                <div className="resume-picker-actions">
                  <a
                    href={r.file}
                    target="_blank"
                    rel="noreferrer"
                    title="Open"
                    className="resume-picker-btn"
                  >
                    <MdOpenInNew />
                  </a>
                  <a
                    href={r.file}
                    download
                    title="Download"
                    className="resume-picker-btn"
                  >
                    <MdDownload />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main button — if single resume, open directly; else toggle picker */}
        {resumes.length === 1 ? (
          <a
            className={`resume-button`}
            href={resumes[0].file}
            target="_blank"
            rel="noopener noreferrer"
          >
            RESUME
            <span><TbNotes /></span>
          </a>
        ) : (
          <button
            className={`resume-button resume-button--toggle${open ? " resume-button--active" : ""}`}
            onClick={() => setOpen((v) => !v)}
          >
            RESUME
            <span><TbNotes /></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialIcons;

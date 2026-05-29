import { useEffect, useRef } from "react";
import { TbX, TbDownload, TbExternalLink } from "react-icons/tb";
import type { ResumeEntry } from "../data/resumes";
import "./styles/ResumeModal.css";

interface ResumeModalProps {
  resume: ResumeEntry;
  onClose: () => void;
}

const getEmbedUrl = (driveId: string) =>
  `https://drive.google.com/file/d/${driveId}/preview`;

const getDownloadUrl = (driveId: string) =>
  `https://drive.google.com/uc?export=download&id=${driveId}`;

const getViewUrl = (driveId: string) =>
  `https://drive.google.com/file/d/${driveId}/view`;

const ResumeModal = ({ resume, onClose }: ResumeModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      className="resume-modal-overlay"
      ref={overlayRef}
      onClick={handleBackdropClick}
    >
      <div className="resume-modal">
        {/* ── Header ── */}
        <div className="resume-modal-header">
          <span className="resume-modal-title">{resume.label}</span>

          <div className="resume-modal-actions">
            <a
              href={getViewUrl(resume.driveId)}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-modal-btn"
              title="Open in Google Drive"
            >
              <TbExternalLink />
              <span>Open in Drive</span>
            </a>

            <a
              href={getDownloadUrl(resume.driveId)}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-modal-btn resume-modal-btn--download"
              title="Download PDF"
            >
              <TbDownload />
              <span>Download</span>
            </a>

            <button
              className="resume-modal-close"
              onClick={onClose}
              title="Close (Esc)"
            >
              <TbX />
            </button>
          </div>
        </div>

        {/* ── PDF Viewer ── */}
        <div className="resume-modal-body">
          <iframe
            src={getEmbedUrl(resume.driveId)}
            className="resume-modal-iframe"
            title={`Resume: ${resume.label}`}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;

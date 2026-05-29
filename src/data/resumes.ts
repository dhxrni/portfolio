/**
 * Resume config — update this file when you add/change resume versions.
 *
 * HOW TO GET A FILE ID:
 *  1. Open the PDF in Google Drive
 *  2. Click Share → set to "Anyone with the link" → Copy link
 *  3. The link looks like: https://drive.google.com/file/d/FILE_ID/view
 *  4. Paste just the FILE_ID below
 *
 * HOW TO UPDATE A RESUME (zero code changes):
 *  - Simply upload the new version to Drive with the same filename.
 *    Google Drive keeps the same file ID → viewer auto-shows latest.
 *
 * HOW TO ADD A NEW RESUME:
 *  - Upload new PDF to Drive, share it publicly, get the ID, add an entry below.
 */

export interface ResumeEntry {
  /** Display name shown in the dropdown */
  label: string;
  /** Google Drive file ID (from the share link) */
  driveId: string;
}

const resumes: ResumeEntry[] = [
  {
    label: "Complete Resume",
    driveId: "1iaxtqgpw08nwD5kPRqqeJPOhD_6osr0a",
  },
  {
    label: "Short Resume",
    driveId: "18QDBSUiBz9QZemUoEQ0rSyxE95l4G-kp",
  },
];

export default resumes;

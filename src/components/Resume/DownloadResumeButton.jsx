/**
 * DOWNLOAD RESUME BUTTON
 *
 * Accepts a resumeData object and generates a PDF on click
 */
import { pdf } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';
import { RESUME_DATA } from '../../constants/RESUME';

export const DownloadResumeButton = (
  {
    resumeData = RESUME_DATA,
    styles = {
      minWidth: '200px',
      backgroundColor: 'var(--bg-2)',
    },
    buttonText = 'Download Resume as PDF',
  } = {}
) => {
  const yr = new Date().getFullYear();
  const handleDownload = async () => {
    const pdfBlob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Blaine Rudow Resume ${yr}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return <button className="btn btn-primary" style={styles} onClick={handleDownload}>{buttonText}</button>;
};

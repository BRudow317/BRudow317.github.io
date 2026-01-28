/**
 * RESUME PAGE
 * @dependency @react-pdf/renderer@4.3.2
 */
// import { useRef } from 'react';
import { Resume } from '../components/Resume/Resume';
import { DownloadResumeButton } from '../components/Resume/DownloadResumeButton';


export const ResumePage = () => {
//   const resRef = useRef(Resume);
// const resButton = DownloadResumeButton({resumeRef: resRef});
  return (
  <main role="main" name="resume-page">
    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '18px'}}>
      <DownloadResumeButton />
    </div>
    <Resume />
  </main>
);}
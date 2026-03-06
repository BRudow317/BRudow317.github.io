/**
 * RESUME PAGE
 * @dependency @react-pdf/renderer@4.3.2
 */
import { Resume } from '../components/Resume/Resume';
import { DownloadResumeButton } from '../components/Resume/DownloadResumeButton';
import { RESUME_LIST } from '../constants/RESUME';
import { useData } from '../context/DataContext';

export const ResumePage = () => {
  const { dataContext } = useData();
  const resumeData = RESUME_LIST.find(r => r.id === dataContext) ?? RESUME_LIST[0];

  return (
  <main role="main" name="resume-page">
    <div style={{display: 'flex', justifyContent: 'center', paddingBottom: '18px'}}>
      <DownloadResumeButton resumeData={resumeData} />
    </div>
    <Resume resumeData={resumeData} />
  </main>
);}

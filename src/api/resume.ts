import axios from 'axios';
import { API_URL } from '../constants/ENV_CACHE';
import { RESUME_DATA } from '../constants/RESUME';
import { useData } from '../context/DataContext';

export type PersonalSiteLink = {
  id: string;
  website: string;
  url: string;
};

export type EducationItem = {
    id: string;
  degree: string;
  detail: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type ProfessionalSummaryItem = {
  id: string;
  title: string;
  text: string;
};

export type HistoryBullet = {
  label: string;
  text: string;
};

export type ProfessionalHistoryItem = {
  id: string;
  title: string;
  company: string;
  dates: string;
  summary?: string;
  bullets: HistoryBullet[];
};

export type SkillItem = {
  id: string;
  label: string;
  text: string;
};

export type ResumeData = {
  resume: string;
  type: string;
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  title: string;
  sites: PersonalSiteLink[];
  education: EducationItem[];
  certifications: CertificationItem[];
  professional_summary: ProfessionalSummaryItem;
  professional_history: ProfessionalHistoryItem[];
  skills_data: SkillItem[];

};

const { dataContext } = useData();

export type getResume = () => Promise<{ data: ResumeData[] }>;

export const getResume = async () => {
  try {
    const response = await axios.get(`${API_URL}/resume`, {
      params: { resume: 'resume', type: dataContext }
    });
    return response;
  } catch (error) {
    console.log('Error, Reverting to cached demo data');
    return { data: RESUME_DATA };
  }
};
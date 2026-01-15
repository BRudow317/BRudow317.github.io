/**
 * @description List of personal data for the portfolio site.
 * 
 * @exports PERSONAL_DATA as an array of personal objects.
 * 
 */

export const PERSONAL_DATA = [
  { id: "person",
    name: "Blaine Rudow",
    location: "Indianapolis, IN",
    phone: "217-521-5468",
    email: "blainerudow@gmail.com",
  },
  { 
    id: "company",
    company: [
            {id: "inprs", companyName: "Indiana Public Retirement Systems", companyUrl: "https://www.in.gov/inprs/",
             role: "Senior Systems Analyst", attendance: {start: "February 2022", end: "Present"} },
            {id: "cloudvoyages", companyName: "Cloud Voyages LLC", companyUrl: "https://cloudvoyages.com/", 
            role: "Founder & Full Stack Engineer", attendance: {start: "October 2025", end: "Present"} },
            {id: "appdev", companyName: "Indiana Public Retirement Systems", companyUrl: "https://www.in.gov/inprs/", 
            role: "Application Developer", attendance: {start: "April 2020", end: "February 2022"} },
        ],
  },
  {
    id: "education",
    education: [
        {id: "bachelors", school: "Indiana University Indianapolis", degree: "B.S. Informatics & Computing",
         attendence: {start: "2020", end: "2024"} },
        {id: "associates", school: "Ivy Tech Community College", degree: "A.S. Software Development",
         attendence: {start: "2018", end: "2020"} },
    ],
  },
  {
    id: "sites",
    sites: [
        {id: "linkedin", website: "Linkedin", url: "https://www.linkedin.com/in/blaine-rudow/"},
        {id: "github", website: "GitHub", url: "https://github.com/brudow317"},
        {id: "gitpages", website: "GitPages", url: "https://brudow317.github.io/"},
        {id: "quickbitlabs", website: "QuickBitLabs", url: "https://quickbitlabs.com/"},
        {id: "cloudvoyages", website: "Cloud Voyages Consulting", url: "https://cloudvoyages.com/"},
    ],
  },
];
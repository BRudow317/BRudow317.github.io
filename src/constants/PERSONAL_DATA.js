/**
 * @description List of personal data for the portfolio site.
 * 
 * @exports PERSONAL_DATA as an object containing personal information.
 * 
 */

export const PERSONAL_DATA = {
    id: "person",
    name: "Blaine Rudow",
    location: "Indianapolis, IN",
    phone: "217-521-5468",
    email: "blainerudow@gmail.com",
    title: "Software Engineer",
    sites: [
        {type: "linkedin", id: "linkedin", website: "Linkedin", url: "https://www.linkedin.com/in/blaine-rudow/"},
        {type: "github", id: "github", website: "GitHub", url: "https://github.com/brudow317"},
        {type: "profile", id: "gitpages", website: "GitHub Portfolio", url: "https://brudow317.github.io/"},
        {type: "personal", id: "cloudvoyages", website: "Cloud Voyages", url: "https://cloudvoyages.com/"},
    ],
    education: [
      { degree: "B.S., Informatics & Computing", detail: " (Minor: HCI/UX) | Indiana University Indianapolis | 2020-2022" },
      { degree: "A.S., Software Development", detail: " | Ivy Tech Community College | 2018-2020" }
    ],
    infoSites: [
      {type: "fullstack", id: "fullstack", website: "What is Full Stack Development?", url: "https://aws.amazon.com/what-is/full-stack-development/"},
      {type: "cloud_engineer", id: "cloudcomputing", website: "What is Cloud Computing?", url: "https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/"},
      {type: "devops", id: "devops", website: "What is DevOps?", url: "https://aws.amazon.com/devops/what-is-devops/"},
      {type: "default", id: "softwareengineer", website: "What is a Software Engineer?", url: "https://www.computerscience.org/careers/software-engineer/"}
    ],
    certifications: [
      {id: "csd", name: "Certified Scrum Developer", issuer: "Scrum Alliance", date: "June 2024"},
      {id: "advsql", name: "Advanced SQL for Data Scientists", issuer: "Linkedin Learning", date: "Oct 2022"},
      {id: "hci", name: "Certificate in HCI/UX", issuer: "Indiana University Indianapolis", date: "May 2022"},
    ],
}; 
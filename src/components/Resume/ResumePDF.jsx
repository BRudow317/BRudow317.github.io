/**
 * RESUME PDF COMPONENT
 * @see https://react-pdf.org/
 * @install npm install @react-pdf/renderer --save
 * Uses @react-pdf/renderer to create a PDF version of the resume
 * @dependency @react-pdf/renderer@4.3.2
 * 
 * @fonts
 * Open Sans - clean, modern
Roboto - Google's standard, professional
Lato - friendly but professional
Source Sans Pro - Adobe's open source, great readability
Inter - designed for screens, very readable
 * 
 */
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { PERSONAL_DATA } from '../../constants/PERSONAL_DATA';
import { SKILLS_DATA } from '../../constants/SKILLS_DATA';
import { PROFESSIONAL_SUMMARY } from '../../constants/PROFESSIONAL_SUMMARY';
import { PROFESSIONAL_HISTORY } from '../../constants/PROFESSIONAL_HISTORY';
// import { SITE_CONTEXT } from '../../constants/SITE_CONTEXT';

// Helper to filter data arrays by context type with fallback to "default"
const filterByContext = (dataArray, contextId) => {
  const contextItems = dataArray.filter((item) => item.type === contextId);
  return contextItems.length > 0
    ? contextItems
    : dataArray.filter((item) => item.type === "default");
}; 

// Register local Roboto font files from public/Roboto/static
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/Roboto/static/Roboto-Regular.ttf', fontWeight: 'normal' },
    { src: '/Roboto/static/Roboto-Italic.ttf', fontWeight: 'normal', fontStyle: 'italic' },
    { src: '/Roboto/static/Roboto-Bold.ttf', fontWeight: 'bold' },
    { src: '/Roboto/static/Roboto-BoldItalic.ttf', fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

// Disable hyphenation to prevent mid-word breaks
Font.registerHyphenationCallback(word => [word]);


export const ResumePDF = ({
    dataContext = "software_engineer",
    personalData = PERSONAL_DATA,
    // professionalSummary = PROFESSIONAL_SUMMARY.find(obj => obj.id === 'primary'),
    // skills = SKILLS_DATA,
    // experience = PROFESSIONAL_HISTORY,
    education = PERSONAL_DATA.education,
    certifications = PERSONAL_DATA.certifications,
    textSize = 11,
    defaultFont = 'Roboto',
    defaultBold = 'Roboto',
    defaultLineHeight = textSize / 10, // ratio to font size.
    defaultMargin = textSize / 3,
    styles = {
      page: {
        padding: 40,
        fontFamily: defaultFont,
        fontSize: textSize,
        marginBottom: defaultMargin,
      },
      //h1
      name: {
        fontSize: 2 * textSize,
        marginTop: 0,
        marginBottom: defaultMargin * 2,
        textAlign: 'center',
        fontFamily: defaultBold,
        fontWeight: 'bold',
      },
      //h2
      title: {
        fontSize: 1.4 * textSize,
        textAlign: 'center',
        fontFamily: defaultBold,
        fontWeight: 'bold',
        marginBottom: defaultMargin * 1.8,
      },
      //h3
      sectionHeader: {
        fontSize: 1.2 * textSize,
        lineHeight: textSize / 10,
        fontFamily: defaultBold,
        fontWeight: 'bold',
        marginTop: defaultMargin * 2,
        marginBottom: defaultMargin * 1.5,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
      },
      //h4
      jobTitle: {
        fontSize: 1 * textSize,
        lineHeight: textSize / 10,
        fontFamily: defaultBold,
        fontWeight: 'bold',
        marginBottom: defaultMargin * 1.2,
        marginTop: defaultMargin * 1.2
      },
      jobDetails: {
        fontFamily: defaultFont,
        fontSize: textSize,
        fontStyle: 'italic',
        lineHeight: defaultLineHeight,
        marginBottom: defaultMargin *1.2,
      },
      contactLine: {
        textAlign: 'center',
        fontSize: textSize,
        lineHeight: defaultLineHeight,
        marginBottom: defaultMargin,
      },
      contactSites: {
        textAlign: 'center',
        color: 'blue',
        textDecoration: 'underline',
        fontSize: textSize,
        lineHeight: defaultLineHeight,
        marginBottom: defaultMargin,
      },
      labelText:{
        fontFamily: defaultBold,
        fontWeight: 'bold',
        fontSize: textSize,
        lineHeight: defaultLineHeight,
        marginBottom: defaultMargin,
      },
      defaultText: {
        fontFamily: defaultFont,
        fontSize: textSize,
        lineHeight: defaultLineHeight,
        marginBottom: defaultMargin,
      },
      bulletText: {
        fontFamily: defaultFont,
        fontSize: textSize,
        lineHeight: defaultLineHeight,
        marginBottom: defaultMargin,
      },
      bulletItem: {
        fontFamily: defaultFont,
        fontSize: textSize,
        lineHeight: defaultLineHeight,
        marginBottom: defaultMargin,
        marginLeft: (textSize*1.6)-textSize,
        textIndent: textSize - (textSize*1.6),
      },
    }
}={}) => {

// Filter data based on context (falls back to "default" if no match)
const skills = filterByContext(SKILLS_DATA, dataContext);
const experience = filterByContext(PROFESSIONAL_HISTORY, dataContext);
const professionalSummary = PROFESSIONAL_SUMMARY.find((s) => s.id === dataContext)
  || PROFESSIONAL_SUMMARY.find((s) => s.id === "default")
  || PROFESSIONAL_SUMMARY[0];

// Get title from professional summary, fallback to personalData.title
const title = professionalSummary.title || personalData.title;

const PdfStyle = StyleSheet.create(styles);

return (
  <Document>
    <Page style={PdfStyle.page}>
      {/* Header */}
      <Text style={PdfStyle.name}>{personalData.name}</Text>
      <Text style={PdfStyle.title}>{title}</Text>
      
      {/* Contact */}
      <Text style={{...PdfStyle.defaultText, ...PdfStyle.contactLine}}>
        {personalData.location} • {personalData.phone} • {personalData.email}
      </Text>

      <Text>
        {personalData.sites.map((site, i) => (
          <Text key={site.id} style={PdfStyle.defaultText}>
            {i > 0 && ' • '}
            <Link src={site.url} style={{...PdfStyle.defaultText, ...PdfStyle.contactSites}}
            >{site.website}</Link>
          </Text>
        ))}
      </Text>

      {/* Professional Summary */}
      <Text style={PdfStyle.sectionHeader}>Professional Summary</Text>
      {/* <Text style={PdfStyle.paragraph} */}
      <Text style={PdfStyle.defaultText}>{professionalSummary.text}</Text>

      {/* Skills */}
      <Text style={PdfStyle.sectionHeader}>Core Technical Skills</Text>
      {skills.map((skill, i) => (
        <View key={i} >
          <Text><Text style={PdfStyle.labelText}>{skill.label}: </Text><Text style={PdfStyle.defaultText}>{skill.text}</Text></Text>
        </View>
      ))}

      {/* Experience */}
      <Text style={PdfStyle.sectionHeader}>Professional Experience</Text>
      {experience.map((job, i) => (
        <View key={i}>
          <Text style={PdfStyle.jobTitle}>{job.title}</Text>
          <Text style={PdfStyle.jobDetails}>{job.company} | {job.dates}
          </Text>
          {/*  style={PdfStyle.bulletList} */}
          <View>
            {job.bullets.map((bullet, j) => (
              <Text key={j} style={PdfStyle.bulletItem}>
                • {bullet.text}
              </Text>
            ))}
          </View>
        </View>
      ))}

      {/* Education */}
      <Text style={PdfStyle.sectionHeader}>Education</Text>
      {education.map((edu, i) => (
        <Text key={i} style={PdfStyle.defaultText}>
          {edu.degree}{edu.detail}
        </Text>
      ))}

      {/* Certifications */}
      <Text style={PdfStyle.sectionHeader}>Certifications</Text>
      {certifications.map((cert, i) => (
        <Text key={i} style={PdfStyle.defaultText}>
          {cert.name} | {cert.issuer} | {cert.date}
        </Text>
      ))}
    </Page>
  </Document>
);

};

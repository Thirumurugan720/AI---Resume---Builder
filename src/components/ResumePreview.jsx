import { Mail, MapPin, Phone } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

function ResumePreview({ resume, template }) {
  const experiences = (resume.experiences || []).filter((item) => item.title || item.company || item.responsibilities)
  const projects = (resume.projects || []).filter((item) => item.title || item.description)
  const certifications = (resume.certifications || []).filter((item) => item.name)
  const languages = (resume.languages || []).filter((item) => item.name)
  const technicalSkills = resume.technicalSkills || resume.skills || []
  const softSkills = resume.softSkills || []
  const educationIsVisible = resume.degree || resume.college || resume.university || resume.graduationYear || resume.grade
  const contactItems = [
    resume.email && <span key="email"><Mail size={10} />{resume.email}</span>,
    resume.phone && <span key="phone"><Phone size={10} />{resume.phone}</span>,
    resume.address && <span key="address"><MapPin size={10} />{resume.address}</span>,
  ].filter(Boolean)

  return (
    <article id="resume-document" className={`resume-document resume-template-${template}`}>
      <header className="resume-doc-header">
        {resume.photo && <img className="resume-profile-photo" src={resume.photo} alt="" />}
        <div className="resume-identity">
          {resume.fullName && <h1>{resume.fullName}</h1>}
          {resume.jobTitle && <p className="resume-job-title">{resume.jobTitle}</p>}
          <div className="resume-contact">{contactItems}</div>
          <div className="resume-social">
            {resume.linkedin && <a href={resume.linkedin.startsWith('http') ? resume.linkedin : `https://${resume.linkedin}`} target="_blank" rel="noreferrer"><FiLinkedin size={9} />{resume.linkedin}</a>}
            {resume.github && <a href={resume.github.startsWith('http') ? resume.github : `https://${resume.github}`} target="_blank" rel="noreferrer"><FiGithub size={9} />{resume.github}</a>}
          </div>
        </div>
      </header>

      {resume.summary && <section className="resume-doc-section"><h2>Profile</h2><p className="resume-summary">{resume.summary}</p></section>}

      {experiences.length > 0 && <section className="resume-doc-section"><h2>Experience</h2>{experiences.map((item, index) => (
        <div className="resume-experience" key={`exp-${index}`}>
          <div className="resume-entry-heading"><div><strong>{item.title}</strong>{item.company && <span className="resume-company">{item.company}</span>}</div><span className="resume-dates">{[item.startDate, item.endDate].filter(Boolean).join(' — ')}</span></div>
          {item.responsibilities && <ul>{item.responsibilities.split(/\n+/).map((line, bulletIndex) => line.trim() && <li key={`bullet-${bulletIndex}`}>{line.trim().replace(/^[-•]\s*/, '')}</li>)}</ul>}
        </div>
      ))}</section>}

      {educationIsVisible && <section className="resume-doc-section"><h2>Education</h2><div className="resume-entry-heading"><div>{resume.degree && <strong>{resume.degree}</strong>}{(resume.college || resume.university) && <span className="resume-company">{resume.college || resume.university}{resume.college && resume.university && resume.college !== resume.university ? ` · ${resume.university}` : ''}</span>}{resume.grade && <span className="resume-company">{resume.grade}</span>}</div><span className="resume-dates">{resume.graduationYear}</span></div></section>}

      {technicalSkills.length + softSkills.length > 0 && <section className="resume-doc-section"><h2>Skills</h2><div className="resume-skills">{[...technicalSkills, ...softSkills].filter(Boolean).map((skill, index) => <span key={`${skill}-${index}`}>{skill}</span>)}</div></section>}

      {projects.length > 0 && <section className="resume-doc-section"><h2>Projects</h2>{projects.map((item, index) => <div className="resume-project" key={`project-${index}`}>{item.title && <strong>{item.title}</strong>}{item.description && <p>{item.description}</p>}{item.technologies && <span className="resume-company">Technologies: {item.technologies}</span>}</div>)}</section>}

      {certifications.length > 0 && <section className="resume-doc-section"><h2>Certifications</h2>{certifications.map((item, index) => <div className="resume-entry-heading" key={`cert-${index}`}><div><strong>{item.name}</strong>{item.organization && <span className="resume-company">{item.organization}</span>}</div><span className="resume-dates">{item.year}</span></div>)}</section>}

      {languages.length > 0 && <section className="resume-doc-section"><h2>Languages</h2><p className="resume-language-list">{languages.map((item) => [item.name, item.proficiency].filter(Boolean).join(' · ')).join('  |  ')}</p></section>}
    </article>
  )
}

export default ResumePreview

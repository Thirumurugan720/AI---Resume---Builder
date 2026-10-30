import { useState } from 'react'
import { Camera, Plus, Sparkles, Trash2, WandSparkles } from 'lucide-react'

function Section({ title, number, children, className = '' }) {
  return <section className={`editor-section ${className}`}><div className="editor-section-heading"><span className="section-number">{number}</span><h3>{title}</h3></div>{children}</section>
}

function TextField({ label, value, onChange, placeholder = '', type = 'text', wide = false, ...props }) {
  return <label className={`form-field ${wide ? 'field-wide' : ''}`}><span>{label}</span><input type={type} value={value || ''} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} {...props} /></label>
}

function ResumeForm({ resume, updateResume, onAI }) {
  const [skillInput, setSkillInput] = useState({ technicalSkills: '', softSkills: '' })
  const [busy, setBusy] = useState('')
  const [aiError, setAiError] = useState('')

  const requestAI = async (action, text, saveResult) => {
    setAiError('')
    setBusy(action)
    try {
      saveResult(await onAI(action, text))
    } catch (error) {
      setAiError(error.message)
    } finally {
      setBusy('')
    }
  }

  const updateArray = (key, index, field, value) => {
    updateResume(key, resume[key].map((item, current) => current === index ? { ...item, [field]: value } : item))
  }
  const addItem = (key, item) => updateResume(key, [...resume[key], item])
  const removeItem = (key, index) => updateResume(key, resume[key].filter((_, current) => current !== index))
  const addSkill = (key) => {
    const skill = skillInput[key].trim()
    if (!skill || (resume[key] || []).includes(skill)) return
    updateResume(key, [...(resume[key] || []), skill])
    setSkillInput((current) => ({ ...current, [key]: '' }))
  }
  const changePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setAiError('Please choose an image file for your profile photo.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setAiError('Please choose a profile photo under 2 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => updateResume('photo', reader.result)
    reader.onerror = () => setAiError('The profile photo could not be read.')
    reader.readAsDataURL(file)
  }

  return (
    <div className="resume-form">
      <Section title="Personal information" number="01">
        <div className="photo-upload-row">
          <div className="photo-placeholder">{resume.photo ? <img src={resume.photo} alt="Profile" /> : <Camera size={19} />}</div>
          <div><label className="upload-link">Upload a profile photo<input type="file" accept="image/*" onChange={changePhoto} /></label><small>Optional · JPG or PNG · Max 2 MB</small></div>
        </div>
        <div className="form-grid">
          <TextField label="Full name" value={resume.fullName} onChange={(value) => updateResume('fullName', value)} placeholder="e.g. Alex Morgan" autoComplete="name" required />
          <TextField label="Job title" value={resume.jobTitle} onChange={(value) => updateResume('jobTitle', value)} placeholder="e.g. Product Designer" />
          <TextField label="Email address" value={resume.email} onChange={(value) => updateResume('email', value)} type="email" placeholder="you@example.com" autoComplete="email" />
          <TextField label="Phone number" value={resume.phone} onChange={(value) => updateResume('phone', value)} type="tel" placeholder="+1 (555) 000-0000" />
          <TextField label="Location" value={resume.address} onChange={(value) => updateResume('address', value)} placeholder="City, State" />
          <TextField label="LinkedIn URL" value={resume.linkedin} onChange={(value) => updateResume('linkedin', value)} placeholder="linkedin.com/in/you" />
          <TextField label="GitHub URL" value={resume.github} onChange={(value) => updateResume('github', value)} placeholder="github.com/you" wide />
        </div>
      </Section>

      <Section title="Professional summary" number="02">
        <label className="form-field field-wide"><span>Your professional story</span><textarea rows="4" value={resume.summary || ''} onChange={(event) => updateResume('summary', event.target.value)} placeholder="A few sentences about your experience, strengths, and what you bring to the role." /></label>
        <div className="ai-action-row">
          <button type="button" className="button button-ai" disabled={Boolean(busy)} onClick={() => requestAI('generate_summary', resume.summary || resume.jobTitle, (value) => updateResume('summary', value))}><Sparkles size={14} /> {busy === 'generate_summary' ? 'Writing…' : 'Generate with AI'}</button>
          <button type="button" className="button button-outline" disabled={Boolean(busy)} onClick={() => requestAI('improve_writing', resume.summary, (value) => updateResume('summary', value))}><WandSparkles size={14} /> {busy === 'improve_writing' ? 'Improving…' : 'Improve writing'}</button>
          <button type="button" className="button button-outline" disabled={Boolean(busy)} onClick={() => requestAI('career_objective', resume.jobTitle, (value) => updateResume('summary', value))}>Career objective</button>
          <button type="button" className="button button-outline" disabled={Boolean(busy)} onClick={() => requestAI('ats_rewrite', `${resume.jobTitle}\n${resume.summary}\n${(resume.experiences || []).map((item) => item.responsibilities).join('\n')}`, (value) => updateResume('summary', value))}>ATS-friendly rewrite</button>
        </div>
      </Section>

      <Section title="Experience" number="03">
        {(resume.experiences || []).map((item, index) => (
          <div className="repeat-card" key={`experience-${index}`}>
            <div className="repeat-card-top"><span>Experience {index + 1}</span><button type="button" className="remove-button" aria-label="Remove experience" onClick={() => removeItem('experiences', index)}><Trash2 size={15} /></button></div>
            <div className="form-grid">
              <TextField label="Job title" value={item.title} onChange={(value) => updateArray('experiences', index, 'title', value)} placeholder="Senior Designer" />
              <TextField label="Company" value={item.company} onChange={(value) => updateArray('experiences', index, 'company', value)} placeholder="Company name" />
              <TextField label="Start date" value={item.startDate} onChange={(value) => updateArray('experiences', index, 'startDate', value)} placeholder="Jan 2022" />
              <TextField label="End date" value={item.endDate} onChange={(value) => updateArray('experiences', index, 'endDate', value)} placeholder="Present" />
              <label className="form-field field-wide"><span>Responsibilities & achievements</span><textarea rows="3" value={item.responsibilities || ''} onChange={(event) => updateArray('experiences', index, 'responsibilities', event.target.value)} placeholder="Describe what you accomplished. Use a new line for each point." /></label>
              <div className="field-wide"><button className="button button-ai button-small" type="button" disabled={Boolean(busy)} onClick={() => requestAI('rewrite_experience', item.responsibilities, (value) => updateArray('experiences', index, 'responsibilities', value))}><WandSparkles size={14} /> {busy === 'rewrite_experience' ? 'Rewriting…' : 'Polish with AI'}</button></div>
            </div>
          </div>
        ))}
        <button className="add-item-button" type="button" onClick={() => addItem('experiences', { title: '', company: '', startDate: '', endDate: '', responsibilities: '' })}><Plus size={16} /> Add experience</button>
      </Section>

      <Section title="Education" number="04">
        <div className="form-grid">
          <TextField label="Degree" value={resume.degree} onChange={(value) => updateResume('degree', value)} placeholder="B.S. Computer Science" />
          <TextField label="College / school" value={resume.college} onChange={(value) => updateResume('college', value)} placeholder="School name" />
          <TextField label="University" value={resume.university} onChange={(value) => updateResume('university', value)} placeholder="University name" />
          <TextField label="Graduation year" value={resume.graduationYear} onChange={(value) => updateResume('graduationYear', value)} placeholder="2024" />
          <TextField label="Grade / GPA" value={resume.grade} onChange={(value) => updateResume('grade', value)} placeholder="3.8 GPA" wide />
        </div>
      </Section>

      <Section title="Skills" number="05">
        {[['technicalSkills', 'Technical skills'], ['softSkills', 'Soft skills']].map(([key, title]) => (
          <div className="skill-group" key={key}>
            <span className="skill-group-label">{title}</span>
            <div className="skill-chips">{(resume[key] || []).map((skill, index) => <span className="skill-chip" key={`${skill}-${index}`}>{skill}<button type="button" aria-label={`Remove ${skill}`} onClick={() => updateResume(key, resume[key].filter((_, current) => current !== index))}>×</button></span>)}</div>
            <div className="add-skill-row"><input value={skillInput[key]} onChange={(event) => setSkillInput((current) => ({ ...current, [key]: event.target.value }))} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addSkill(key) } }} placeholder={`Add ${title.toLowerCase()}…`} /><button type="button" className="button button-outline button-small" onClick={() => addSkill(key)}><Plus size={14} /> Add</button></div>
          </div>
        ))}
        <button type="button" className="button button-ai button-small" disabled={Boolean(busy)} onClick={() => requestAI('suggest_skills', resume.jobTitle, (value) => {
          const suggestions = value.split(/[,;\n]/).map((skill) => skill.replace(/^[-•\d.)\s]+/, '').trim()).filter(Boolean)
          updateResume('technicalSkills', [...new Set([...(resume.technicalSkills || []), ...suggestions])])
        })}><Sparkles size={14} /> {busy === 'suggest_skills' ? 'Finding skills…' : 'Suggest skills for my role'}</button>
      </Section>

      <Section title="Projects" number="06">
        {(resume.projects || []).map((item, index) => (
          <div className="repeat-card" key={`project-${index}`}>
            <div className="repeat-card-top"><span>Project {index + 1}</span><button type="button" className="remove-button" aria-label="Remove project" onClick={() => removeItem('projects', index)}><Trash2 size={15} /></button></div>
            <div className="form-grid">
              <TextField label="Project title" value={item.title} onChange={(value) => updateArray('projects', index, 'title', value)} placeholder="Project name" wide />
              <label className="form-field field-wide"><span>Description</span><textarea rows="3" value={item.description || ''} onChange={(event) => updateArray('projects', index, 'description', event.target.value)} placeholder="What did you build and what was the impact?" /></label>
              <TextField label="Technologies used" value={item.technologies} onChange={(value) => updateArray('projects', index, 'technologies', value)} placeholder="React, Figma, Node.js" wide />
              <div className="field-wide"><button className="button button-ai button-small" type="button" disabled={Boolean(busy)} onClick={() => requestAI('generate_project', `${item.title}: ${item.description}`, (value) => updateArray('projects', index, 'description', value))}><Sparkles size={14} /> {busy === 'generate_project' ? 'Generating…' : 'Generate description'}</button></div>
            </div>
          </div>
        ))}
        <button className="add-item-button" type="button" onClick={() => addItem('projects', { title: '', description: '', technologies: '' })}><Plus size={16} /> Add project</button>
      </Section>

      <Section title="Certifications" number="07">
        {(resume.certifications || []).map((item, index) => (
          <div className="repeat-card" key={`cert-${index}`}><div className="repeat-card-top"><span>Certification {index + 1}</span><button type="button" className="remove-button" aria-label="Remove certification" onClick={() => removeItem('certifications', index)}><Trash2 size={15} /></button></div><div className="form-grid"><TextField label="Certification name" value={item.name} onChange={(value) => updateArray('certifications', index, 'name', value)} placeholder="Certification" /><TextField label="Issuing organization" value={item.organization} onChange={(value) => updateArray('certifications', index, 'organization', value)} placeholder="Organization" /><TextField label="Year" value={item.year} onChange={(value) => updateArray('certifications', index, 'year', value)} placeholder="2024" wide /></div></div>
        ))}
        <button className="add-item-button" type="button" onClick={() => addItem('certifications', { name: '', organization: '', year: '' })}><Plus size={16} /> Add certification</button>
      </Section>

      <Section title="Languages" number="08">
        {(resume.languages || []).map((item, index) => (
          <div className="repeat-card" key={`language-${index}`}><div className="repeat-card-top"><span>Language {index + 1}</span><button type="button" className="remove-button" aria-label="Remove language" onClick={() => removeItem('languages', index)}><Trash2 size={15} /></button></div><div className="form-grid"><TextField label="Language" value={item.name} onChange={(value) => updateArray('languages', index, 'name', value)} placeholder="English" /><label className="form-field"><span>Proficiency</span><select value={item.proficiency} onChange={(event) => updateArray('languages', index, 'proficiency', event.target.value)}><option value="">Select proficiency</option><option>Native</option><option>Fluent</option><option>Professional</option><option>Conversational</option><option>Basic</option></select></label></div></div>
        ))}
        <button className="add-item-button" type="button" onClick={() => addItem('languages', { name: '', proficiency: '' })}><Plus size={16} /> Add language</button>
      </Section>
      {aiError && <p className="ai-error" role="alert">{aiError}</p>}
    </div>
  )
}

export default ResumeForm

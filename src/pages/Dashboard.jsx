import { ArrowLeft, ChevronDown, FileText, Save, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import ResumeForm from '../components/ResumeForm.jsx'
import ResumePreview from '../components/ResumePreview.jsx'
import TemplateSelector from '../components/TemplateSelector.jsx'
import ATSChecker from '../components/ATSChecker.jsx'
import { generateResumeContent } from '../services/aiService.js'

function Dashboard({ resume, updateResume, template, setTemplate, onBack, onClear, onToast, onDownload }) {
  const handleAI = async (action, text) => generateResumeContent({
    action,
    text,
    role: resume.jobTitle,
    resume,
  })

  const completedFields = [resume.fullName, resume.email, resume.jobTitle, resume.summary, (resume.experiences || []).some((item) => item.title), (resume.technicalSkills || []).length].filter(Boolean).length
  const progress = Math.round(completedFields / 6 * 100)

  return (
    <div className="dashboard-page" id="top">
      <Navbar dashboard onOpenBuilder={onBack} />
      <main className="dashboard-main">
        <div className="dashboard-heading">
          <div><button className="back-link" type="button" onClick={onBack}><ArrowLeft size={15} /> Back to home</button><div className="dashboard-title-row"><div><div className="eyebrow">YOUR CAREER, WELL PRESENTED</div><h1>Resume workspace</h1><p>Make it yours, one good detail at a time.</p></div><span className="save-status"><span /> Saved automatically</span></div></div>
        </div>
        <div className="workspace-progress"><div className="progress-copy"><span><Sparkles size={14} /> Your resume is taking shape</span><strong>{progress}% complete</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div></div>
        <div className="dashboard-grid">
          <section className="editor-panel">
            <div className="panel-heading"><div className="panel-heading-icon"><FileText size={17} /></div><div><h2>Your details</h2><p>Good work deserves good storytelling.</p></div><ChevronDown size={17} className="heading-chevron" /></div>
            <ResumeForm resume={resume} updateResume={updateResume} onAI={handleAI} />
            <div className="editor-bottom"><span><Save size={14} /> Your changes are saved in this browser</span><button type="button" className="reset-link" onClick={onClear}>Start over</button></div>
          </section>
          <aside className="preview-column">
            <div className="preview-toolbar"><div><h2>Live preview</h2><p>Updates as you edit</p></div><button className="button button-primary button-small" type="button" onClick={onDownload}>Download PDF</button></div>
            <TemplateSelector value={template} onChange={(value) => { setTemplate(value); onToast('Template updated.') }} />
            <div className="resume-preview-frame"><ResumePreview resume={resume} template={template} /></div>
            <ATSChecker resume={resume} />
            <p className="preview-note">Your resume stays right here in your browser. We never store it on a server.</p>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

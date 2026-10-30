import { useMemo } from 'react'
import { AlertCircle, ArrowRight, CircleCheck, Info, Sparkles } from 'lucide-react'

const roleKeywords = {
  design: ['figma', 'prototyping', 'user research', 'design system', 'accessibility'],
  engineer: ['javascript', 'python', 'api', 'testing', 'cloud'],
  marketing: ['seo', 'campaign', 'analytics', 'content', 'conversion'],
  product: ['roadmap', 'analytics', 'stakeholder', 'user research', 'strategy'],
  default: ['leadership', 'communication', 'analysis', 'project management', 'collaboration'],
}

function analyzeResume(resume) {
  const experiences = resume.experiences || []
  const projects = resume.projects || []
  const skills = [...(resume.technicalSkills || resume.skills || []), ...(resume.softSkills || [])]
  const experienceText = experiences.map((item) => item.responsibilities || '').join(' ')
  const allText = [
    resume.fullName, resume.jobTitle, resume.email, resume.phone, resume.address, resume.summary,
    ...skills, ...experiences.flatMap((item) => [item.title, item.company, item.responsibilities]),
    ...projects.flatMap((item) => [item.title, item.description, item.technologies]),
  ].join(' ').toLowerCase()
  const role = (resume.jobTitle || '').toLowerCase()
  const keywordGroup = role.includes('design') || role.includes('ux') ? roleKeywords.design
    : role.includes('engineer') || role.includes('developer') ? roleKeywords.engineer
      : role.includes('market') || role.includes('content') ? roleKeywords.marketing
        : role.includes('product') ? roleKeywords.product : roleKeywords.default
  const presentKeywords = keywordGroup.filter((keyword) => allText.includes(keyword))
  const missingKeywords = keywordGroup.filter((keyword) => !allText.includes(keyword))
  const weakLines = experienceText.split(/\n+/).map((line) => line.trim()).filter((line) => line.length > 0 && (line.length < 45 || /^(responsible for|helped|worked on|duties included)\b/i.test(line)))
  const hasMetrics = /\b\d+(?:\.\d+)?\s*(?:%|\bpercent\b|\busers?\b|\bcustomers?\b|\bteam\b|\bhours?\b|\bdays?\b|\bweeks?\b|\bmonths?\b|\byears?\b|\bk\b|\bm\b)/i.test(allText)

  const checks = [
    { label: 'Contact details included', ok: Boolean(resume.email && resume.phone), weight: 15 },
    { label: 'Professional summary added', ok: Boolean(resume.summary && resume.summary.trim().length >= 80), weight: 15 },
    { label: 'Relevant experience listed', ok: experiences.some((item) => item.title && item.responsibilities), weight: 18 },
    { label: 'Skills section included', ok: skills.filter(Boolean).length >= 5, weight: 14 },
    { label: 'Role-specific keywords', ok: presentKeywords.length >= 3, weight: 16 },
    { label: 'Achievement metrics', ok: hasMetrics, weight: 12 },
    { label: 'Education or projects included', ok: Boolean(resume.degree || resume.college || projects.some((item) => item.title)), weight: 10 },
  ]
  const score = checks.reduce((total, check) => total + (check.ok ? check.weight : 0), 0)
  const suggestions = []
  if (!resume.email || !resume.phone) suggestions.push('Add both an email address and phone number so recruiters can reach you.')
  if (!resume.summary || resume.summary.trim().length < 80) suggestions.push('Expand your summary to 2–3 specific sentences about your strengths and experience.')
  if (!checks[5].ok) suggestions.push('Add measurable outcomes, such as percentages, time saved, or customers reached.')
  if (missingKeywords.length) suggestions.push(`Consider adding relevant keywords where accurate: ${missingKeywords.slice(0, 3).join(', ')}.`)
  if (weakLines.length) suggestions.push('Strengthen short experience bullets with an action, scope, and result.')
  if (!suggestions.length) suggestions.push('Strong foundation. Tailor keywords and achievements to each job description.')

  return { score: Math.min(100, score), checks, missingKeywords, weakLines, suggestions }
}

function ATSChecker({ resume }) {
  const analysis = useMemo(() => analyzeResume(resume), [resume])
  const scoreColor = analysis.score >= 75 ? '#23856d' : analysis.score >= 50 ? '#c28a36' : '#c76155'

  return (
    <section className="ats-panel">
      <div className="ats-panel-title"><div><span className="eyebrow">A QUICK CHECK BEFORE YOU GO</span><h3>ATS readiness</h3></div><span className="ats-info" title="A practical content check, not a guarantee of how every hiring system scores resumes."><Info size={15} /></span></div>
      <div className="ats-overview">
        <div className="ats-score-ring" style={{ '--score': `${analysis.score * 3.6}deg`, '--score-color': scoreColor }}><div><strong>{analysis.score}</strong><small>/ 100</small></div></div>
        <div className="ats-score-text"><strong>{analysis.score >= 75 ? 'Looking strong' : analysis.score >= 50 ? 'Room to improve' : 'Let’s build it up'}</strong><span>Based on your resume content</span><div className="ats-meter"><i style={{ width: `${analysis.score}%`, background: scoreColor }} /></div></div>
      </div>
      <div className="ats-check-list">{analysis.checks.map((check) => <div className="ats-check" key={check.label}><span className={check.ok ? 'check-ok' : 'check-missing'}>{check.ok ? <CircleCheck size={15} /> : <AlertCircle size={15} />}</span><span>{check.label}</span><b>{check.ok ? 'Good' : 'Add'}</b></div>)}</div>
      {analysis.missingKeywords.length > 0 && <div className="keyword-suggestions"><span>Possible keywords to consider</span><div>{analysis.missingKeywords.slice(0, 5).map((keyword) => <i key={keyword}>{keyword}</i>)}</div></div>}
      {analysis.weakLines.length > 0 && <div className="weak-copy-note"><AlertCircle size={14} /><span>{analysis.weakLines.length} experience {analysis.weakLines.length === 1 ? 'bullet may' : 'bullets may'} need more detail.</span></div>}
      <div className="ats-tips"><span><Sparkles size={14} /> Suggestions</span>{analysis.suggestions.slice(0, 3).map((suggestion, index) => <p key={`suggestion-${index}`}><ArrowRight size={12} />{suggestion}</p>)}</div>
      <p className="ats-disclaimer">An estimate based on common resume best practices, not a guarantee of any employer’s ATS results.</p>
    </section>
  )
}

export default ATSChecker

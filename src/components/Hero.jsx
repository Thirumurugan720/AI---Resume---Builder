import { ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-react'

function Hero({ onGetStarted }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
        <h1>Make your next move <span>your best one.</span></h1>
        <p className="hero-description">A resume that opens doors, built in minutes. Meet the AI-powered resume builder that makes your experience impossible to overlook.</p>
        <div className="hero-actions">
          <button className="button button-primary button-large" type="button" onClick={onGetStarted}>Build my resume <ArrowRight size={17} /></button>
          <a className="button button-soft button-large" href="#templates">Explore templates <ChevronRight size={17} /></a>
        </div>
        <div className="hero-proof">
          <div className="avatar-stack" aria-hidden="true"><span>J</span><span>M</span><span>A</span><span>+</span></div>
          <div><strong>12,000+</strong><span> resumes created this month</span></div>
        </div>
        <div className="hero-checks"><span><Check size={14} /> Free to get started</span><span><Check size={14} /> ATS-ready templates</span></div>
      </div>
      <div className="hero-visual" aria-label="Resume preview illustration">
        <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
        <div className="resume-card">
          <div className="resume-card-top"><span className="resume-mini-logo">M</span><div><i /><i /><i /></div><div className="mini-contact"><i /><i /></div></div>
          <div className="resume-mini-body">
            <div className="mini-left">
              <span className="mini-section-title">PROFILE</span><i className="mini-line long" /><i className="mini-line" /><i className="mini-line mid" />
              <span className="mini-section-title">EXPERIENCE</span><b>Senior Product Designer</b><i className="mini-line mid" /><i className="mini-line long" /><i className="mini-line" /><i className="mini-line mid" />
              <b>Product Designer</b><i className="mini-line mid" /><i className="mini-line long" /><i className="mini-line" />
            </div>
            <div className="mini-right">
              <span className="mini-section-title">EDUCATION</span><b>Design & Technology</b><i className="mini-line long" />
              <span className="mini-section-title">SKILLS</span><div className="mini-pills"><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
        <div className="floating-note ai-note"><span className="note-icon"><Sparkles size={16} /></span><div><strong>AI-enhanced</strong><small>Writing that gets noticed</small></div></div>
        <div className="floating-note score-note"><div className="score-ring">92</div><div><strong>ATS score</strong><small>Looking great!</small></div></div>
        <div className="hero-sparkle sparkle-one">✳</div><div className="hero-sparkle sparkle-two">✦</div>
      </div>
    </section>
  )
}

export default Hero

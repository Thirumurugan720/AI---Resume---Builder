import { ArrowDown, ArrowRight, Check, FileText, MousePointer2, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'
import { templates } from '../data/templates.js'

function Home({ onGetStarted, onOpenBuilder }) {
  return (
    <div className="landing-page">
      <Navbar onGetStarted={onGetStarted} onOpenBuilder={onOpenBuilder} />
      <main>
        <Hero onGetStarted={onGetStarted} />
        <div className="trust-strip"><span>BUILT FOR THE WAY YOU WORK</span><div><b>Thoughtful</b><i /> <b>ATS-friendly</b><i /> <b>Always yours</b></div></div>
        <Features />
        <section className="how-section">
          <div className="how-heading"><div className="eyebrow">LESS OVERTHINKING, MORE APPLYING</div><h2>Three steps to <span>what’s next.</span></h2><p>No blank-page panic. No formatting rabbit holes. Just a resume that feels like you.</p><button className="button button-primary" type="button" onClick={onGetStarted}>Let’s get started <ArrowRight size={16} /></button></div>
          <div className="how-steps">
            {[['01', FileText, 'Add your experience', 'Bring the details. We’ll help you turn them into a story worth reading.'], ['02', Sparkles, 'Make it yours', 'Get a hand from AI, pick your favorite look, and keep every detail in your control.'], ['03', MousePointer2, 'Go get that job', 'Check your resume, download a polished PDF, and apply with confidence.']].map(([number, Icon, title, text]) => <article className="how-step" key={number}><span className="step-number">{number}</span><span className="step-icon"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p><Check className="step-check" size={16} /></article>)}
          </div>
        </section>
        <section className="template-showcase" id="templates">
          <div className="template-showcase-heading"><div><div className="eyebrow">YOUR EXPERIENCE, YOUR STYLE</div><h2>Find a look that feels like you.</h2><p>Four considered templates. Each one ready for the next opportunity.</p></div><button className="text-button" type="button" onClick={onGetStarted}>Explore all templates <ArrowRight size={15} /></button></div>
          <div className="landing-template-grid">{templates.map((template) => <button className="landing-template" type="button" key={template.id} onClick={onGetStarted}><span className={`template-thumb ${template.className}`}><i /><i /><i /><i /><i /><i /></span><span><strong>{template.name}</strong><small>{template.note}</small></span><ArrowDown size={14} /></button>)}</div>
        </section>
        <section className="bottom-cta"><div className="bottom-cta-star">✳</div><div><div className="eyebrow">A GOOD NEXT STEP</div><h2>Your experience deserves <span>a great introduction.</span></h2><p>Put your best work into words and see where it takes you.</p></div><button className="button button-primary button-large" type="button" onClick={onGetStarted}>Build my resume <ArrowRight size={17} /></button></section>
      </main>
      <Footer onGetStarted={onGetStarted} />
    </div>
  )
}

export default Home

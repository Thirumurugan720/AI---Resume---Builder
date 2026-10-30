import { ArrowUpRight } from 'lucide-react'

function Footer({ onGetStarted }) {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-main">
        <div><a className="brand footer-brand" href="#home"><span className="brand-mark">r<span>.</span></span><span>resume<span className="brand-ai">ai</span></span></a><p>A little help for the next big thing.</p></div>
        <div className="footer-cta"><div><strong>Your next opportunity is waiting.</strong><span>Let’s make sure your resume is ready for it.</span></div><button className="button button-light" onClick={onGetStarted} type="button">Build your resume <ArrowUpRight size={16} /></button></div>
      </div>
      <div className="footer-bottom"><span>© 2025 ResumeAI. Made for what’s next.</span><span>Thoughtful tools for your next chapter.</span></div>
    </footer>
  )
}

export default Footer

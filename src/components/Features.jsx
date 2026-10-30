import { ArrowUpRight, FileCheck2, Gauge, WandSparkles } from 'lucide-react'

const features = [
  { icon: WandSparkles, title: 'Words that work harder', text: 'Turn your experience into a story hiring managers want to read. Let AI help you find just the right words.', color: 'lavender' },
  { icon: FileCheck2, title: 'Made for the machines', text: 'Get past applicant tracking systems with clean layouts, relevant keywords, and ATS-friendly formatting.', color: 'peach' },
  { icon: Gauge, title: 'Know where you stand', text: 'Get an instant resume score with practical suggestions to make every application stronger.', color: 'mint' },
]

function Features() {
  return (
    <section className="features-section" id="features">
      <div className="section-heading">
        <div className="eyebrow">A LITTLE HELP GOES A LONG WAY</div>
        <h2>More than a pretty template.</h2>
        <p>Everything you need to put your best self on paper—and in front of the right people.</p>
      </div>
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, text, color }, index) => (
          <article className={`feature-card feature-${color}`} key={title}>
            <div className="feature-top"><span className="feature-icon"><Icon size={20} /></span><span className="feature-index">0{index + 1}</span></div>
            <h3>{title}</h3><p>{text}</p>
            <a href="#templates" className="feature-link">See how it works <ArrowUpRight size={15} /></a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features

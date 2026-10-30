import { useEffect, useState } from 'react'
import { Check, Download, Moon, Printer, RotateCcw, Sun } from 'lucide-react'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { initialResume } from './utils/resume.js'
import './App.css'

const STORAGE_KEY = 'resumeai-resume'
const THEME_KEY = 'resumeai-theme'

function App() {
  const [page, setPage] = useState('home')
  const [resume, setResume] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...initialResume, ...JSON.parse(saved) } : initialResume
    } catch (error) {
      console.error('Unable to restore saved resume:', error)
      return initialResume
    }
  })
  const [template, setTemplate] = useState('modern')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === 'dark')
  const [toast, setToast] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resume))
    } catch (error) {
      console.error('Unable to save resume:', error)
    }
  }, [resume])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3500)
    return () => window.clearTimeout(timer)
  }, [toast])

  const openBuilder = () => {
    setPage('dashboard')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateResume = (key, value) => {
    setResume((current) => ({ ...current, [key]: value }))
  }

  const clearResume = () => {
    if (!window.confirm('Clear all resume information? This cannot be undone.')) return
    setResume(initialResume)
    setToast('Your resume has been cleared.')
  }

  const downloadPdf = async () => {
    if (!resume.fullName?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.email || '')) {
      setToast('Add your full name and a valid email address before downloading.')
      return
    }
    const element = document.getElementById('resume-document')
    if (!element) {
      setToast('The resume preview is not ready yet.')
      return
    }
    try {
      const { default: html2pdf } = await import('html2pdf.js')
      const filename = `${resume.fullName.trim().replace(/[\\/:*?"<>|]+/g, '')} Resume.pdf`
      await html2pdf().set({
        margin: [8, 8, 8, 8],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      }).from(element).save()
      setToast('Your PDF is ready to download.')
    } catch (error) {
      console.error('Unable to export resume PDF:', error)
      setToast('Could not create the PDF. Please try the print option instead.')
    }
  }

  return (
    <div className="app-shell">
      {page === 'home' ? (
        <Home onGetStarted={openBuilder} onOpenBuilder={openBuilder} />
      ) : (
        <Dashboard
          resume={resume}
          updateResume={updateResume}
          template={template}
          setTemplate={setTemplate}
          onBack={() => setPage('home')}
          onClear={clearResume}
          onToast={setToast}
          onDownload={downloadPdf}
        />
      )}
      {page === 'dashboard' && (
        <div className="floating-actions">
          <button className="icon-button" type="button" aria-label="Toggle dark mode" onClick={() => setDarkMode((value) => !value)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-button" type="button" aria-label="Print resume" onClick={() => window.print()}>
            <Printer size={18} />
          </button>
          <button className="button button-primary floating-download" type="button" onClick={downloadPdf}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      )}
      {toast && (
        <div className="toast-message" role="status">
          <Check size={17} /> {toast}
        </div>
      )}
      {page === 'dashboard' && (
        <button className="reset-button" type="button" onClick={clearResume}>
          <RotateCcw size={14} /> Clear resume
        </button>
      )}
    </div>
  )
}

export default App

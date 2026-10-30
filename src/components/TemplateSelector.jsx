import { Check } from 'lucide-react'
import { templates } from '../data/templates.js'

function TemplateSelector({ value, onChange }) {
  return (
    <div className="template-picker" id="templates">
      {templates.map((template) => (
        <button className={`template-option ${value === template.id ? 'selected' : ''}`} key={template.id} onClick={() => onChange(template.id)} type="button" aria-pressed={value === template.id}>
          <span className={`template-thumb ${template.className}`}><i /><i /><i /><i /><i /><i /></span>
          <span className="template-meta"><strong>{template.name}</strong><small>{template.note}</small></span>
          {value === template.id && <span className="template-check"><Check size={12} /></span>}
        </button>
      ))}
    </div>
  )
}

export default TemplateSelector

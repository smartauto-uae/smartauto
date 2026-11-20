declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const LEAD_WHATSAPP = '971547011800'
export const ADS_FORM_LEAD_SEND_TO = 'AW-877509719/incrCNuTqrwdENf4tqID'

export function buildLeadMessage(fields: Record<string, string>, source: string): string {
  const lines = [`New enquiry from ${source}`]
  for (const [label, value] of Object.entries(fields)) {
    if (value && value.trim()) lines.push(`${label}: ${value.trim()}`)
  }
  return lines.join('\n')
}

function redirectToWhatsApp(waUrl: string): void {
  let done = false
  const go = () => {
    if (done) return
    done = true
    window.location.href = waUrl
  }

  if (typeof window.gtag !== 'function') {
    go()
    return
  }

  window.gtag('event', 'conversion', {
    send_to: ADS_FORM_LEAD_SEND_TO,
    transport_type: 'beacon',
    event_callback: go,
  })
  window.setTimeout(go, 800)
}

export function submitLeadToWhatsApp({
  formName,
  service,
  branch,
  fields,
  source,
}: {
  formName: string
  service?: string
  branch?: string
  fields: Record<string, string>
  source: string
}): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'generate_lead',
    form_name: formName,
    service: service || '',
    branch: branch || '',
    lead_channel: 'whatsapp',
  })

  const message = buildLeadMessage(fields, source)
  const waUrl = `https://wa.me/${LEAD_WHATSAPP}?text=${encodeURIComponent(message)}`
  redirectToWhatsApp(waUrl)
}

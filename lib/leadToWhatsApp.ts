declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export const LEAD_WHATSAPP = '971547011800'

export function buildLeadMessage(fields: Record<string, string>, source: string): string {
  const lines = [`New enquiry from ${source}`]
  for (const [label, value] of Object.entries(fields)) {
    if (value && value.trim()) lines.push(`${label}: ${value.trim()}`)
  }
  return lines.join('\n')
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
  window.location.href = waUrl
}

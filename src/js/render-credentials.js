import { certificates } from '../data/certificates.js'
import { achievementMedia } from '../data/achievement-media.js'

function element(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text) node.textContent = text
  return node
}

function preview(item, label, className) {
  const link = element('a', className)
  link.href = item.image
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.setAttribute('aria-label', `View ${label} (opens full image in a new tab)`)
  const img = element('img')
  img.src = item.image
  img.alt = item.alt
  img.loading = 'lazy'
  img.decoding = 'async'
  link.append(img)
  return link
}

export function renderCredentials() {
  const gallery = document.querySelector('[data-achievement-media]')
  if (gallery) gallery.replaceChildren(...achievementMedia.map((item, index) => {
    const figure = element('figure', `achievement-media${index === 0 ? ' achievement-media--primary' : ''}`)
    figure.append(preview(item, item.caption, 'achievement-media__link'),
      element('figcaption', '', item.caption))
    return figure
  }))

  const grid = document.querySelector('[data-certificates]')
  if (grid) grid.replaceChildren(...certificates.map(item => {
    const card = element('article', 'certificate-card')
    const headingId = `certificate-${item.id}`
    card.setAttribute('aria-labelledby', headingId)
    const body = element('div', 'certificate-card__body')
    const meta = [item.category, item.year].filter(Boolean).join(' / ')
    if (meta) body.append(element('p', 'section-label', meta))
    const title = element('h3', '', item.title || 'Certificate')
    title.id = headingId
    body.append(title)
    if (item.issuer) body.append(element('p', 'text-muted', item.issuer))
    body.append(element('p', 'certificate-card__hint', 'Open preview to view full document ↗'))
    card.append(preview(item, item.title || 'certificate', 'certificate-card__preview'), body)
    return card
  }))
}

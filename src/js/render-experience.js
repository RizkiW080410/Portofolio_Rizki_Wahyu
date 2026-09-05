import { experiences } from '../data/experiences.js'

export function renderExperience(container) {
  if (!container) return
  const fragment = document.createDocumentFragment()
  for (const experience of experiences) {
    const article = document.createElement('article')
    article.className = 'experience-item'
    const year = document.createElement('p')
    year.className = 'section-label'
    year.textContent = experience.year
    const heading = document.createElement('h3')
    heading.textContent = experience.role
    const company = document.createElement('p')
    company.className = 'body-large'
    company.textContent = experience.company
    const description = document.createElement('p')
    description.textContent = experience.description
    const list = document.createElement('ul')
    for (const responsibility of experience.responsibilities) {
      const item = document.createElement('li')
      item.textContent = responsibility
      list.append(item)
    }
    article.append(year, heading, company, description, list)
    fragment.append(article)
  }
  container.replaceChildren(fragment)
}

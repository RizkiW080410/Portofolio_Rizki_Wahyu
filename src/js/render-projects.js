import { createProjectMedia } from './project-media.js'
import { projects } from '../data/projects.js'

export function renderProjects(container) {
  if (!container) return
  const fragment = document.createDocumentFragment()
  for (const project of projects) {
    const card = document.createElement('article')
    card.className = 'project-card'
    const preview = createProjectMedia(project)
    const type = document.createElement('p')
    type.className = 'section-label'
    type.textContent = project.featured ? 'Primary project / ' + project.type : project.type
    const title = document.createElement('h3')
    title.textContent = project.title
    card.append(preview, type, title)
    if (project.description) {
      const description = document.createElement('p')
      description.textContent = project.description
      card.append(description)
    }
    if (project.technologies.length) {
      const list = document.createElement('ul')
      list.className = 'tag-list'
      for (const technology of project.technologies) {
        const item = document.createElement('li')
        item.textContent = technology
        list.append(item)
      }
      card.append(list)
    }
    const link = document.createElement('a')
    link.href = project.githubUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.setAttribute('aria-label', 'View ' + project.title + ' on GitHub')
    link.textContent = 'GitHub \u2197'
    card.append(link)
    const live = document.createElement(project.liveUrl ? 'a' : 'p')
    if (project.liveUrl) {
      live.href = project.liveUrl
      live.target = '_blank'
      live.rel = 'noopener noreferrer'
      live.textContent = 'View ' + project.title + ' live demo'
    } else {
      live.className = 'text-muted'
      live.textContent = 'Live Demo — Coming Soon'
    }
    card.append(live)
    fragment.append(card)
  }
  container.replaceChildren(fragment)
}

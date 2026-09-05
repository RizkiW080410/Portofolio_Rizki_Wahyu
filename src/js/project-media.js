// src values must be imported asset URLs supplied in projects.js, not filesystem paths.
export function createProjectMedia(project) {
  const area = document.createElement('div')
  area.className = 'project-card__preview'
  const media = project.media ?? []
  if (!media.length) {
    const number = document.createElement('span')
    number.className = 'section-label'
    number.textContent = project.number + ' / ' + project.type
    const title = document.createElement('p')
    title.className = 'body-large'
    title.textContent = project.title
    const pending = document.createElement('p')
    pending.className = 'section-label'
    pending.textContent = 'Media coming soon'
    area.append(number, title, pending)
    return area
  }
  area.classList.add('project-card__preview--media')
  const gallery = document.createElement('div')
  gallery.className = 'project-media project-media--' + (project.mediaLayout === 'portrait' ? 'portrait' : 'landscape')
  gallery.setAttribute('aria-label', project.title + ' images')
  gallery.setAttribute('role', 'region')
  const wrapper = document.createElement('div')
  wrapper.className = 'swiper-wrapper'
  for (const [index, item] of media.entries()) {
    const figure = document.createElement('figure')
    figure.className = 'swiper-slide'
    const image = document.createElement('img')
    image.src = item.src
    image.alt = item.alt || project.title + ' supplied screenshot ' + (index + 1)
    image.loading = 'lazy'
    image.decoding = 'async'
    figure.append(image)
    if (item.caption) {
      const caption = document.createElement('figcaption')
      caption.textContent = item.caption
      figure.append(caption)
    }
    wrapper.append(figure)
  }
  gallery.append(wrapper)
  if (media.length > 1) {
    gallery.dataset.projectGallery = project.id
    const controls = document.createElement('div')
    controls.className = 'project-media__controls'
    controls.hidden = true
    for (const direction of ['prev', 'next']) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'project-media__' + direction
      button.textContent = direction === 'prev' ? 'Previous' : 'Next'
      button.setAttribute('aria-label', (direction === 'prev' ? 'Previous' : 'Next') + ' image for ' + project.title)
      controls.append(button)
    }
    const pagination = document.createElement('span')
    pagination.className = 'project-media__pagination'
    pagination.setAttribute('aria-live', 'polite')
    controls.append(pagination)
    gallery.append(controls)
  }
  area.append(gallery)
  return area
}

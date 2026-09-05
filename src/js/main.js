import '../style.css'
import { renderProjects } from './render-projects.js'
import { renderExperience } from './render-experience.js'
import { initNavigation } from './navigation.js'

renderProjects(document.querySelector('[data-projects]'))
renderExperience(document.querySelector('[data-experiences]'))
const cleanupNavigation = initNavigation()

const year = document.querySelector('[data-year]')
if (year) year.textContent = String(new Date().getFullYear())

// Keep library download/initialization failure isolated from content rendering.
let disposed = false
let cleanupMotion
let cleanupSliders
if (document.querySelector('[data-project-gallery]')) {
  import('./project-slider.js')
    .then(({ initProjectSliders }) => {
      if (!disposed) cleanupSliders = initProjectSliders()
    })
    .catch(error => console.warn('Slider unavailable; supplied images remain readable.', error))
}
import('./animations.js')
  .then(({ initAnimations }) => {
    if (!disposed) cleanupMotion = initAnimations()
  })
  .catch(error => console.warn('Motion unavailable; the static portfolio remains usable.', error))

if (import.meta.hot) import.meta.hot.dispose(() => {
  disposed = true
  cleanupMotion?.()
  cleanupSliders?.()
  cleanupNavigation()
})

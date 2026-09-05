import '../style.css'
import { renderProjects } from './render-projects.js'
import { renderExperience } from './render-experience.js'

renderProjects(document.querySelector('[data-projects]'))
renderExperience(document.querySelector('[data-experiences]'))

const year = document.querySelector('[data-year]')
if (year) year.textContent = String(new Date().getFullYear())

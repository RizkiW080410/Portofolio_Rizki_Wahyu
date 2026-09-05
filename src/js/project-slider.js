import Swiper from 'swiper'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/a11y'

const galleries = new Map()
export function initProjectSliders(root = document) {
  const owned = []
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  root.querySelectorAll('[data-project-gallery]').forEach(element => {
    if (galleries.has(element)) return
    const controls = element.querySelector('.project-media__controls')
    let instance
    try {
      element.classList.add('swiper')
      instance = new Swiper(element, {
        modules: [Navigation, Pagination, A11y],
        slidesPerView: 1, spaceBetween: 16, loop: false,
        speed: reduce.matches ? 0 : 350,
        touchAngle: 35, touchStartPreventDefault: false,
        navigation: {
          prevEl: element.querySelector('.project-media__prev'),
          nextEl: element.querySelector('.project-media__next')
        },
        pagination: {
          el: element.querySelector('.project-media__pagination'), type: 'fraction',
          formatFractionCurrent: value => String(value).padStart(2, '0'),
          formatFractionTotal: value => String(value).padStart(2, '0')
        },
        a11y: { enabled: true, prevSlideMessage: 'Previous project image', nextSlideMessage: 'Next project image' }
      })
      // Deliberately scoped: Swiper's global keyboard module is not enabled.
      const keyboard = event => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
            event.target.matches('input, textarea, select, [contenteditable]')) return
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
        event.preventDefault()
        if (event.key === 'ArrowLeft') instance.slidePrev()
        else instance.slideNext()
      }
      const motionChange = () => {
        instance.params.speed = reduce.matches ? 0 : 350
        if (reduce.matches) instance.slideTo(instance.activeIndex, 0)
      }
      element.addEventListener('keydown', keyboard)
      reduce.addEventListener('change', motionChange)
      controls.hidden = false
      galleries.set(element, () => {
        element.removeEventListener('keydown', keyboard)
        reduce.removeEventListener('change', motionChange)
        instance.destroy(true, true)
        element.classList.remove('swiper')
        controls.hidden = true
        galleries.delete(element)
      })
      owned.push(element)
    } catch (error) {
      instance?.destroy(true, true)
      element.swiper?.destroy(true, true)
      element.classList.remove('swiper')
      controls.hidden = true
      console.warn('Gallery enhancement unavailable; images remain accessible.', error)
    }
  })
  return () => owned.forEach(element => galleries.get(element)?.())
}

if (import.meta.hot) import.meta.hot.dispose(() => {
  for (const cleanup of [...galleries.values()]) cleanup()
})

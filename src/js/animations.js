import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll } from './smooth-scroll.js'

let dispose
export function initAnimations() {
  if (dispose) return dispose
  gsap.registerPlugin(ScrollTrigger)
  const media = gsap.matchMedia()
  let refreshFrame
  const refresh = () => {
    cancelAnimationFrame(refreshFrame)
    refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())
  }
  const cleanup = () => {
    media.revert()
    cancelAnimationFrame(refreshFrame)
    window.removeEventListener('load', refresh)
    dispose = undefined
  }
  dispose = cleanup

  try {
    media.add({
      reduce: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 1024px)',
      compact: '(max-width: 1023px)'
    }, context => {
      if (context.conditions.reduce) return
      const desktop = context.conditions.desktop
      const distance = desktop ? 26 : 12
      const timelines = new Set()
      const triggers = []
      let stopScrolling = () => {}
      const scope = gsap.context(() => {})
      const stop = () => {
        stopScrolling()
        timelines.forEach(animation => animation.kill())
        triggers.forEach(trigger => trigger.kill())
        scope.revert()
        document.removeEventListener('focusin', revealFocus)
      }
      const revealFocus = event => {
        // Finish running entrances before keyboard focus could be obscured.
        timelines.forEach(animation => animation.progress(1))
      }
      const run = (targets, options = {}) => {
        const nodes = gsap.utils.toArray(targets)
        if (!nodes.length || nodes.some(node => node.contains(document.activeElement))) return
        scope.add(() => {
          const animation = gsap.from(nodes, {
            opacity: 0, y: distance, duration: 0.7, ease: 'power2.out',
            stagger: desktop ? 0.08 : 0, clearProps: 'opacity,transform',
            ...options
          })
          timelines.add(animation)
        })
      }
      const reveal = (targets, options = {}) => {
        const nodes = gsap.utils.toArray(targets)
        if (!nodes.length) return
        // No hidden CSS or pre-scroll hidden state: reveal only when entering.
        triggers.push(ScrollTrigger.create({
          trigger: nodes[0], start: 'top 88%', once: true,
          onEnter: () => {
            try { run(nodes, options) }
            catch (error) { stop(); console.warn('Reveal disabled; static content restored.', error) }
          }
        }))
      }

      try {
        document.addEventListener('focusin', revealFocus)
        try { stopScrolling = initSmoothScroll(gsap, ScrollTrigger) }
        catch (error) { console.warn('Smooth scrolling unavailable; using native scrolling.', error) }

        run(['.site-nav', '.hero__masthead', '.hero__descriptor', '.hero__portrait',
          '.hero__identity > .section-label', '.hero__identity h1',
          '.hero__identity > .body-large', '.hero__identity > .text-muted',
          '.hero__actions'], { duration: 0.8, stagger: desktop ? 0.1 : 0.055 })

        document.querySelectorAll('.section-title').forEach(title => reveal(title, { y: desktop ? 38 : 16 }))
        reveal('.service-list > li')
        document.querySelectorAll('.project-card').forEach((card, index) => {
          reveal(index === 0 ? card.children : card, { stagger: desktop ? 0.075 : 0 })
        })
        document.querySelectorAll('.experience-item').forEach(row => reveal(row))
        reveal('.achievement-block > *', { stagger: desktop ? 0.1 : 0 })
        reveal('#about .container > p', { y: 12, stagger: 0 })
        reveal('.education')
        reveal('.skills-list > li', { stagger: desktop ? 0.035 : 0 })
        reveal('.certificate-placeholder')
        reveal('#contact .container > p, #contact .contact-link', { stagger: 0.05 })

        if (desktop) scope.add(() => {
          // Different targets from the entrance animation avoid transform conflicts.
          gsap.to('.hero-stage', { y: -12, ease: 'none',
            scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.6 } })
          gsap.to('.hero__portrait img', { yPercent: -3, ease: 'none',
            scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.7 } })
          gsap.to('.hero__portrait', { '--ellipse-shift': '10px', ease: 'none',
            scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.8 } })
        })
        refresh()
      } catch (error) {
        stop()
        console.warn('Motion unavailable; static content restored.', error)
      }
      return stop
    })
    window.addEventListener('load', refresh, { once: true })
  } catch (error) {
    cleanup()
    throw error
  }
  return cleanup
}


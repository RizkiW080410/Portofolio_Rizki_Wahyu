import Lenis from 'lenis'

export function initSmoothScroll(gsap, ScrollTrigger) {
  const lenis = new Lenis({ autoRaf: false, smoothWheel: true, syncTouch: false, duration: 0.85 })
  const tick = time => lenis.raf(time * 1000)
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  // Keep browser anchor activation, URL history, and keyboard focus native.
  // Smooth only pointer-activated navigation links; skip link and other links stay native.
  const navigate = event => {
    const link = event.target.closest('.nav-links a[href^="#"], .hero__actions a[href="#projects"]')
    if (!link || event.defaultPrevented || event.button !== 0 || event.detail === 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(link.hash.slice(1))
    if (!target) return
    event.preventDefault()
    history.pushState(null, '', link.hash)
    const hadTabindex = target.hasAttribute('tabindex')
    if (!hadTabindex) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    if (!hadTabindex) target.removeAttribute('tabindex')
    const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-offset')) || 24
    lenis.scrollTo(target, { offset: -headerOffset })
  }
  document.addEventListener('click', navigate)
  return () => {
    document.removeEventListener('click', navigate)
    gsap.ticker.remove(tick)
    lenis.off('scroll', ScrollTrigger.update)
    lenis.destroy()
  }
}


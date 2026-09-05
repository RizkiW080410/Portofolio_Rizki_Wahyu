let dispose

export function initNavigation() {
  if (dispose) return dispose
  const header = document.querySelector('.site-header')
  const button = document.querySelector('.nav-toggle')
  const menu = document.querySelector('#site-navigation')
  if (!header || !button || !menu) return () => {}
  const links = [...menu.querySelectorAll('a[href^="#"]')]
  const sections = links.map(link => document.getElementById(link.hash.slice(1)))
  const mobile = window.matchMedia('(max-width: 767px)')
  const listeners = new AbortController()
  let observer
  let topObserver
  let sizeObserver
  let open = false

  const setOpen = (value, restoreFocus = false) => {
    open = mobile.matches && value
    button.setAttribute('aria-expanded', String(open))
    header.classList.toggle('menu-open', open)
    menu.hidden = mobile.matches && !open
    if (restoreFocus && mobile.matches) button.focus()
  }
  const resize = () => {
    const focusedMenu = menu.contains(document.activeElement)
    button.hidden = !mobile.matches
    setOpen(false, focusedMenu)
    if (!mobile.matches && document.activeElement === button) links[0]?.focus()
  }
  const activate = id => links.forEach(link => {
    const active = link.hash === '#' + id
    link.classList.toggle('is-active', active)
    if (active) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  })
  const hash = () => {
    const matching = links.find(link => link.hash === location.hash)
    if (matching) activate(matching.hash.slice(1))
  }
  const select = event => {
    const link = event.target.closest('a[href^="#"]')
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(link.hash.slice(1))
    setOpen(false)
    activate(link.hash.slice(1))
    // Transfer focus out of a closing menu; native anchors/Lenis still own scrolling.
    if (target) {
      const previous = target.getAttribute('tabindex')
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      if (previous === null) target.removeAttribute('tabindex')
      else target.setAttribute('tabindex', previous)
    }
  }
  const sentinel = document.createElement('span')
  sentinel.className = 'header-sentinel'
  sentinel.setAttribute('aria-hidden', 'true')
  const measure = () => document.documentElement.style.setProperty('--header-offset', (header.getBoundingClientRect().height + 16) + 'px')

  dispose = () => {
    listeners.abort()
    mobile.removeEventListener('change', resize)
    observer?.disconnect()
    topObserver?.disconnect()
    sizeObserver?.disconnect()
    sentinel.remove()
    menu.hidden = false
    button.hidden = true
    button.setAttribute('aria-expanded', 'false')
    header.classList.remove('nav-enhanced', 'menu-open', 'is-scrolled')
    links.forEach(link => { link.classList.remove('is-active'); link.removeAttribute('aria-current') })
    document.documentElement.style.removeProperty('--header-offset')
    dispose = undefined
  }
  try {
    header.classList.add('nav-enhanced')
    document.body.prepend(sentinel)
    button.addEventListener('click', () => setOpen(!open), { signal: listeners.signal })
    menu.addEventListener('click', select, { signal: listeners.signal })
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false, true) }
    }, { signal: listeners.signal })
    document.addEventListener('focusin', event => {
      if (open && !header.contains(event.target)) setOpen(false)
    }, { signal: listeners.signal })
    document.addEventListener('click', event => {
      if (open && !header.contains(event.target)) setOpen(false)
    }, { signal: listeners.signal })
    window.addEventListener('hashchange', hash, { signal: listeners.signal })
    window.addEventListener('popstate', hash, { signal: listeners.signal })
    mobile.addEventListener('change', resize)
    resize()
    activate('home')
    hash()
    measure()
    if ('ResizeObserver' in window) {
      sizeObserver = new ResizeObserver(measure)
      sizeObserver.observe(header)
    }
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(() => {
        const passed = sections.filter(section => section && section.getBoundingClientRect().top <= window.innerHeight * .3)
        activate((passed.at(-1) || sections[0]).id)
      }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 })
      sections.filter(Boolean).forEach(section => observer.observe(section))
      topObserver = new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting))
      topObserver.observe(sentinel)
    }
  } catch (error) {
    dispose()
    console.warn('Navigation enhancement unavailable; native links restored.', error)
    return () => {}
  }
  return dispose
}

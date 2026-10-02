(() => {
  "use strict";
  const storageKey = "homepage-language";
  document.documentElement.classList.add("js");
  const translations = [...document.querySelectorAll("[data-en]")].map(node => ({node, zh: node.textContent, en: node.dataset.en}));
  const attributes = [
    ["data-alt-en", "alt"],
    ["data-label-en", "aria-label"],
    ["data-content-en", "content"]
  ].flatMap(([dataAttribute, attribute]) => [...document.querySelectorAll(`[${dataAttribute}]`)].map(node => ({node, attribute, zh: node.getAttribute(attribute), en: node.getAttribute(dataAttribute)})));
  const languageButtons = [...document.querySelectorAll("[data-lang]")];
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  function closeMenu() {
    header?.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
  function setLanguage(language) {
    if (!['zh', 'en'].includes(language)) language = 'zh';
    translations.forEach(({node, zh, en}) => { node.textContent = language === "en" ? en : zh; });
    attributes.forEach(({node, attribute, zh, en}) => { node.setAttribute(attribute, language === "en" ? en : zh); });
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    document.getElementById("og-locale")?.setAttribute("content", language === "en" ? "en_US" : "zh_CN");
    languageButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
    try { localStorage.setItem(storageKey, language); } catch { /* Content remains usable when browser storage is unavailable. */ }
    closeMenu();
  }
  languageButtons.forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
  menuButton?.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll(".site-nav a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", event => { if (header && !header.contains(event.target)) closeMenu(); });
  let storedLanguage = "zh";
  try { storedLanguage = localStorage.getItem(storageKey) || "zh"; } catch { /* The static Chinese page is the default. */ }
  setLanguage(storedLanguage);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const activeAnimations = new Set();
  const revealed = new WeakSet();
  const revealTargets = [...document.querySelectorAll(
    ".hero .eyebrow, .hero h1, .hero .identity-line, .hero .research-statement, .hero .profile-text, .hero .profile-links, .hero .portrait-slot, .section-heading, .research-card, .updates-list li, .project-card, .background-block, .contact-section, .topic-hero > *, .topic-layout > *, .topic-block, .topic-findings"
  )];
  let revealObserver;

  function startReveals() {
    if (reducedMotion.matches || !window.IntersectionObserver || !Element.prototype.animate) return;
    revealObserver = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting);
      entering.forEach((entry, index) => {
        const node = entry.target;
        revealObserver.unobserve(node);
        revealed.add(node);
        if (reducedMotion.matches || document.hidden || node.contains(document.activeElement)) return;
        const animation = node.animate([
          {opacity: 0, transform: "translateY(18px)"},
          {opacity: 1, transform: "translateY(0)"}
        ], {
          duration: 650,
          delay: Math.min(index * 65, 260),
          easing: "cubic-bezier(.22, 1, .36, 1)",
          fill: "backwards"
        });
        activeAnimations.add(animation);
        animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
      });
    }, {threshold: .12, rootMargin: "0px 0px -24px 0px"});
    revealTargets.filter(node => !revealed.has(node)).forEach(node => revealObserver.observe(node));
  }

  // Keep keyboard navigation immediate, including during an entrance animation.
  document.addEventListener("focusin", event => {
    activeAnimations.forEach(animation => {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    });
  });
  reducedMotion.addEventListener("change", () => {
    revealObserver?.disconnect();
    activeAnimations.forEach(animation => animation.cancel());
    if (!reducedMotion.matches) startReveals();
  });
  document.addEventListener("visibilitychange", () => {
    document.documentElement.classList.toggle("motion-paused", document.hidden);
    if (document.hidden) activeAnimations.forEach(animation => animation.cancel());
  });
  document.documentElement.classList.toggle("motion-paused", document.hidden);
  startReveals();

  document.querySelectorAll(".research-card, .project-card").forEach(card => {
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    card.addEventListener("pointermove", event => {
      if (!finePointer.matches || reducedMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${pointerX - bounds.left}px`);
        card.style.setProperty("--spot-y", `${pointerY - bounds.top}px`);
      });
    }, {passive: true});
    card.addEventListener("pointerleave", () => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      card.style.removeProperty("--spot-x");
      card.style.removeProperty("--spot-y");
    });
  });

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.append(progress);
  const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')]
    .map(link => ({link, section: document.getElementById(link.hash.slice(1))}))
    .filter(({section}) => section);
  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const position = Math.max(0, Math.min(1, window.scrollY / Math.max(1, scrollable)));
    progress.style.transform = `scaleX(${position})`;
    header?.classList.toggle("is-scrolled", window.scrollY > 16);
    let currentSection = null;
    const readingLine = (header?.getBoundingClientRect().bottom || 72) + 70;
    sectionLinks.forEach(({section}) => {
      if (section.getBoundingClientRect().top <= readingLine) currentSection = section;
    });
    if (position > .995 && window.scrollY > 0) currentSection = sectionLinks.at(-1)?.section;
    sectionLinks.forEach(({link, section}) => {
      if (section === currentSection) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }
  window.addEventListener("scroll", scheduleScroll, {passive: true});
  window.addEventListener("resize", scheduleScroll, {passive: true});
  window.addEventListener("pageshow", scheduleScroll);
  languageButtons.forEach(button => button.addEventListener("click", scheduleScroll));
  menuButton?.addEventListener("click", scheduleScroll);
  document.querySelectorAll("details").forEach(details => details.addEventListener("toggle", scheduleScroll));
  if (window.ResizeObserver) new ResizeObserver(scheduleScroll).observe(document.body);
  scheduleScroll();
})();

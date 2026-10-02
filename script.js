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
})();

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = new URLSearchParams(window.location.search);
  const showAll = params.has("showall");
  const scrollTarget = params.get("scroll");
  const animatedItems = document.querySelectorAll("[data-animate]");
  const navLinks = Array.from(document.querySelectorAll(".dual-site-header .site-nav a[href^='#']"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (showAll) {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
  } else if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    animatedItems.forEach((item) => revealObserver.observe(item));
  } else {
    animatedItems.forEach((item) => item.classList.add("is-visible"));
  }

  const setActiveNav = () => {
    const offset = window.innerHeight * 0.34;
    let activeId = sections[0] ? sections[0].id : "";

    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  let navTicking = false;
  const requestActiveNav = () => {
    if (navTicking) {
      return;
    }

    navTicking = true;
    window.requestAnimationFrame(() => {
      setActiveNav();
      navTicking = false;
    });
  };

  setActiveNav();
  window.addEventListener("scroll", requestActiveNav, { passive: true });

  if (scrollTarget) {
    window.setTimeout(() => {
      document.getElementById(scrollTarget)?.scrollIntoView({ block: "start" });
      setActiveNav();
    }, 250);
  }

  const centerMobileLinkDiagrams = () => {
    if (window.innerWidth > 680) {
      return;
    }

    document.querySelectorAll(".dual-state-svg-scroll").forEach((item) => {
      if (item.scrollWidth > item.clientWidth) {
        item.scrollLeft = (item.scrollWidth - item.clientWidth) / 2;
      }
    });
  };

  window.setTimeout(centerMobileLinkDiagrams, 300);
  window.addEventListener("resize", centerMobileLinkDiagrams);

  const overviewBoard = document.querySelector(".dual-overview-board");
  if (overviewBoard) {
    const overviewCards = Array.from(overviewBoard.querySelectorAll(".dual-overview-card"));
    const overviewSteps = Array.from(overviewBoard.querySelectorAll(".dual-overview-flow span"));
    const overviewNodes = Array.from(overviewBoard.querySelectorAll(".dual-overview-lightline span"));

    overviewCards.forEach((card, index) => {
      const step = overviewSteps[index];
      const node = overviewNodes[index];

      if (!step && !node) {
        return;
      }

      const setLinked = (enabled) => {
        step?.classList.toggle("is-linked", enabled);
        node?.classList.toggle("is-linked", enabled);
      };

      card.addEventListener("pointerenter", () => setLinked(true));
      card.addEventListener("pointerleave", () => setLinked(false));
      card.addEventListener("focusin", () => setLinked(true));
      card.addEventListener("focusout", () => setLinked(false));
    });
  }

  if (!reduceMotion) {
    let pointerTicking = false;
    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener(
      "pointermove",
      (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;

        if (pointerTicking) {
          return;
        }

        pointerTicking = true;
        window.requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--dual-pointer-x", `${pointerX}px`);
          document.documentElement.style.setProperty("--dual-pointer-y", `${pointerY}px`);
          pointerTicking = false;
        });
      },
      { passive: true }
    );
  }
})();

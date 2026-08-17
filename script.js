/* Aritra Saha — portfolio interactions (vanilla ES6+) */
(() => {
  "use strict";

  /* --- Mobile nav toggle (collapses at ≤ 833px, per DESIGN.md) --- */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = Array.from(navMenu.querySelectorAll("a"));

  const setMenuOpen = (open) => {
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  navToggle.addEventListener("click", () => {
    setMenuOpen(!navMenu.classList.contains("open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 833) {
      setMenuOpen(false);
    }
  });

  /* --- Active section highlighting in the nav --- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* --- Footer year --- */
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();

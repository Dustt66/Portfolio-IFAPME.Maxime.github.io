"use strict";

// Année automatique dans le footer
document.querySelectorAll(".js-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Menu burger (mobile)
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Fermer le menu avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.focus();
    }
  });
}

// Protection de l'e-mail contre les robots
document.querySelectorAll(".js-mail").forEach((link) => {
  const address = `${link.dataset.user}@${link.dataset.domain}`;
  link.href = `mailto:${address}`;
  const label = link.querySelector(".mail-text");
  // Sur la page CV, on affiche l'adresse. Sur Contact, on garde le texte du bouton.
  if (label && link.closest(".cv-info")) label.textContent = address;
});

// Apparition des cartes au scroll
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll(".card, .skill-card, .project-card, .cv-block")
    .forEach((el) => {
      el.classList.add("reveal"); // ajouté par JS : sans JS, tout reste visible
      observer.observe(el);
    });
}
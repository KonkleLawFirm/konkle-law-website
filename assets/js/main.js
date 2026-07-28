"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const headerInner = document.querySelector(".header-inner");
  const navigation = document.querySelector(".main-navigation");
  const currentYear = document.querySelector("[data-current-year]");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
      passive: true
    });
  }

  if (!headerInner || !navigation) {
    return;
  }

  navigation.id = "main-navigation";

  const menuButton = document.createElement("button");

  menuButton.className = "menu-toggle";
  menuButton.type = "button";
  menuButton.textContent = "Menu";
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "main-navigation");
  menuButton.setAttribute("aria-label", "Open navigation menu");

  headerInner.insertBefore(menuButton, navigation);

  const closeMenu = () => {
    navigation.classList.remove("is-open");
    body.classList.remove("menu-open");

    menuButton.textContent = "Menu";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  };

  const openMenu = () => {
    navigation.classList.add("is-open");
    body.classList.add("menu-open");

    menuButton.textContent = "Close";
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) {
      closeMenu();
    }
  });
});

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const navigation = header?.querySelector("nav");

  if (!header || !navigation) {
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

  header.insertBefore(menuButton, navigation);

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    menuButton.textContent = isOpen ? "Close" : "Menu";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "Menu";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "Menu";
    }
  });
});

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const headerInner = document.querySelector(".header-inner");
  const navigation = document.querySelector(".main-navigation");
  const yearElements = document.querySelectorAll("[data-current-year]");

  const siteUrl = "https://www.konklelawfirm.com";
  const socialImage =
    `${siteUrl}/assets/images/konkle-law-social-card.jpg`;

  const normalizePath = (pathname) => {
    if (!pathname || pathname === "/" || pathname === "/index.html") {
      return "/";
    }

    return pathname.startsWith("/") ? pathname : `/${pathname}`;
  };

  const currentPath = normalizePath(window.location.pathname);

  // Google Analytics 4: traffic and non-sensitive lead actions only.
  const measurementId = "G-P3SLMXCVTH";

  const loadAnalytics = () => {
    if (document.querySelector(`script[src*="${measurementId}"]`)) {
      return;
    }

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src =
      `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(analyticsScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: `${window.location.origin}${window.location.pathname}`,
      page_title: document.title
    });
  };

  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", eventName, parameters);
  };

  const addAnalyticsEvents = () => {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_location: currentPath });
      } else if (href.startsWith("sms:")) {
        trackEvent("text_click", { link_location: currentPath });
      } else if (href.includes("contact.html#intake-form")) {
        trackEvent("intake_cta_click", { link_location: currentPath });
      }
    });

    if (currentPath === "/thank-you.html") {
      const storageKey = "konkle-generate-lead-recorded";

      if (!sessionStorage.getItem(storageKey)) {
        trackEvent("generate_lead", {
          currency: "USD",
          value: 0,
          lead_source: "website_intake"
        });
        sessionStorage.setItem(storageKey, "true");
      }
    }
  };

  loadAnalytics();
  addAnalyticsEvents();

  const addMobileMenuStyles = () => {
    if (document.getElementById("konkle-mobile-menu-styles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "konkle-mobile-menu-styles";
    style.textContent = `
      .mobile-menu-actions {
        display: none;
      }

      .mobile-firm-name {
        display: none;
      }

      @media (max-width: 940px) {
        .mobile-firm-name {
          display: inline-flex;
          align-items: center;
          margin-right: auto;
          margin-left: 0.55rem;
          color: var(--black);
          font-family: var(--serif);
          font-size: clamp(0.82rem, 3.3vw, 1rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1;
          white-space: nowrap;
          text-transform: uppercase;
        }

        .site-header:not(.is-scrolled) .mobile-firm-name,
        .site-header.is-scrolled .mobile-firm-name {
          color: var(--black);
        }

        .header-inner {
          gap: 0;
        }

        .main-navigation {
          top: 78px;
          bottom: auto;
          width: 100%;
          height: calc(100vh - 78px);
          height: calc(100dvh - 78px);
          max-height: calc(100vh - 78px);
          max-height: calc(100dvh - 78px);
          padding: 0.75rem 1rem calc(1rem + env(safe-area-inset-bottom));
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.16);
        }

        .main-navigation > a {
          flex: 0 0 auto;
          padding: clamp(0.72rem, 2vh, 1rem) 0.25rem;
          font-size: clamp(1.22rem, 5vw, 1.65rem);
          line-height: 1.08;
        }

        .mobile-menu-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          flex: 0 0 auto;
          width: 100%;
          gap: 0.65rem;
          margin-top: 0.85rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-light);
        }

        .main-navigation .mobile-menu-actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 46px;
          padding: 0.7rem 0.6rem;
          border: 1px solid var(--black);
          background: transparent;
          color: var(--black);
          font-family: var(--sans);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.075em;
          line-height: 1.2;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
        }

        .main-navigation .mobile-menu-actions a::after {
          display: none;
        }

        .main-navigation .mobile-menu-actions .mobile-intake-link {
          grid-column: 1 / -1;
          border-color: var(--black);
          background: var(--black);
          color: var(--white);
        }

        .main-navigation .mobile-menu-actions a:active {
          transform: translateY(1px);
        }
      }

      @media (max-width: 390px) {
        .mobile-firm-name {
          margin-left: 0.4rem;
          font-size: 0.72rem;
          letter-spacing: 0.055em;
        }
      }

      @media (max-width: 940px) and (max-height: 700px) {
        .main-navigation {
          padding-top: 0.4rem;
        }

        .main-navigation > a {
          padding: 0.58rem 0.2rem;
          font-size: clamp(1.05rem, 4.4vw, 1.3rem);
        }

        .mobile-menu-actions {
          gap: 0.5rem;
          margin-top: 0.55rem;
          padding-top: 0.55rem;
        }

        .main-navigation .mobile-menu-actions a {
          min-height: 40px;
          padding: 0.5rem;
          font-size: 0.62rem;
        }
      }

      @media (max-width: 940px) and (max-height: 540px) {
        .main-navigation {
          padding-top: 0.2rem;
        }

        .main-navigation > a {
          padding: 0.4rem 0.2rem;
          font-size: 1rem;
        }

        .mobile-menu-actions {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.4rem;
          margin-top: 0.4rem;
          padding-top: 0.4rem;
        }

        .main-navigation .mobile-menu-actions .mobile-intake-link {
          grid-column: auto;
        }

        .main-navigation .mobile-menu-actions a {
          min-height: 38px;
          padding: 0.4rem 0.25rem;
          font-size: 0.56rem;
        }
      }
    `;

    document.head.appendChild(style);
  };

  const addResourcesLinks = () => {
    if (navigation && !navigation.querySelector('a[href="resources.html"]')) {
      const resourcesLink = document.createElement("a");
      resourcesLink.href = "resources.html";
      resourcesLink.textContent = "Resources";

      const contactLink = navigation.querySelector(
        'a[href="contact.html"]'
      );

      if (contactLink) {
        navigation.insertBefore(resourcesLink, contactLink);
      } else {
        navigation.appendChild(resourcesLink);
      }
    }

    if (
      navigation &&
      (
        currentPath === "/resources.html" ||
        currentPath.includes("what-to-do-after")
      )
    ) {
      const resourcesLink = navigation.querySelector(
        'a[href="resources.html"]'
      );

      if (resourcesLink) {
        navigation
          .querySelectorAll('[aria-current="page"]')
          .forEach((link) => link.removeAttribute("aria-current"));

        resourcesLink.setAttribute("aria-current", "page");
      }
    }

    document.querySelectorAll(".footer-column").forEach((column) => {
      const heading = column.querySelector("h2");

      if (
        heading &&
        heading.textContent.trim() === "Firm" &&
        !column.querySelector('a[href="resources.html"]')
      ) {
        const resourcesLink = document.createElement("a");
        resourcesLink.href = "resources.html";
        resourcesLink.textContent = "Legal Resources";

        const contactLink = column.querySelector('a[href="contact.html"]');

        if (contactLink) {
          column.insertBefore(resourcesLink, contactLink);
        } else {
          column.appendChild(resourcesLink);
        }
      }
    });
  };

  yearElements.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  addMobileMenuStyles();
  addResourcesLinks();

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

  const existingButton = headerInner.querySelector(".menu-toggle");

  if (existingButton) {
    existingButton.remove();
  }

  let mobileFirmName = headerInner.querySelector(".mobile-firm-name");

  if (!mobileFirmName) {
    mobileFirmName = document.createElement("span");
    mobileFirmName.className = "mobile-firm-name";
    mobileFirmName.textContent = "Konkle Law Firm";
    mobileFirmName.setAttribute("aria-hidden", "true");

    const brandLink = headerInner.querySelector(
      '.site-brand, .brand, .logo, a[href="index.html"], a[href="/"]'
    );

    if (brandLink && brandLink.nextSibling) {
      headerInner.insertBefore(mobileFirmName, brandLink.nextSibling);
    } else if (brandLink) {
      headerInner.appendChild(mobileFirmName);
    } else {
      headerInner.insertBefore(mobileFirmName, navigation);
    }
  }

  const menuButton = document.createElement("button");
  menuButton.className = "menu-toggle";
  menuButton.type = "button";
  menuButton.textContent = "Menu";
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "main-navigation");
  menuButton.setAttribute("aria-label", "Open navigation menu");

  headerInner.insertBefore(menuButton, navigation);


  let mobileMenuActions = navigation.querySelector(
    ".mobile-menu-actions"
  );

  if (!mobileMenuActions) {
    mobileMenuActions = document.createElement("div");
    mobileMenuActions.className = "mobile-menu-actions";
    mobileMenuActions.setAttribute("aria-label", "Quick contact options");

    const callLink = document.createElement("a");
    callLink.href = "tel:+12392693587";
    callLink.textContent = "Call the Firm";

    const textLink = document.createElement("a");
    textLink.href = "sms:+12392693587";
    textLink.textContent = "Text the Firm";

    const intakeLink = document.createElement("a");
    intakeLink.className = "mobile-intake-link";
    intakeLink.href = "contact.html#intake-form";
    intakeLink.textContent = "Start Your Intake";

    mobileMenuActions.append(callLink, textLink, intakeLink);
    navigation.appendChild(mobileMenuActions);
  }

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
    navigation.scrollTop = 0;
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

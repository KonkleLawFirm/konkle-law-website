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

  const pageMetadata = {
    "/": {
      title:
        "Naples Criminal Defense & Personal Injury Attorney | Konkle Law Firm",
      description:
        "Konkle Law Firm provides personal criminal-defense and personal-injury representation in Naples, Collier County, Southwest Florida, and throughout Florida."
    },
    "/attorney.html": {
      title: "Keith A. Konkle | Naples Attorney | Konkle Law Firm",
      description:
        "Learn about Keith A. Konkle, a Naples attorney providing personal criminal-defense and personal-injury representation throughout Florida."
    },
    "/criminal-defense.html": {
      title:
        "Naples Criminal Defense Attorney | Konkle Law Firm",
      description:
        "Konkle Law Firm provides criminal-defense representation in Naples, Collier County, Southwest Florida, and throughout Florida."
    },
    "/personal-injury.html": {
      title:
        "Naples Personal Injury Attorney | Konkle Law Firm",
      description:
        "Konkle Law Firm evaluates personal-injury claims in Naples, Collier County, Southwest Florida, and throughout Florida."
    },
    "/contact.html": {
      title: "Contact and Intake | Konkle Law Firm",
      description:
        "Contact Konkle Law Firm in Naples for a free criminal-defense or personal-injury consultation by phone, video, or in person."
    },
    "/payments.html": {
      title: "Client Payments | Konkle Law Firm",
      description:
        "Existing clients may contact Konkle Law Firm for current invoice and payment instructions."
    },
    "/privacy.html": {
      title: "Privacy Policy | Konkle Law Firm",
      description:
        "Read the website privacy policy for Konkle Law Firm."
    },
    "/disclaimer.html": {
      title: "Legal Disclaimer | Konkle Law Firm",
      description:
        "Read important legal and advertising information for the Konkle Law Firm website."
    },
    "/resources.html": {
      title: "Florida Legal Resources | Konkle Law Firm",
      description:
        "Read practical Florida legal guides about DUI arrests, car accidents, criminal court, and personal-injury claims."
    },
    "/naples-dui-attorney.html": {
      title: "Naples DUI Attorney | Konkle Law Firm",
      description:
        "Facing a DUI arrest in Naples or Collier County? Konkle Law Firm provides personal Florida DUI defense and free consultations."
    },
    "/naples-car-accident-attorney.html": {
      title: "Naples Car Accident Attorney | Konkle Law Firm",
      description:
        "Injured in a Naples car accident? Konkle Law Firm evaluates Florida auto-injury claims and offers free consultations."
    },
    "/what-to-do-after-a-dui-arrest-in-naples.html": {
      title:
        "What to Do After a DUI Arrest in Naples | Konkle Law Firm",
      description:
        "A practical guide to Florida license deadlines, court dates, evidence, and communication after a DUI arrest in Naples."
    },
    "/what-to-do-after-a-car-accident-in-florida.html": {
      title:
        "What to Do After a Car Accident in Florida | Konkle Law Firm",
      description:
        "A practical Florida car-accident guide covering safety, crash reporting, medical care, evidence, insurance, and deadlines."
    }
  };

  const upsertMeta = (selector, attributes) => {
    let element = document.head.querySelector(selector);

    if (!element) {
      element = document.createElement("meta");
      document.head.appendChild(element);
    }

    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });

    return element;
  };

  const addOrUpdateSeo = () => {
    const metadata = pageMetadata[currentPath];

    document
      .querySelectorAll('meta[name="keywords"]')
      .forEach((element) => element.remove());

    if (!metadata) {
      return;
    }

    document.title = metadata.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: metadata.description
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `${siteUrl}${currentPath}`;

    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "Konkle Law Firm"
    });

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: currentPath.includes("what-to-do")
        ? "article"
        : "website"
    });

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: metadata.title
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: metadata.description
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: `${siteUrl}${currentPath}`
    });

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: socialImage
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image"
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: metadata.title
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: metadata.description
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: socialImage
    });
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

  const addLegalServiceSchema = () => {
    if (document.getElementById("konkle-legal-service-schema")) {
      return;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "@id": `${siteUrl}/#legalservice`,
      "name": "Konkle Law Firm",
      "legalName": "KONKLE LAW FIRM, PLLC",
      "url": siteUrl,
      "logo": `${siteUrl}/assets/images/law-firm-logo.webp`,
      "image": [
        socialImage,
        `${siteUrl}/assets/images/keith-konkle-attorney.webp`
      ],
      "telephone": "+12392693587",
      "email": "Keith@konklelawfirm.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3080 Tamiami Trail E., Suite 301",
        "addressLocality": "Naples",
        "addressRegion": "FL",
        "postalCode": "34112",
        "addressCountry": "US"
      },
      "areaServed": [
        {"@type": "City", "name": "Naples"},
        {"@type": "AdministrativeArea", "name": "Collier County"},
        {"@type": "AdministrativeArea", "name": "Lee County"},
        {"@type": "AdministrativeArea", "name": "Southwest Florida"},
        {"@type": "State", "name": "Florida"}
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+12392693587",
        "contactType": "customer service",
        "areaServed": "US-FL",
        "availableLanguage": "English"
      }
    };

    const script = document.createElement("script");
    script.id = "konkle-legal-service-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  };

  yearElements.forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  addOrUpdateSeo();
  addResourcesLinks();
  addLegalServiceSchema();

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

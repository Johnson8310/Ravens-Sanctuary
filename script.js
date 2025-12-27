// Raven’s 🐦‍⬛ Sanctuary — minimal JS: nav, theme, portfolio filters, modals, mailto form

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // close menu when clicking a link (mobile)
    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Theme toggle (persists)
  const themeBtn = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "light" ? "" : "light";
      if (next) document.documentElement.setAttribute("data-theme", next);
      else document.documentElement.removeAttribute("data-theme");

      localStorage.setItem("theme", next || "dark");
      themeBtn.setAttribute("aria-pressed", String(Boolean(next)));
    });
  }

  // Portfolio filters
  const chips = document.querySelectorAll(".chip");
  const works = document.querySelectorAll(".work");

  function setActiveChip(btn) {
    chips.forEach((c) => c.classList.remove("is-active"));
    btn.classList.add("is-active");
  }

  function applyFilter(tag) {
    works.forEach((w) => {
      const tags = (w.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
      const show = tag === "all" || tags.includes(tag);
      w.style.display = show ? "" : "none";
    });
  }

  chips.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.getAttribute("data-filter") || "all";
      setActiveChip(btn);
      applyFilter(tag);
    });
  });

  // Modals (dialog)
  document.querySelectorAll("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal");
      const dialog = document.getElementById(id);
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  document.querySelectorAll("dialog [data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  // Close dialogs when clicking outside content
  document.querySelectorAll("dialog").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      const rect = dlg.getBoundingClientRect();
      const inDialog =
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
      if (!inDialog) dlg.close();
    });
  });

  // Contact form: mailto
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);

      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subject = encodeURIComponent("Raven’s Sanctuary — Contact");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      // Replace with your real contact email:
      const to = "your-email@example.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();

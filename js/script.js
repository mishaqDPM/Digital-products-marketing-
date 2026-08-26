// Digital Products Marketing - V2
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("theme-toggle");
  const loader = document.getElementById("loader");

  // Loader
  window.addEventListener("load", () => {
    if (loader) {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => loader.remove(), 300);
    }
  });

  // Mobile menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const active = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", active ? "true" : "false");
      menuToggle.textContent = active ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Smooth scroll for local anchors only
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Header shadow
  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Reveal animations
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("show"));
  }

  // Theme toggle
  if (themeToggle) {
    const savedTheme = localStorage.getItem("dpm-theme");
    if (savedTheme === "light") body.classList.add("light-mode");

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      localStorage.setItem("dpm-theme", body.classList.contains("light-mode") ? "light" : "dark");
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-box button").forEach(button => {
    button.addEventListener("click", () => {
      const box = button.closest(".faq-box");
      document.querySelectorAll(".faq-box.open").forEach(item => {
        if (item !== box) item.classList.remove("open");
      });
      box.classList.toggle("open");
    });
  });

  // Lead forms -> existing Cloudflare endpoint
  document.querySelectorAll(".leadForm").forEach(form => {
    form.addEventListener("submit", async e => {
      e.preventDefault();

      const status = form.querySelector(".form-status");
      const submit = form.querySelector('button[type="submit"]');
      const data = Object.fromEntries(new FormData(form).entries());

      if (status) {
        status.textContent = "Submitting your request…";
        status.className = "form-status";
      }
      if (submit) {
        submit.disabled = true;
        submit.style.opacity = ".7";
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Submission failed.");
        }

        if (status) {
          status.textContent = "✓ Thanks! Your request has been submitted successfully.";
          status.className = "form-status success";
        }
        form.reset();
      } catch (error) {
        console.error(error);
        if (status) {
          status.textContent = "Something went wrong. Please try again or contact us on WhatsApp.";
          status.className = "form-status error";
        }
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.style.opacity = "1";
        }
      }
    });
  });

  // Back to top
  const topBtn = document.createElement("button");
  topBtn.className = "top-btn";
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = "↑";
  Object.assign(topBtn.style, {
    position: "fixed",
    right: "22px",
    bottom: "88px",
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(10,25,42,.9)",
    color: "#20d9ff",
    display: "none",
    placeItems: "center",
    zIndex: "899",
    cursor: "pointer"
  });
  document.body.appendChild(topBtn);

  const toggleTopBtn = () => {
    topBtn.style.display = window.scrollY > 500 ? "grid" : "none";
  };
  window.addEventListener("scroll", toggleTopBtn, { passive: true });
  toggleTopBtn();
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});

//----clouflar test----------
// ==========================
// Smooth Scroll (Only # Links)
// ==========================
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href && href.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

// ==========================
// Header Shadow
// ==========================
const header = document.querySelector("header");

if (header) {
  window.addEventListener("scroll", () => {
    header.style.boxShadow =
      window.scrollY > 50
        ? "0 5px 20px rgba(0,0,0,.4)"
        : "none";
  });
}

// ==========================
// Scroll Animation
// ==========================
const cards = document.querySelectorAll(
  ".card, .portfolio-item, .testimonial, .faq-box"
);

function showCards() {
  cards.forEach(card => {
    if (card.getBoundingClientRect().top < window.innerHeight - 100) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showCards);
showCards();

// ==========================
// Scroll To Top Button
// ==========================
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.className = "top-btn";
topBtn.style.display = "none";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ==========================
// FAQ Toggle
// ==========================
document.querySelectorAll(".faq-box h3").forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    if (answer) {
      answer.style.display =
        answer.style.display === "block"
          ? "none"
          : "block";
    }
  });
});

// ==========================
// Loader
// ==========================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
});

// ==========================
// Theme Toggle
// ==========================
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });
}

// ==========================
// Counter
// ==========================
document.querySelectorAll(".counter").forEach(counter => {

  const update = () => {
    const target = +counter.dataset.target;
    const count = +counter.innerText;

    const increment = Math.ceil(target / 100);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(update, 20);
    } else {
      counter.innerText = target;
    }
  };

  update();
});

// ==========================
// Portfolio Filter
// ==========================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    portfolioItems.forEach(item => {
      item.style.display =
        filter === "all" || item.classList.contains(filter)
          ? "block"
          : "none";
    });

  });
});
// ==========================
// Mobile Menu Toggle
// ==========================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      menuToggle.innerHTML = "✕";
    } else {
      menuToggle.innerHTML = "☰";
    }
  });

  document.querySelectorAll("#navLinks a").forEach(function(link) {
    link.addEventListener("click", function() {
      navLinks.classList.remove("active");
      menuToggle.innerHTML = "☰";
    });
  });

}

// Contact & Index Form Submit

document.querySelectorAll(".leadForm").forEach(form => {

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Thank you! Your request has been submitted successfully.");
        form.reset();
      } else {
        alert("❌ " + (result.error || "Submission failed."));
      }

    } catch (error) {
      alert("❌ Network error. Please try again.");
      console.error(error);
    }
  });

});

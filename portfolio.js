document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    const links = document.querySelectorAll(".nav a");

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener("click", function () {

        const isOpen = nav.classList.toggle("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("open");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

});

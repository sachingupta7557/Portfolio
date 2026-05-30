const header = document.querySelector(".site-header");
const navLinks = document.querySelector(".nav-links");
const menuButton = document.querySelector(".hamburger");
const sections = document.querySelectorAll("main section[id]");

if (window.Typed) {
    new Typed("#typed", {
        strings: ["full stack apps.", "responsive interfaces.", "MERN projects.", "clean backend APIs."],
        typeSpeed: 62,
        backSpeed: 36,
        backDelay: 1200,
        loop: true
    });
}

document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        event.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        closeMenu();
    });
});

function setActiveLink() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
        const id = section.getAttribute("id");
        const navLink = document.querySelector(`nav a[href="#${id}"]`);

        if (!navLink) return;

        const startsHere = scrollPosition >= section.offsetTop;
        const endsHere = scrollPosition < section.offsetTop + section.offsetHeight;
        navLink.classList.toggle("active", startsHere && endsHere);
    });
}

function updateHeader() {
    header.classList.toggle("scrolled", window.scrollY > 20);
}

function closeMenu() {
    navLinks.classList.remove("open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function toggleMenu() {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
}

function openResume() {
    window.open("https://drive.google.com/file/d/1Keus5Zmrjf_jcTtZLQ2QAMhvdd2VDImW/view?usp=drive_link", "_blank");
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.14
});

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});

window.addEventListener("scroll", () => {
    setActiveLink();
    updateHeader();
});

document.querySelector("#year").textContent = new Date().getFullYear();
setActiveLink();
updateHeader();

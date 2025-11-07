// ===============================
// Highlight active nav link on scroll
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Adjust for navbar height
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// ===============================
// Smooth scroll for Hero button
// ===============================
const heroButton = document.querySelector(".hero-btn");
if (heroButton) {
  heroButton.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector("#products");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ===============================
// Carousel Slider (Why Choose Dwell section)
// ===============================
const carousel = document.querySelector(".carousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (carousel && nextBtn && prevBtn) {
  let index = 0;

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % carousel.children.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + carousel.children.length) % carousel.children.length;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  });
}


// after injecting nav...
const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = (a.getAttribute('href') || '').toLowerCase();
  if (href === current || (current.startsWith('products.html') && href === 'products.html')) {
    a.classList.add('active'); // uses your gold highlight
  }
});

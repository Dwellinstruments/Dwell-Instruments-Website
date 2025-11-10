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

// ===============================
// Highlight current page (gold active)
// ===============================
const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = (a.getAttribute('href') || '').toLowerCase();
  if (href === current || (current.startsWith('products.html') && href === 'products.html')) {
    a.classList.add('active');
  }
});

// ===============================
// Dynamic Navbar Loader + Dropdown Builder
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) loadNavbar();
});

async function loadNavbar() {
  try {
    // Load nav.html into the page
    const res = await fetch("nav.html");
    if (!res.ok) throw new Error("Failed to load nav.html");
    const html = await res.text();
    document.getElementById("navbar").innerHTML = html;

    // Once navbar HTML is inserted, build dynamic menu
    await buildDynamicDropdown();

    // Highlight current page link again after navbar injection
    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".nav-links a").forEach(link => {
      const href = (link.getAttribute("href") || "").toLowerCase();
      if (href === currentPage || (currentPage.startsWith("products.html") && href === "products.html")) {
        link.classList.add("active");
      }
    });

  } catch (err) {
    console.error("❌ Navbar load failed:", err);
  }
}

async function buildDynamicDropdown() {
  try {
    const menu = document.getElementById("productsMenu");
    if (!menu) return;

    const res = await fetch("product_details.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load product_details.json: ${res.status}`);
    const data = await res.json();

    menu.innerHTML = ""; // Clear "Loading..."

    (data.brands || []).forEach(brand => {
      const brandLi = document.createElement("li");
      brandLi.classList.add("has-submenu");

      const categoriesHTML = (brand.categories || [])
        .map(cat => {
          const productsHTML = (cat.products || [])
            .map(prod => `
              <li>
                <a href="product-details.html?product=${encodeURIComponent(prod.name)}" title="${prod.name}">
                  ${prod.name}
                </a>
              </li>
            `)
            .join("");

          return `
            <li class="has-submenu">
              <a href="products.html#${brand.slug}">${cat.name} ▸</a>
              <ul class="sub-menu scrollable-menu">
                ${productsHTML || `<li><a href="#">No products</a></li>`}
              </ul>
            </li>
          `;
        })
        .join("");

      brandLi.innerHTML = `
        <a href="products.html#${brand.slug}">${brand.name} ▸</a>
        <ul class="sub-menu scrollable-menu">
          ${categoriesHTML}
        </ul>
      `;
      menu.appendChild(brandLi);
    });

    console.log("✅ Navbar dropdown built successfully.");

  } catch (err) {
    console.error("❌ Dropdown build error:", err);
    const menu = document.getElementById("productsMenu");
    if (menu) menu.innerHTML = `<li><a href="products.html">All Products</a></li>`;
  }
}

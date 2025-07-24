// Modern JavaScript for Analog Control Website
// ES6+ features, performance optimized, accessibility compliant

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeWebsite();
});

// Main initialization function
const initializeWebsite = () => {
  // Initialize all modules
  initializeNavigation();
  initializeSmoothScrolling();
  initializeScrollAnimations();
  initializeScrollIndicator();
  initializePerformanceOptimizations();
  initializeAccessibility();
  // E-posta divine tıklama ile mailto açma
  const emailDiv = document.querySelector('.contact-item.email-click');
  if (emailDiv) {
    emailDiv.addEventListener('click', function(e) {
      // Sadece linke tıklanmadıysa mailto aç
      if (!e.target.closest('a')) {
        window.location.href = 'mailto:info@analogcontrol.com';
      }
    });
  }
};

// Navigation functionality
const initializeNavigation = () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  // Navbar scroll effect
  const handleNavbarScroll = () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  // Active navigation link highlighting
  const updateActiveNavLink = () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(
        `.navbar-nav .nav-link[href="#${sectionId}"]`
      );

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  };

  // Event listeners
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    updateActiveNavLink();
  });

  // Mobile menu close on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
};

// Smooth scrolling functionality
const initializeSmoothScrolling = () => {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
};

// Scroll animations with Intersection Observer
const initializeScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .value-card, .contact-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("loading");
    observer.observe(el);
  });

  // Add animation class when element comes into view
  const addAnimationClass = (element) => {
    element.classList.add("loaded");
  };

  // Trigger animations on scroll
  const handleScrollAnimations = () => {
    const elements = document.querySelectorAll(".loading");
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        addAnimationClass(element);
      }
    });
  };

  window.addEventListener("scroll", throttle(handleScrollAnimations, 100));
};

// Form validation
const validateForm = (formData) => {
  let isValid = true;

  // Check required fields
  Object.keys(formData).forEach((key) => {
    const value = formData[key].trim();
    if (!value) {
      showFieldError(key, "Bu alan zorunludur.");
      isValid = false;
    }
  });

  // Email validation
  if (formData.email && !isValidEmail(formData.email)) {
    showFieldError("email", "Geçerli bir e-posta adresi giriniz.");
    isValid = false;
  }

  return isValid;
};

const validateField = (field) => {
  const value = field.value.trim();
  const fieldName = field.name;

  if (!value) {
    showFieldError(fieldName, "Bu alan zorunludur.");
    return false;
  }

  if (fieldName === "email" && !isValidEmail(value)) {
    showFieldError(fieldName, "Geçerli bir e-posta adresi giriniz.");
    return false;
  }

  clearFieldError(field);
  return true;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const showFieldError = (fieldName, message) => {
  const field = document.querySelector(`[name="${fieldName}"]`);
  if (field) {
    field.classList.add("is-invalid");

    // Remove existing error message
    const existingError = field.parentNode.querySelector(".invalid-feedback");
    if (existingError) {
      existingError.remove();
    }

    // Add new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback";
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }
};

const clearFieldError = (field) => {
  field.classList.remove("is-invalid");
  const errorDiv = field.parentNode.querySelector(".invalid-feedback");
  if (errorDiv) {
    errorDiv.remove();
  }
};

// Simulate form submission
const simulateFormSubmission = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate 90% success rate
      if (Math.random() > 0.1) {
        resolve({ success: true });
      } else {
        reject(new Error("Network error"));
      }
    }, 2000);
  });
};

// Notification system
const showNotification = (message, type = "info") => {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success" ? "check-circle" : "exclamation-circle"
            }"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
};

// Scroll indicator functionality
const initializeScrollIndicator = () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const aboutSection = document.querySelector("#about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    });

    // Hide scroll indicator when scrolled
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.pointerEvents = "none";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.pointerEvents = "auto";
      }
    });
  }
};

// Performance optimizations
const initializePerformanceOptimizations = () => {
  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      // Handle scroll-based optimizations
    }, 100);
  });
};

// Accessibility enhancements
const initializeAccessibility = () => {
  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Ana içeriğe geç";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content landmark
  const mainContent = document.querySelector(".hero-section");
  if (mainContent) {
    mainContent.id = "main-content";
    mainContent.setAttribute("role", "main");
  }

  // Keyboard navigation for service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
};

// Utility functions
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Ana Sayfa butonuna tıklandığında en üste yumuşak kaydırma
const anaSayfaLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
if (anaSayfaLink) {
  anaSayfaLink.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Çoklu dil desteği
const translations = {
  tr: {
    brand: "Analog Control",
    nav_home: "Ana Sayfa",
    nav_about: "Hakkımızda",
    nav_services: "Hizmetlerimiz",
    nav_contact: "İletişim",
    about_title: "Bizi Tanıyın",
    about_p1: "Analog Control, 2021 yılında sektörde 10 yılı aşkın deneyime sahip iki mühendis tarafından kurulmuştur. Kurulduğu günden bu yana üretim tesislerinin otomasyon, veri toplama, ağ altyapısı ve süreç iyileştirme alanlarındaki ihtiyaçlarına yönelik yalın, güvenilir ve sürdürülebilir çözümler üretmektedir.",
    about_p2: "Sahada edinilmiş deneyimi, mühendislik disipliniyle birleştirerek; hem orta ölçekli hem de kurumsal projelerde etkin şekilde görev almaktadır.",
    about_p3: "Müşteri memnuniyetini ön planda tutar, sürdürülebilirliği esas alır.",
    value1_title: "Mühendislik Disiplini",
    value1_desc: "Sistematik yaklaşım ve teknik mükemmellik",
    value2_title: "Güvenilirlik ve Sürdürülebilirlik",
    value2_desc: "Uzun vadeli çözümler ve güvenilir hizmet",
    value3_title: "Şeffaflık ve İş Birliği",
    value3_desc: "Açık iletişim ve ortak başarı",
    services_title: "Hizmetlerimiz",
    services_lead: "Endüstriyel otomasyon alanında kapsamlı çözümler sunuyoruz",
    service1_title: "Mühendislik & Proje",
    service1_desc: "Otomasyon projelerinde analiz, tasarım, uygulama, devreye alma.",
    service2_title: "Veri & Raporlama",
    service2_desc: "Enerji, CIP ve üretim verileri için özelleştirilmiş raporlama sistemleri geliştiririz.",
    service3_title: "Danışmanlık",
    service3_desc: "Yatırım öncesi analiz, yol haritası, yönlendirme desteği.",
    service4_title: "Satış & Tedarik",
    service4_desc: "Otomasyon altyapılarına uygun donanım seçimi ve tedarik hizmetleri sunuyoruz.",
    service5_title: "Servis & Teknik Destek",
    service5_desc: "Sistem kurulumları sonrası bakım, arıza yönetimi ve uzaktan bağlantı hizmetleri sağlıyoruz.",
    service6_title: "OT Güvenlik",
    service6_desc: "Endüstriyel siber güvenlik & ağ altyapı çözümleri.",
    contact_title: "Bizimle İletişime Geçin",
    contact_info_title: "İletişim Bilgileri",
    contact_address_title: "Adres",
    contact_address: "Fatih Sultan Mehmet Mah. Poligon Cad. Buyaka2 Kule3 D1/2/3/4<br />Ümraniye, İstanbul, Türkiye",
    contact_phone_title: "Telefon",
    contact_phone: "+90 (212) XXX XX XX",
    contact_email_title: "E-posta",
    contact_email: "solution@analogcontrol.io",
    footer: "&copy; 2024 Analog Control. Tüm hakları saklıdır.",
    hero_title: "Analog Control",
    hero_subtitle: "Endüstriyel Otomasyon & SCADA Çözümleri",
    hero_desc: "Üretim tesislerinin otomasyon, veri toplama, ağ altyapısı ve süreç iyileştirme alanlarındaki ihtiyaçlarına yönelik yalın, güvenilir ve sürdürülebilir çözümler.",
    hero_btn: '<i class="fas fa-arrow-right me-2"></i>Hizmetlerimizi Keşfedin',
  },
  en: {
    brand: "Analog Control",
    nav_home: "Home",
    nav_about: "About Us",
    nav_services: "Services",
    nav_contact: "Contact",
    about_title: "About Us",
    about_p1: "Analog Control was founded in 2021 by two engineers with over 10 years of industry experience. Since its establishment, it has been providing simple, reliable, and sustainable solutions for the automation, data collection, network infrastructure, and process improvement needs of production facilities.",
    about_p2: "Combining field experience with engineering discipline, it actively participates in both medium-sized and corporate projects.",
    about_p3: "Customer satisfaction is prioritized, and sustainability is essential.",
    value1_title: "Engineering Discipline",
    value1_desc: "Systematic approach and technical excellence",
    value2_title: "Reliability & Sustainability",
    value2_desc: "Long-term solutions and reliable service",
    value3_title: "Transparency & Collaboration",
    value3_desc: "Open communication and shared success",
    services_title: "Our Services",
    services_lead: "We offer comprehensive solutions in industrial automation",
    service1_title: "Engineering & Project",
    service1_desc: "Analysis, design, implementation, and commissioning in automation projects.",
    service2_title: "Data & Reporting",
    service2_desc: "We develop customized reporting systems for energy, CIP, and production data.",
    service3_title: "Consultancy",
    service3_desc: "Pre-investment analysis, roadmap, and guidance support.",
    service4_title: "Sales & Supply",
    service4_desc: "We offer hardware selection and supply services suitable for automation infrastructures.",
    service5_title: "Service & Technical Support",
    service5_desc: "We provide maintenance, fault management, and remote connection services after system installations.",
    service6_title: "OT Security",
    service6_desc: "Industrial cybersecurity & network infrastructure solutions.",
    contact_title: "Contact Us",
    contact_info_title: "Contact Information",
    contact_address_title: "Address",
    contact_address: "Fatih Sultan Mehmet Mah. Poligon Cad. Buyaka2 Kule3 D1/2/3/4<br />Umraniye, Istanbul, Türkiye",
    contact_phone_title: "Phone",
    contact_phone: "+90 (212) XXX XX XX",
    contact_email_title: "E-mail",
    contact_email: "solution@analogcontrol.io",
    footer: "&copy; 2024 Analog Control. All rights reserved.",
    hero_title: "Analog Control",
    hero_subtitle: "Industrial Automation & SCADA Solutions",
    hero_desc: "We provide simple, reliable, and sustainable solutions for the automation, data collection, network infrastructure, and process improvement needs of production facilities.",
    hero_btn: '<i class="fas fa-arrow-right me-2"></i>Discover Our Services',
  }
};

let currentLang = 'tr';

function setLanguage(lang) {
  currentLang = lang;
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.innerHTML = translations[lang][key];
      }
    }
  });
  // Buton metni değişsin
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = lang === 'tr' ? 'EN' : 'TR';
}

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'tr' ? 'en' : 'tr');
    });
  }
  setLanguage(currentLang);
});

// Export functions for potential external use
window.AnalogControl = {
  showNotification,
  validateForm,
  initializeWebsite,
};

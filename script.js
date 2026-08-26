/* =========================================================
   KMA PROTECH COMPUTER INSTITUTE — SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. MOBILE HAMBURGER MENU ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close menu when a link is clicked (mobile) */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close menu when clicking outside of it */
    document.addEventListener('click', function (e) {
      var clickedInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);
      if (!clickedInsideNav && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. SMOOTH SCROLLING FOR ANCHOR LINKS ---------- */
  var navbar = document.getElementById('navbar');

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var offset = (navbar ? navbar.offsetHeight : 0) + 10;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- 3. NAVBAR SCROLL EFFECT ---------- */
  function updateNavbarOnScroll() {
    if (!navbar) return;
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  updateNavbarOnScroll();
  window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });

  /* ---------- 4. ACTIVE NAVIGATION LINK ON SCROLL ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    var scrollPos = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 40;
    var currentId = '';

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (link) {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active-link');
      }
    });
  }
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---------- 5. SCROLL REVEAL ANIMATIONS ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    /* Fallback: just show everything */
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- 6. LEARNING PROCESS CONNECTING LINE ---------- */
  var processTrack = document.querySelector('.process-track');
  var processLineFill = document.querySelector('.process-line-fill');

  if (processTrack && processLineFill && 'IntersectionObserver' in window) {
    var processObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          processLineFill.classList.add('filled');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    processObserver.observe(processTrack);
  }

  /* ---------- 7. COURSE CARD INTERACTIONS ---------- */
  var courseCards = document.querySelectorAll('.course-card');

  courseCards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      courseCards.forEach(function (other) {
        if (other !== card) other.style.opacity = '0.85';
      });
    });
    card.addEventListener('mouseleave', function () {
      courseCards.forEach(function (other) { other.style.opacity = '1'; });
    });

    /* Make "Learn More" scroll to the contact section with the course name noted */
    var link = card.querySelector('.course-link');
    var courseTitle = card.querySelector('h3');
    if (link && courseTitle) {
      link.addEventListener('click', function () {
        window.selectedCourse = courseTitle.textContent.trim();
      });
    }
  });

  /* ---------- 8. CURRENT YEAR IN FOOTER ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

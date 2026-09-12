// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // Testimonial carousel (home page)
  const quoteText = document.getElementById('quoteText');
  const quoteName = document.getElementById('quoteName');
  if (quoteText && quoteName) {
    const quotes = [
      { text: `"Wallflow rebuilt our website in two weeks and our inquiries doubled the same month. It finally looks like the business we actually run."`, name: "RIYA MEHTA — OWNER, CLOVE & CO." },
      { text: `"They didn't just build a site and disappear — the socials and ads still feel like they're run by someone who knows the brand."`, name: "ARJUN KAPOOR — FOUNDER, NORTHLINE STUDIO" },
      { text: `"Fast, clear, and genuinely good taste. Every update felt like it moved the business forward, not just the website."`, name: "MEERA SHAH — AURA FITNESS" }
    ];
    let qIndex = 0;
    window.shiftQuote = (dir) => {
      qIndex = (qIndex + dir + quotes.length) % quotes.length;
      quoteText.textContent = quotes[qIndex].text;
      quoteName.textContent = quotes[qIndex].name;
    };
  }

  // Contact form handling (client-side only — no backend attached)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        status.textContent = 'Please fill in your name, a valid email, and a short message before sending.';
        status.className = 'form-status error';
        return;
      }

      // No backend is connected in this file — this simulates a successful send
      // and logs the payload to the console so it can be wired up to a real endpoint later.
      console.log('Contact form submission:', {
        name, email,
        project: form.project.value,
        message
      });

      status.textContent = `Thanks, ${name} — your message is ready to send. Connect this form to an email service (like Formspree) or a backend to actually deliver it.`;
      status.className = 'form-status success';
      form.reset();
    });
  }
});

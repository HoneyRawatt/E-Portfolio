// Contact form handler
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = 'Sending...';

    // Send form data to server-side handler (contact.php)
    fetch('contact.php', {
      method: 'POST',
      body: new FormData(form)
    }).then(res => res.text()).then(text => {
      if (text && text.toLowerCase().includes('success')) {
        status.textContent = 'Thank you for reaching out! I will get back to you soon.';
        form.reset();
      } else {
        status.textContent = 'Sorry, there was an error sending your message. Please try again later.';
        console.error('Contact form error:', text);
      }
    }).catch(err => {
      status.textContent = 'Network error: could not send message.';
      console.error('Contact form network error:', err);
    });
  });
}

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skill-bar')) {
        const barFill = entry.target.querySelector('.bar-fill');
        if (barFill) {
          barFill.style.width = barFill.getAttribute('data-width');
        }
      }
      if (entry.target.classList.contains('counter')) {
        animateCounter(entry.target);
      }
    }
  });
}, observerOptions);

// Animate counter function
function animateCounter(counter) {
  const count = +counter.getAttribute('data-count');
  let current = 0;
  const step = Math.ceil(count / 40);
  const span = counter.querySelector('span');

  function update() {
    if (current < count) {
      current += step;
      if (current > count) current = count;
      if (span) span.textContent = current;
      requestAnimationFrame(update);
    } else {
      if (span) span.textContent = count;
    }
  }
  update();
}

// Initialize animations
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  
  // Observe all animated elements
  document.querySelectorAll('section, .skills > div, .project-card, .contact-form, .certifications-list li, .skill-bar, .counter').forEach(el => {
    observer.observe(el);
  });
  
  // Add smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}); 
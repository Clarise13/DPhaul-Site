// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function() {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== STICKY NAVBAR =====
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== CONTACT FORM =====
const contactStatus = document.getElementById("contactStatus");
let contactStatusTimer;
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: e.target[0].value,
    email: e.target[1].value,
    service: e.target[2].value,
    message: e.target[3].value
  };

  try {
    const response = await fetch('https://formspree.io/f/xaqgydda', {
      method: 'POST',
      headers: { "Accept": "application/json" },
      body: new URLSearchParams(data)
    });
    
    const statusEl = document.getElementById("contactStatus");
    if (response.ok) {
      statusEl.textContent = "✅ Request sent successfully! We'll get back to you soon.";
      statusEl.className = "contact-status success";
      document.getElementById("contactForm").reset();
    } else {
      statusEl.textContent = "❌ Error sending message. Please try again.";
      statusEl.className = "contact-status error";
    }
  } catch (error) {
    console.error('Error:', error);
    const statusEl = document.getElementById("contactStatus");
    statusEl.textContent = "❌ Error sending message. Please check your connection.";
    statusEl.className = "contact-status error";
  }
});
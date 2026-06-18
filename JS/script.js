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
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: e.target[0].value,
    email: e.target[1].value,
    service: e.target[2].value,
    message: e.target[3].value
  };

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert("✅ Request sent successfully! We'll get back to you soon.");
      document.getElementById("contactForm").reset();
    } else {
      alert("❌ Error sending message. Please try again.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("❌ Error sending message. Please check your connection.");
  }
});
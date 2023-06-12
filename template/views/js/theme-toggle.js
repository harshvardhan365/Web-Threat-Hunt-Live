// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function() {
  // Theme toggle event listener
  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('change', function() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    body.classList.toggle('bg-dark');
    body.classList.toggle('bg-light');
    body.classList.toggle('text-white');
    body.classList.toggle('text-dark');
    navbar.classList.toggle('navbar-dark');
    navbar.classList.toggle('navbar-light');
  });
});

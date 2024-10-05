const menuToggle = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});



document.querySelector('.read-more').addEventListener('click', function () {
    alert('More information will be available soon!');
});

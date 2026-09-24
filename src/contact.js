const form = document.querySelector('#contact-form');
const message = document.querySelector('.success-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  message.textContent = 'Thanks! Your message has been sent.';
  message.classList.add('show');
  form.reset();
});

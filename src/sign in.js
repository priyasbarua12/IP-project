const typeButtons = document.querySelectorAll('.account-type');
const submitButton = document.querySelector('.sign-in');
const feedback = document.querySelector('#feedback');

typeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    typeButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-selected', 'true');
    submitButton.textContent = `Sign In as ${button.dataset.type}`;
  });
});

document.querySelector('#loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = 'Sign-in successfully.';
});

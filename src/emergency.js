document.addEventListener('DOMContentLoaded', () => {
  const selectionStyles = document.createElement('style');
  selectionStyles.textContent = `
    .blood-types button.selected, .blood-types button.active {
      background: #dc2626 !important;
      color: #fff !important;
      border-color: #dc2626 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(220, 38, 38, .25);
    }
  `;
  document.head.appendChild(selectionStyles);

  const bloodButtons = document.querySelectorAll('[data-blood-type]');
  const locationInput = document.querySelector('#location');
  const notesInput = document.querySelector('#notes');
  const sendAlertButton = document.querySelector('.alert-button');
  const alertMessage = document.querySelector('#alertMessage');
  const anotherAlertButton = document.querySelector('#anotherAlert');
  const bloodSection = document.querySelector('.blood-section');
  let selectedBloodType = '';

  // Choose the requested blood type.
  bloodButtons.forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      bloodButtons.forEach((item) => {
        item.classList.remove('selected', 'active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected', 'active');
      button.setAttribute('aria-pressed', 'true');
      selectedBloodType = button.dataset.bloodType;
    });
  });

  function showMessage(text, type = 'error') {
    let message = document.querySelector('#formFeedback');
    if (!message) {
      message = document.createElement('p');
      message.id = 'formFeedback';
      message.className = 'form-feedback';
      sendAlertButton?.insertAdjacentElement('beforebegin', message);
    }
    message.textContent = text;
    message.dataset.type = type;
  }

  function sendDonorAlert(event) {
    event?.preventDefault();

    if (!selectedBloodType) {
      showMessage('Please select the blood type needed.');
      return;
    }
    if (!locationInput?.value.trim()) {
      showMessage('Please enter the hospital or location.');
      locationInput?.focus();
      return;
    }

    document.querySelector('#formFeedback')?.remove();
    bloodSection?.classList.add('hidden');
    alertMessage?.classList.remove('hidden');
    alertMessage?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Works whether the button is inside the form or follows it in the HTML.
  sendAlertButton?.addEventListener('click', sendDonorAlert);
  document.querySelector('#donorForm')?.addEventListener('submit', sendDonorAlert);

  anotherAlertButton?.addEventListener('click', () => {
    selectedBloodType = '';
    bloodButtons.forEach((button) => {
      button.classList.remove('selected', 'active');
      button.setAttribute('aria-pressed', 'false');
    });
    if (locationInput) locationInput.value = '';
    if (notesInput) notesInput.value = '';
    alertMessage?.classList.add('hidden');
    bloodSection?.classList.remove('hidden');
    bloodSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function showRequestConfirmation(service) {
    let confirmation = document.querySelector('#requestConfirmation');

    if (!confirmation) {
      confirmation = document.createElement('div');
      confirmation.id = 'requestConfirmation';
      confirmation.setAttribute('role', 'status');
      confirmation.setAttribute('aria-live', 'polite');
      confirmation.style.cssText = `
        position: fixed; right: 24px; bottom: 24px; z-index: 9999;
        max-width: 330px; padding: 15px 18px; border-radius: 12px;
        background: #16a34a; color: white; font: 600 15px/1.4 Arial, sans-serif;
        box-shadow: 0 10px 28px rgba(22, 163, 74, .28);
      `;
      document.body.appendChild(confirmation);
    }

    confirmation.textContent = `✓ ${service} requested successfully. Help is being arranged.`;
    confirmation.hidden = false;
    window.clearTimeout(confirmation.hideTimer);
    confirmation.hideTimer = window.setTimeout(() => { confirmation.hidden = true; }, 4500);
  }

  document.querySelectorAll('.request').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const service = button.closest('.service-card')?.querySelector('h3')?.textContent?.trim() || 'Emergency service';
      showRequestConfirmation(service);
    });
  });
});
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');

toggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));
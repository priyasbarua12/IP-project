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

  document.querySelectorAll('.request').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const service = button.closest('.service-card')?.querySelector('h3')?.textContent || 'service';
      showMessage(`${service} request started. Please add your location to continue.`, 'success');
      bloodSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

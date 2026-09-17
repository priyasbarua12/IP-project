document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#searchForm');
  const serviceInput = document.querySelector('#serviceSearch');
  const locationInput = document.querySelector('#locationSearch');
  const earningsText = document.querySelector('#earningsText');

  function showSearchNotice(message) {
    let notice = document.querySelector('#searchNotice');
    if (!notice) {
      notice = document.createElement('p');
      notice.id = 'searchNotice';
      notice.setAttribute('role', 'status');
      notice.style.cssText = 'margin:10px 0 0;color:#fff;font-weight:600;font-size:14px;';
      searchForm.insertAdjacentElement('afterend', notice);
    }
    notice.textContent = message;
  }

  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const service = serviceInput.value.trim();
    const location = locationInput.value.trim();

    if (!service && !location) {
      showSearchNotice('Enter a service or your location to start searching.');
      serviceInput.focus();
      return;
    }

    const params = new URLSearchParams();
    if (service) params.set('q', service);
    if (location) params.set('location', location);
    window.location.href = `services.html?${params.toString()}`;
  });

  if (earningsText) {
    const messages = [
      'Join 10,000+ professionals earning more with HelpHub.',
      'Find more local customers and grow your service business.',
      'Create your provider profile for free in just a few minutes.'
    ];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % messages.length;
      earningsText.style.opacity = '0';
      setTimeout(() => {
        earningsText.textContent = messages[index];
        earningsText.style.opacity = '1';
      }, 200);
    }, 4500);
  }
});
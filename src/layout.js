(() => {
  const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const links = [
    ['index.html', 'Home'], ['services.html', 'Services'], ['about.html', 'About'],
    ['contact.html', 'Contact']
  ];
  const navigation = links.map(([href, label]) =>
    `<a href="${href}" class="${page === href ? 'hh-active' : ''}">${label}</a>`
  ).join('');

  document.querySelectorAll('.site-header').forEach((header) => header.remove());
  const header = document.createElement('header');
  header.className = 'hh-layout-header';
  header.innerHTML = `
    <a class="hh-brand" href="index.html" aria-label="HelpHub home"><img class="hh-brand-mark" src="../images/logo.jpeg" alt="HelpHub logo">Help<strong>Hub</strong></a>
    <button class="hh-menu" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
    <nav class="hh-nav" aria-label="Main navigation">${navigation}<a class="hh-emergency" href="emergency.html"><span class="hh-emergency-dot"></span>Emergency</a></nav>
    <div class="hh-actions"><a href="sign in.html">Sign in</a><a class="hh-get-started" href="register.html">Get Started</a></div>`;
  document.body.prepend(header);

  header.querySelector('.hh-menu').addEventListener('click', (event) => {
    const open = header.classList.toggle('hh-menu-open');
    event.currentTarget.setAttribute('aria-expanded', String(open));
    event.currentTarget.textContent = open ? '×' : '☰';
  });

});

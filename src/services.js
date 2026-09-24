/* =====================================================
   LOAD SERVICES DATA
   ===================================================== */

const providerDetailsById = new Map();
let providerIdCounter = 0;

function saveProviderDetails(provider) {
    const id = `provider-${providerIdCounter += 1}`;
    providerDetailsById.set(id, provider);
    return id;
}

fetch("services.json")
    .then(response => response.json())
    .then(data => {

        createBloodCards(data.bloodDonation);

        createProviderCards(
            data.mechanics,
            "mechanicProviders"
        );

        createProviderCards(
            data.electricians,
            "electricianProviders"
        );

        createProviderCards(
            data.plumbers,
            "plumberProviders"
        );

        initializeServiceSearch();

    })
    .catch(error => {
        console.log("Error loading services:", error);
    });


/* =====================================================
   BLOOD DONATION CARDS
   ===================================================== */

function createBloodCards(providers) {

    const container =
        document.getElementById("bloodProviders");

    if (!container) {
        return;
    }

    providers.forEach(provider => {
        const providerId = saveProviderDetails(provider);
        const avatar = provider.image
            ? `<img src="${provider.image}" alt="${provider.name}" class="provider-avatar">`
            : `<div class="provider-avatar-placeholder" style="background:${provider.avatarColor}">${provider.initials || provider.name.charAt(0)}</div>`;

        container.innerHTML += `

            <button type="button"
               class="provider-card"
               data-provider-id="${providerId}"
               data-available="${provider.available !== false}"
               data-emergency="true">

                <div class="provider-top">

                    ${avatar}

                    <div class="provider-info">

                        <h3>
                            ${provider.name}

                            <span
                                class="badge badge-red"
                                style="font-size:.7rem"
                            >
                                ${provider.bloodType}
                            </span>
                        </h3>

                        <div class="role">
                            ${provider.role}
                        </div>

                        <div class="location">
                            📍 ${provider.location}
                        </div>

                    </div>

                </div>

                <div class="provider-meta">

                    <span class="badge badge-green">
                        Available
                    </span>

                    <span
                        style="
                            color:var(--green-600);
                            font-weight:600;
                            font-size:.875rem
                        "
                    >
                        Contact →
                    </span>

                </div>

            </button>

        `;
    });
}


/* =====================================================
   MECHANIC / ELECTRICIAN / PLUMBER CARDS
   ===================================================== */

function createProviderCards(providers, containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    providers.forEach(provider => {
        const providerId = saveProviderDetails(provider);

        let avatar = "";

        /* Image থাকলে image দেখাবে */

        if (provider.image) {

            avatar = `
                <img
                    src="${provider.image}"
                    alt="${provider.name}"
                    class="provider-avatar"
                >
            `;

        }

        /* Image না থাকলে initials দেখাবে */

        else {

            avatar = `
                <div
                    class="provider-avatar-placeholder"
                    style="background:${provider.avatarColor}"
                >
                    ${provider.initials}
                </div>
            `;
        }


        /* Badge থাকলে badge দেখাবে */

        let badge = "";

        if (provider.badge) {

            badge = `
                <span
                    class="badge badge-${provider.badgeType}"
                    style="font-size:.7rem"
                >
                    ${provider.badge}
                </span>
            `;
        }


        /* Card তৈরি */

        container.innerHTML += `

            <button type="button"
               class="provider-card"
               data-provider-id="${providerId}"
               data-available="true"
               data-emergency="false">

                <div class="provider-top">

                    ${avatar}

                    <div class="provider-info">

                        <h3>
                            ${provider.name}
                            ${badge}
                        </h3>

                        <div class="role">
                            ${provider.role}
                        </div>

                        <div class="location">
                            📍 ${provider.location}
                        </div>

                    </div>

                </div>


                <div class="provider-meta">

                    <div class="rating">

                        <span class="star">★</span>

                        <b>${provider.rating}</b>

                        · ${provider.jobs} jobs

                    </div>

                    <span
                        style="
                            color:var(--green-600);
                            font-weight:600;
                            font-size:.875rem
                        "
                    >
                        View →

                    </span>

                </div>

            </button>

        `;
    });
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
}

function formatFieldName(name) {
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function openProviderDetails(provider) {
    const dialog = document.querySelector('#providerDetails');
    const content = document.querySelector('#providerDetailsContent');
    if (!dialog || !content) return;

    const initials = provider.initials || provider.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
    const avatar = provider.image
        ? `<img src="${escapeHtml(provider.image)}" alt="${escapeHtml(provider.name)}">`
        : `<div class="provider-detail-avatar" style="background:${escapeHtml(provider.avatarColor || '#15803d')}">${escapeHtml(initials)}</div>`;
    const fields = Object.entries(provider)
        .filter(([key]) => key !== 'image')
        .map(([key, value]) => `<div><dt>${formatFieldName(key)}</dt><dd>${escapeHtml(value)}</dd></div>`)
        .join('');

    content.innerHTML = `<article class="provider-detail"><div class="provider-detail-head">${avatar}<div><h2 id="providerDetailsTitle">${escapeHtml(provider.name)}</h2><p>${escapeHtml(provider.role || 'Verified HelpHub provider')}</p></div></div><dl class="provider-detail-list">${fields}</dl></article>`;
    dialog.showModal();
}

document.addEventListener('click', (event) => {
    const card = event.target.closest('.provider-card[data-provider-id]');
    if (card) openProviderDetails(providerDetailsById.get(card.dataset.providerId));
    if (event.target.closest('.provider-dialog-close')) document.querySelector('#providerDetails')?.close();
});

/* =====================================================
   SERVICE SEARCH AND FILTERS
   ===================================================== */

function initializeServiceSearch() {
    const searchInput = document.getElementById('serviceFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchButton = document.getElementById('serviceSearchButton');
    const tabs = document.querySelectorAll('.filter-tab');
    const status = document.getElementById('searchStatus');
    const urlParams = new URLSearchParams(window.location.search);
    const homeSearchTerm = urlParams.get('q') || '';
    const homeLocationTerm = urlParams.get('location') || '';
    const sections = [
        { category: 'blood', gridId: 'bloodProviders' },
        { category: 'mechanic', gridId: 'mechanicProviders' },
        { category: 'electrician', gridId: 'electricianProviders' },
        { category: 'plumber', gridId: 'plumberProviders' }
    ];
    let activeTab = 'all';

    // Carry search details entered on the home page into this results page.
    searchInput.value = homeSearchTerm;

    function applyFilters() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        let resultCount = 0;

        sections.forEach(({ category, gridId }) => {
            const grid = document.getElementById(gridId);
            const heading = grid.previousElementSibling;
            const divider = grid.nextElementSibling?.classList.contains('divider')
                ? grid.nextElementSibling
                : null;
            const categoryMatches = !selectedCategory || selectedCategory === category;
            let visibleInSection = 0;

            grid.querySelectorAll('.provider-card').forEach((card) => {
                const textMatches = !searchTerm || card.textContent.toLowerCase().includes(searchTerm);
                const locationText = card.querySelector('.location')?.textContent.toLowerCase() || '';
                const locationMatches = !homeLocationTerm || locationText.includes(homeLocationTerm.toLowerCase());
                const availabilityMatches = activeTab !== 'available' || card.dataset.available === 'true';
                const emergencyMatches = activeTab !== 'emergency' || card.dataset.emergency === 'true';
                const isVisible = categoryMatches && textMatches && locationMatches && availabilityMatches && emergencyMatches;

                card.hidden = !isVisible;
                if (isVisible) {
                    visibleInSection += 1;
                    resultCount += 1;
                }
            });

            const showSection = categoryMatches && visibleInSection > 0;
            grid.hidden = !showSection;
            heading.hidden = !showSection;
            if (divider) divider.hidden = !showSection;
        });

        status.textContent = resultCount
            ? `${resultCount} provider${resultCount === 1 ? '' : 's'} found.`
            : 'No providers found. Try another search or filter.';
        status.classList.add('show');
    }

    searchButton.addEventListener('click', applyFilters);
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') applyFilters();
    });
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activeTab = tab.dataset.filter;
            tabs.forEach((item) => item.classList.toggle('active', item === tab));
            applyFilters();
        });
    });

    if (homeSearchTerm || homeLocationTerm) applyFilters();
}
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
